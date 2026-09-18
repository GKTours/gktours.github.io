# Tours & Travels website

A static website for a tour operator covering Rayalaseema and north Tamil Nadu. Visitors see package cards, filter them, and send a booking enquiry. The enquiry is emailed to every authorised person through [Web3Forms](https://web3forms.com).

The chosen design is **Marigold**.

```
index.html, style.css, app.js   the website
shared/config.js                business name, contacts, Web3Forms keys   <- edit
shared/packages.js              packages, places, pickup points, vehicles <- edit
shared/enquiry.js               form validation + sending (Web3Forms, Gmail and WhatsApp fallbacks)
shared/scenes.js, scenes.css    the drawn destination artwork (no image files)
DATA-TO-FILL.md                 checklist of the real data still needed
_prototypes/                    the two designs not chosen (local only, not in git)
```

## Go-live checklist

1. **Web3Forms keys.** At web3forms.com, enter each Gmail address that should receive enquiries. Paste every key into `web3formsKeys` in `shared/config.js`. Each enquiry is sent to every key, so every mailbox gets a copy. This works on the free plan (250 submissions/month per key).
2. Set `brand`, `brandLong`, `office`, `phones` (first one is the Call us button), `whatsapp` (digits only, with 91) and `gmail` in the same file.
3. Replace the placeholder packages and prices in `shared/packages.js`.
4. Update the `<title>` and `og:` tags at the top of `index.html` with the real name.
5. Upload everything except `_prototypes/` to any static host (Netlify, Cloudflare Pages, GitHub Pages or Hostinger). No server is needed.

While `YOUR_WEB3FORMS_ACCESS_KEY` is still in `config.js`, the form runs in **demo mode**. It validates input and shows the success screen, but sends nothing.

## How an enquiry travels

`Book this trip` (or `Plan a custom trip`) → form → browser checks the input → `POST https://api.web3forms.com/submit` once per key → email subject `New booking enquiry: <package> — <name>` → Reply-To is set to the customer's email if they gave one.

Fallbacks on the form: **Send from Gmail instead** opens Gmail compose pre-filled, and **WhatsApp us** opens a chat.

Spam: a hidden `botcheck` honeypot is included. hCaptcha can be switched on in the Web3Forms dashboard later.

## Adding a package

Add an entry to `PACKAGES` in `shared/packages.js`. Every place in `route` must exist in `PLACES`, so add new towns there. Pick artwork with `scene` (`temple`, `canyon`, `waterfall`, `mandapa`, `hills`, `shore` or `fort`) and a colour `mood` (`dawn`, `noon`, `monsoon`, `dusk`, `forest`, `sea`, `ember` or `evening`).

## Local preview

```
python -m http.server 5500
```

Then open http://localhost:5500. Test real submissions from a served URL, not a `file://` page.
