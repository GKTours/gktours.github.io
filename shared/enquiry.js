/*
 * Booking enquiry handling shared by every prototype.
 *
 *   Enquiry.collect(form)   -> plain object of the form's named fields
 *   Enquiry.validate(data)  -> { fieldName: "message" } (empty object = valid)
 *   Enquiry.submit(data)    -> Promise<{ ok, demo, sent, failed, error }>
 *   Enquiry.gmailLink(data) -> Gmail compose URL, pre-filled
 *   Enquiry.whatsappLink(data)
 *   Enquiry.CUSTOM          -> package value for a custom-trip enquiry (message becomes required)
 *
 * Expected field names: name, phone, email, package, date, adults, children,
 * pickup, vehicle, message, botcheck (hidden honeypot checkbox).
 */
(function () {
  const cfg = window.SITE_CONFIG;
  const ENDPOINT = "https://api.web3forms.com/submit";
  const CUSTOM = "custom"; // package value for "plan my own trip" enquiries

  const keys = () => (cfg.web3formsKeys || []).filter((k) => k && !/^YOUR_/i.test(k));
  const isDemo = () => keys().length === 0;

  function collect(form) {
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = typeof v === "string" ? v.trim() : v; });
    return data;
  }

  function validate(d) {
    const errors = {};
    if (!d.name || d.name.length < 2) errors.name = "Enter your name.";
    const digits = (d.phone || "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Enter a 10-digit mobile number.";
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = "Check the email address.";
    if (!d.package) errors.package = "Choose a package.";
    if (!d.date) {
      errors.date = "Pick a travel date.";
    } else if (new Date(d.date + "T23:59:59") < new Date()) {
      errors.date = "Pick a date from today onwards.";
    }
    const adults = Number(d.adults || 0);
    if (!(adults >= 1)) errors.adults = "At least 1 adult.";
    if (d.package === CUSTOM && (!d.message || d.message.length < 5)) {
      errors.message = "Tell us the places you want to visit.";
    }
    return errors;
  }

  function describe(d) {
    if (d.package === CUSTOM) return { pkgTitle: "Custom trip", pkgLine: "Custom trip (see message)" };
    const pkg = window.packageById(d.package);
    return {
      pkgTitle: pkg ? pkg.title : d.package,
      pkgLine: pkg ? `${pkg.title} (${window.tripShort(pkg)}, from ${window.formatINR(pkg.price)} pp)` : d.package,
    };
  }

  function emailFields(d) {
    const { pkgLine } = describe(d);
    return {
      "Customer name": d.name,
      "Mobile": d.phone,
      "Email": d.email || "(not given)",
      "Package": pkgLine,
      "Travel date": d.date,
      "Adults": d.adults || "1",
      "Children": d.children || "0",
      "Pickup point": d.pickup || "(not given)",
      "Vehicle": d.vehicle || "(not given)",
      "Message": d.message || "(none)",
      "Sent from": location.href,
    };
  }

  async function sendOne(key, d) {
    const { pkgTitle } = describe(d);
    const body = {
      access_key: key,
      subject: `New booking enquiry: ${pkgTitle} — ${d.name}`,
      from_name: cfg.brandLong + " website",
      botcheck: d.botcheck ? true : "",
      ...emailFields(d),
    };
    if (d.email) body.replyto = d.email;
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
    return json;
  }

  async function submit(d) {
    if (d.botcheck) return { ok: true, demo: false, sent: 0, failed: 0 }; // silently drop bots
    if (isDemo()) {
      console.info("[demo] enquiry not sent — add Web3Forms keys in shared/config.js", emailFields(d));
      await new Promise((r) => setTimeout(r, 900));
      return { ok: true, demo: true, sent: 0, failed: 0 };
    }
    const results = await Promise.allSettled(keys().map((k) => sendOne(k, d)));
    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - sent;
    const firstError = results.find((r) => r.status === "rejected");
    return {
      ok: sent > 0,
      demo: false,
      sent,
      failed,
      error: sent === 0 && firstError ? firstError.reason.message : null,
    };
  }

  function plainText(d) {
    return Object.entries(emailFields(d)).map(([k, v]) => `${k}: ${v}`).join("\n");
  }

  function gmailLink(d = {}) {
    const { pkgTitle } = describe(d);
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: cfg.gmail,
      su: d.package ? `Booking enquiry: ${pkgTitle}` : `Tour enquiry — ${cfg.brandLong}`,
      body: d.name ? plainText(d) : "Hello, I would like to know more about your tour packages.\n\nName:\nMobile:\nPackage:\nTravel date:\nPeople:",
    });
    return "https://mail.google.com/mail/?" + params.toString();
  }

  function whatsappLink(d = {}) {
    const { pkgTitle } = describe(d);
    const text = d.package
      ? `Hello ${cfg.brand}, I'm interested in "${pkgTitle}".` + (d.date ? ` Travel date: ${d.date}.` : "")
      : `Hello ${cfg.brand}, I'd like to know about your tour packages.`;
    return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  window.Enquiry = { CUSTOM, isDemo, collect, validate, submit, gmailLink, whatsappLink };
})();
