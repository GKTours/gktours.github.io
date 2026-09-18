/*
 * Site settings — the ONLY file you need to edit before going live.
 * Every prototype reads from here, so change it once.
 */
window.SITE_CONFIG = {
  brand: "GK Tours and Travels",
  brandLong: "GK Tours and Travels",
  office: "Tirupati, Andhra Pradesh",
  // All numbers are shown in the footer; the first one is used by the "Call us" button.
  phones: ["+91 9505999160", "+91 8074395059"],
  whatsapp: "919505999160",            // country code + number, digits only

  // Shown on the site and used by the "Send from Gmail" button.
  gmail: "gk.tours.travelz@gmail.com",

  /*
   * Web3Forms access keys — one key per mailbox that should receive enquiries.
   *   1. Open https://web3forms.com, enter the receiving Gmail address, and copy the key it mails you.
   *   2. Repeat for every authorised person (owner, manager, booking desk…).
   *   3. Paste all keys below. Each enquiry is sent to every key, so every mailbox gets a copy.
   * While the placeholder is still here, the form runs in DEMO mode: it validates and shows
   * the success screen, but sends nothing.
   */
  web3formsKeys: [
    "YOUR_WEB3FORMS_ACCESS_KEY",
  ],
};
// Older code reads a single `phone`; keep it pointing at the main number.
window.SITE_CONFIG.phone = window.SITE_CONFIG.phones[0];
