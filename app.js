(function () {
  const cfg = window.SITE_CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- site settings into the page ---------- */
  document.title = cfg.brandLong;
  $$("[data-cfg]").forEach((el) => { el.textContent = cfg[el.dataset.cfg]; });
  const tel = (n) => "tel:" + n.replace(/\s/g, "");
  $$('[data-link="tel"]').forEach((a) => { a.href = tel(cfg.phones[0]); });
  $("#phoneList").innerHTML = cfg.phones.map((n) => `<a href="${tel(n)}">${n}</a>`).join("");
  // Let a long address wrap at the "@", never in the middle of a word.
  const [user, domain] = cfg.gmail.split("@");
  $("#emailText").innerHTML = `${user}<wbr>@${domain}`;
  $$('[data-link="wa"]').forEach((a) => { a.href = Enquiry.whatsappLink(); });
  $$('[data-link="gmail"]').forEach((a) => { a.href = Enquiry.gmailLink(); });

  const days = window.tripLength;
  const routeNames = (p) => p.route.map((id) => PLACES[id].name);

  /* ---------- thoranam garland ---------- */
  const garland = $("#garland");
  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function flower(parent, x, y, r, i) {
    const g = el("g", { class: "flower" }, parent);
    el("circle", { cx: x, cy: y, r, fill: i % 2 ? "#ff7a00" : "#f7a600" }, g);
    el("circle", { cx: x, cy: y, r: r * 0.62, fill: i % 2 ? "#ffa53a" : "#ffc93c" }, g);
    el("circle", { cx: x, cy: y, r: r * 0.22, fill: "#b3261e" }, g);
  }
  function leaf(parent, x, y, angle) {
    el("path", {
      d: `M${x} ${y} q9 16 0 34 q-9 -18 0 -34Z`,
      fill: "#2f7a2a",
      transform: `rotate(${angle} ${x} ${y})`,
    }, parent);
  }
  function buildGarland() {
    const joints = [0, 300, 600, 900, 1200];
    const top = 4, dip = 118;
    const swags = el("g", {}, garland);
    for (let s = 0; s < joints.length - 1; s++) {
      const x0 = joints[s], x2 = joints[s + 1], x1 = (x0 + x2) / 2;
      const bez = (t) => [
        (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2,
        (1 - t) ** 2 * top + 2 * (1 - t) * t * dip + t * t * top,
      ];
      // mango leaves hang from the rope, flowers sit on it
      for (let i = 1; i < 16; i += 2) { const [x, y] = bez(i / 16); leaf(swags, x, y + 4, (i % 4 ? 12 : -12)); }
      for (let i = 0; i <= 16; i++) { const [x, y] = bez(i / 16); flower(swags, x, y, 11, i + s); }
    }
    // hanging strands at the joints and mid-swags
    const strandXs = [150, 300, 450, 600, 750, 900, 1050];
    strandXs.forEach((x, k) => {
      const joint = k % 2 === 1;
      const startY = joint ? top + 10 : 66;
      const n = joint ? 4 : 1;
      const g = el("g", { class: "strand", "data-x": x }, garland);
      el("line", { x1: x, y1: startY - 8, x2: x, y2: startY + n * 18, stroke: "#2f7a2a", "stroke-width": 2 }, g);
      for (let i = 0; i < n; i++) flower(g, x, startY + i * 18, 9, i + k);
      leaf(g, x, startY + n * 18 - 6, 0);
    });
  }
  buildGarland();

  function swing(strand, dir) {
    if (reduceMotion || strand._swinging) return;
    strand._swinging = true;
    const a = 9 * dir;
    const anim = strand.animate(
      [0, a, -a * 0.6, a * 0.35, -a * 0.15, 0].map((d) => ({ transform: `rotate(${d}deg)` })),
      { duration: 1700, easing: "ease-out" }
    );
    anim.onfinish = () => { strand._swinging = false; };
  }
  if (!reduceMotion) {
    garland.animate(
      [{ transform: "translateY(-110%)" }, { transform: "translateY(4%)" }, { transform: "translateY(0)" }],
      { duration: 900, easing: "cubic-bezier(.2,.8,.3,1)" }
    ).onfinish = () => $$(".strand", garland).forEach((s, i) => setTimeout(() => swing(s, i % 2 ? 1 : -1), i * 60));

    let lastX = null;
    $(".hero").addEventListener("pointermove", (e) => {
      const ctm = garland.getScreenCTM();
      if (!ctm) return;
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      if (pt.y > 230) { lastX = null; return; }
      const dx = lastX === null ? 0 : pt.x - lastX;
      lastX = pt.x;
      if (Math.abs(dx) < 2) return;
      $$(".strand", garland).forEach((s) => {
        if (Math.abs(Number(s.dataset.x) - pt.x) < 40) swing(s, dx > 0 ? 1 : -1);
      });
    });
  }

  /* ---------- arch preview ---------- */
  // The hero cycles through the tour packages; car fares stay in the grid below.
  const TRIPS = PACKAGES.filter((p) => p.kind !== "fare");
  let archIndex = 0;
  const archScene = $("#archScene");
  const picker = $("#archPicker");
  TRIPS.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", p.title);
    b.title = p.title;
    b.addEventListener("click", () => showArch(i));
    picker.appendChild(b);
  });
  function showArch(i, instant) {
    archIndex = i;
    const p = TRIPS[i];
    const paint = () => {
      archScene.className = "arch-scene mood-" + p.mood;
      archScene.innerHTML = art(p, { eager: true });
      $("#archTitle").textContent = p.title;
      $("#archMeta").textContent = `${REGIONS[p.region]}, ${days(p)}, from ${formatINR(p.price)}`;
    };
    if (instant || reduceMotion) paint();
    else { archScene.classList.add("swap"); setTimeout(paint, 200); }
    $$("button", picker).forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
  }
  showArch(0, true);
  $("#archBook").addEventListener("click", (e) => openModal(TRIPS[archIndex].id, e.currentTarget));

  /* Card/hero art: a real photograph of the place when we have one, otherwise
   * the illustrated SVG scene. Keeping the SVG as the fallback means a package
   * added without a photo still renders. */
  function art(p, opts) {
    const o = opts || {};
    if (p && p.photo) {
      // The hero arch is above the fold, so it loads eagerly: lazy-loading it
      // let the browser defer the one image the page opens on, and the arch
      // painted empty until something scrolled. Cards below the fold stay lazy.
      const loading = o.eager ? "eager" : "lazy";
      return `<img class="scene-photo" src="${p.photo}" alt="${p.title || ""}" loading="${loading}" decoding="async">`;
    }
    return Scene.render(o.scene || (p && p.scene));
  }

  /* ---------- per-km rates for long trips ---------- */
  (function kmRates() {
    const host = $("#kmRates");
    if (!host || !window.KM_RATES) return;
    $("#kmThreshold").textContent = `${KM_RATE_THRESHOLD} km`;
    host.innerHTML = KM_RATES.map((r) => `
      <article class="fleet-card">
        <div class="fleet-pic">${r.photo
          ? `<img src="${r.photo}" alt="${r.label}" loading="lazy" decoding="async">`
          : `<span class="fleet-nopic">Photo coming soon</span>`}
          <div class="stamp"><strong>${formatINR(r.perKm)}</strong><small>per km</small></div>
        </div>
        <div class="fleet-body">
          <h3>${r.label}</h3>
          <p class="fleet-seats">${r.seats}</p>
          <p class="fleet-blurb">${r.blurb}</p>
          <button class="btn btn-rani btn-small" type="button" data-book="custom">Enquire</button>
        </div>
      </article>`).join("");
  })();

  /* ---------- package cards + filters ---------- */
  // A car fare is priced by the vehicle, so its stamp says "one way"; a package
  // stamp carries the figure alone. A route the fare sheet has not priced yet
  // says "Ask us" instead of a number.
  const ASK = "Ask us";
  function stamp(p) {
    if (p.kind !== "fare") return `<small>from</small><strong>${formatINR(p.price)}</strong>`;
    return p.price == null
      ? `<small>fare</small><strong>${ASK}</strong><small>for price</small>`
      : `<small>from</small><strong>${formatINR(p.price)}</strong><small>one way</small>`;
  }
  function fareTable(f) {
    const cell = (v) => (v == null ? `<td class="ask">${ASK}</td>` : `<td>${formatINR(v)}</td>`);
    const rows = VEHICLE_CLASSES.map((v) =>
      `<tr><th scope="row">${v.label} <small>${v.hint}</small></th>${cell(f[v.key].oneWay)}${cell(f[v.key].twoWay)}</tr>`).join("");
    return `<table class="fare-table">
            <thead><tr><td></td><th scope="col">One way</th><th scope="col">Return</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>`;
  }
  // A package priced per vehicle shows both prices in the same table shape the
  // fare cards use, so the two kinds of card read alike.
  function vehicleTable(p) {
    const rows = VEHICLE_CLASSES
      .filter((v) => p.vehiclePrices[v.key] != null)
      .map((v) => `<tr><th scope="row">${v.label} <small>${v.hint}</small></th><td>${formatINR(p.vehiclePrices[v.key])}</td></tr>`)
      .join("");
    return `<table class="fare-table">
            <thead><tr><td></td><th scope="col">Whole trip</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>`;
  }
  function cardDetails(p) {
    if (p.kind === "fare") {
      return `<details class="includes"><summary>Sedan and SUV fares</summary>${fareTable(p.fare)}</details>`;
    }
    const inc = `<details class="includes"><summary>What's included</summary><ul>${p.includes.map((x) => `<li>${x}</li>`).join("")}</ul></details>`;
    return p.vehiclePrices
      ? `<details class="includes"><summary>Sedan and SUV prices</summary>${vehicleTable(p)}</details>${inc}`
      : inc;
  }

  const grid = $("#grid");
  grid.innerHTML = PACKAGES.map((p) => `
    <article class="card" data-id="${p.id}">
      <div class="card-scene mood-${p.mood}">
        ${art(p)}
        <div class="stamp${p.kind === "fare" && p.price == null ? " stamp-ask" : ""}">${stamp(p)}</div>
      </div>
      <div class="card-body">
        <div class="card-meta"><span class="tag region">${REGIONS[p.region]}</span>${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <h3>${p.title}</h3>
        <ol class="route" aria-label="Route">${routeNames(p).map((n) => `<li>${n}</li>`).join("")}</ol>
        <p class="blurb">${p.blurb}</p>
        ${cardDetails(p)}
        <div class="card-actions">
          <button class="btn btn-rani btn-small" type="button" data-book="${p.id}">${p.kind === "fare" ? "Book this car" : "Book this trip"}</button>
        </div>
      </div>
    </article>`).join("");
  // Any [data-book] button opens the form: package cards, the custom-trip banner, the footer.
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]");
    if (b) openModal(b.dataset.book, b);
  });

  const filter = { theme: "all", region: "all" };
  function chips(container, key, items) {
    container.innerHTML = items.map(([v, label]) => `<button class="chip" type="button" data-v="${v}" aria-pressed="${v === "all"}">${label}</button>`).join("");
    container.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      filter[key] = b.dataset.v;
      $$(".chip", container).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      applyFilter();
    });
  }
  chips($("#themeChips"), "theme", [["all", "All trips"], ...THEMES.map((t) => [t, t])]);
  chips($("#regionChips"), "region", [["all", "Both regions"], ...Object.entries(REGIONS)]);

  function applyFilter() {
    let shown = 0;
    PACKAGES.forEach((p) => {
      const ok = (filter.theme === "all" || p.tags.includes(filter.theme)) && (filter.region === "all" || p.region === filter.region);
      const card = grid.querySelector(`[data-id="${p.id}"]`);
      card.hidden = !ok;
      if (ok) shown++;
    });
    $("#count").textContent = `${shown} ${shown === 1 ? "trip" : "trips"} to choose from`;
    $("#empty").hidden = shown > 0;
  }
  applyFilter();

  /* ---------- enquiry dialog ---------- */
  const modal = $("#modal");
  const form = $("#form");
  const done = $("#done");
  let opener = null;

  $("#f-package").innerHTML =
    PACKAGES.map((p) => `<option value="${p.id}">${p.title} (${tripShort(p)})</option>`).join("") +
    `<option value="${Enquiry.CUSTOM}">Custom trip: I'll list the places</option>`;
  $("#f-pickup").innerHTML = PICKUP_POINTS.map((x) => `<option>${x}</option>`).join("");
  $("#f-vehicle").innerHTML = VEHICLES.map((x, i) => `<option${i === 1 ? " selected" : ""}>${x}</option>`).join("");
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#f-date").min = today;

  // "from ₹4,999" for a package, the vehicle fare for a car.
  function priceLine(p) {
    if (p.vehiclePrices) {
      const parts = VEHICLE_CLASSES
        .filter((v) => p.vehiclePrices[v.key] != null)
        .map((v) => `${v.label} ${formatINR(p.vehiclePrices[v.key])}`);
      return `${parts.join(", ")} — whole car`;
    }
    if (p.kind !== "fare") return `from ${formatINR(p.price)}`;
    return p.price == null ? "Fare on request" : `from ${formatINR(p.price)} one way, whole car`;
  }

  function paintSide() {
    const id = $("#f-package").value;
    const custom = id === Enquiry.CUSTOM;
    const p = custom ? null : packageById(id);
    const scene = $("#modalScene");
    scene.className = "modal-scene mood-" + (custom ? "forest" : p.mood);
    scene.innerHTML = custom ? Scene.render("hills") : art(p);
    $("#modalPrice").textContent = custom ? "Custom trip" : priceLine(p);
    $("#modalRoute").textContent = custom
      ? "List the places you want to visit. We'll plan the route and call you with a price."
      : `${days(p)}: ${routeNames(p).join(", ")}`;
    $("#modal-h").textContent = custom ? "Plan a custom trip" : "Book this trip";
    $("#f-message-label").innerHTML = custom ? "Places you want to visit" : "Anything else? <em>(optional)</em>";
    $("#f-message").placeholder = custom
      ? "For example: Tirupati, Kanipakam, Vellore Golden Temple, 3 days"
      : "Senior citizens, darshan type, extra stops…";
  }
  function refreshAltLinks() {
    const d = Enquiry.collect(form);
    $("#gmailLink").href = Enquiry.gmailLink(d);
    $("#waLink").href = Enquiry.whatsappLink(d);
  }
  function clearErrors() {
    $$("[aria-invalid]", form).forEach((f) => f.removeAttribute("aria-invalid"));
    $$(".err", form).forEach((e) => { e.textContent = ""; });
    $("#formError").hidden = true;
  }

  function openModal(id, from) {
    opener = from || document.activeElement;
    form.hidden = false;
    done.hidden = true;
    clearErrors();
    $("#f-package").value = id;
    paintSide();
    refreshAltLinks();
    modal.showModal();
    form.querySelector('[name="name"]').focus();
  }
  function closeModal() { modal.close(); }
  modal.addEventListener("close", () => { if (opener) opener.focus(); });
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  $("#modalClose").addEventListener("click", closeModal);
  $("#doneClose").addEventListener("click", closeModal);

  $("#f-package").addEventListener("change", paintSide);
  form.addEventListener("input", (e) => {
    if (e.target.name) {
      e.target.removeAttribute("aria-invalid");
      const err = $("#e-" + e.target.name);
      if (err) err.textContent = "";
    }
    refreshAltLinks();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    const data = Enquiry.collect(form);
    const errors = Enquiry.validate(data);
    const bad = Object.keys(errors);
    if (bad.length) {
      bad.forEach((name) => {
        const field = form.elements[name];
        field.setAttribute("aria-invalid", "true");
        $("#e-" + name).textContent = errors[name];
      });
      form.elements[bad[0]].focus();
      return;
    }
    const btn = $("#submitBtn");
    btn.disabled = true;
    btn.textContent = "Sending…";
    let result;
    try {
      result = await Enquiry.submit(data);
    } catch (err) {
      result = { ok: false, error: err.message };
    }
    btn.disabled = false;
    btn.textContent = "Send enquiry";

    if (!result.ok) {
      const msg = $("#formError");
      msg.textContent = `The enquiry didn't go through (${result.error || "network error"}). Try again, or use “Send from Gmail instead” below.`;
      msg.hidden = false;
      return;
    }
    const what = data.package === Enquiry.CUSTOM ? "plan your custom trip" : `confirm the ${packageById(data.package).title} trip`;
    $("#doneMsg").textContent = `Thank you, ${data.name}. We'll call you on ${data.phone} within a few hours to ${what}.`;
    $("#demoNote").hidden = !result.demo;
    form.hidden = true;
    done.hidden = false;
    done.focus();
    form.reset();
    $("#f-package").value = data.package;
  });
})();
