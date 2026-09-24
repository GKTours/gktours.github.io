/*
 * Point-to-point car fares, taken from the owner's fare sheet
 * (GK_Travels_Fare_Price_Professional.xlsx, received 2026-09-21).
 *
 * Fares are for the whole vehicle — not per person — and "two way" means the
 * return trip. `null` means the sheet had no fare for that combination yet;
 * the card then shows "Ask us for price" instead of a number, so a route is
 * never published with a made-up figure. Fill the null in and it becomes a
 * price with no other change.
 *
 * Each route is turned into a card in the same grid as the tour packages
 * (kind: "fare"), so the theme and region filters cover it too.
 */
window.VEHICLE_CLASSES = [
  { key: "sedan", label: "Sedan", hint: "4 seats" },
  { key: "suv",   label: "SUV",   hint: "7 seats" },
];

window.FARES = [
  {
    id: "kanipakam",
    to: "Kanipakam", place: "kanipakam", region: "rayalaseema",
    scene: "tank", mood: "noon",
    note: "Varasiddhi Vinayaka, the Ganesha found in a well on the Bahuda river.",
    sedan: { oneWay: 2200, twoWay: 3800 },
    suv:   { oneWay: 2800, twoWay: 4800 },
  },
  {
    id: "srikalahasti",
    to: "Srikalahasti", place: "srikalahasti", region: "rayalaseema",
    scene: "temple", mood: "evening",
    note: "The Vayu lingam on the Swarnamukhi, with time for Rahu-Ketu pooja.",
    sedan: { oneWay: 2200, twoWay: 3300 },
    suv:   { oneWay: 2800, twoWay: 4500 },
  },
  {
    id: "gudimallam",
    to: "Gudimallam", place: "gudimallam", region: "rayalaseema",
    scene: "shrine", mood: "sea",
    note: "The Parasurameswara temple near Renigunta and its 2,000-year-old lingam.",
    sedan: { oneWay: 1400, twoWay: 2200 },
    suv:   { oneWay: 1800, twoWay: 2800 },
  },
  {
    id: "golden-temple",
    to: "Golden Temple, Vellore", place: "sripuram", region: "tamilnadu",
    scene: "temple", mood: "dusk",
    note: "Sripuram, the Mahalakshmi temple sheathed in gold, lit after dark.",
    sedan: { oneWay: 3300, twoWay: 5800 },
    suv:   { oneWay: 4000, twoWay: 6500 },
  },
  {
    id: "ontimitta",
    to: "Ontimitta Ramalayam", place: "ontimitta", region: "rayalaseema",
    scene: "mandapa", mood: "ember",
    note: "The Kodandarama temple in Kadapa district, carved by Vijayanagara hands.",
    sedan: { oneWay: 4000, twoWay: 6500 },
    suv:   { oneWay: 4800, twoWay: 6800 },
  },
  {
    id: "alivelu-mangapuram",
    to: "Alivelu Mangapuram", place: "tiruchanur", region: "rayalaseema",
    scene: "tank", mood: "dawn",
    note: "Padmavathi Ammavaru at Tiruchanur, visited after Tirumala by custom.",
    sedan: { oneWay: null, twoWay: null },
    suv:   { oneWay: null, twoWay: null },
  },
  {
    id: "appalayagunta",
    to: "Appalayagunta", place: "appalayagunta", region: "rayalaseema",
    scene: "shrine", mood: "dawn",
    note: "Prasanna Venkateswara Swamy, whose hand is raised in blessing.",
    sedan: { oneWay: 1400, twoWay: 2200 },
    suv:   { oneWay: 1800, twoWay: 2800 },
  },
  {
    id: "madurai",
    to: "Madurai", place: "madurai", region: "tamilnadu",
    scene: "mandapa", mood: "dusk",
    note: "The Meenakshi Amman temple and its painted gopurams — an outstation run.",
    sedan: { oneWay: null, twoWay: null },
    suv:   { oneWay: null, twoWay: null },
  },
  {
    id: "srisailam",
    to: "Srisailam", place: "srisailam", region: "rayalaseema",
    scene: "hilltemple", mood: "forest",
    note: "Mallikarjuna jyotirlinga above the Krishna, through the Nallamala ghat road.",
    sedan: { oneWay: null, twoWay: null },
    suv:   { oneWay: null, twoWay: null },
  },
];

// True when at least one fare is known; a route with none shows "Ask us" instead of a table.
window.fareKnown = (f) =>
  window.VEHICLE_CLASSES.some((v) => f[v.key].oneWay != null || f[v.key].twoWay != null);

/*
 * The same cards as the packages, so one grid, one set of filters and one
 * booking form serve both. `price` is the cheapest one-way fare — what the
 * corner stamp shows — and stays null when the sheet has no figure.
 */
// Photo per route. Most match the fare id; srisailam reuses the Nallamala shot.
const FARE_PHOTO = { srisailam: "nallamala" };

window.FARE_CARDS = window.FARES.map((f) => ({
  id: "fare-" + f.id,
  photo: "images/" + (FARE_PHOTO[f.id] || f.id) + ".jpg",
  kind: "fare",
  title: "Tirupati → " + f.to,
  region: f.region,
  tags: ["Car fare", "Pilgrimage"],
  scene: f.scene,
  mood: f.mood,
  route: ["tirupati", f.place],
  blurb: f.note,
  price: f.sedan.oneWay,
  fare: f,
}));

window.PACKAGES.push(...window.FARE_CARDS);

/*
 * Per-kilometre rates for long runs — the owner's figures for trips beyond
 * 300 km, where a point-to-point fare no longer applies and the trip is
 * charged by distance instead.
 *
 * `perKm` is rupees per kilometre for the whole vehicle. What is NOT yet
 * confirmed: whether tolls, parking, state permits and the driver's allowance
 * are included, and whether a minimum daily kilometre applies. Those are
 * open questions in DATA-TO-FILL.md - do not invent them on the page.
 */
window.KM_RATE_THRESHOLD = 300;
// `photo` is a stand-in picture of the model, not this operator's own vehicle.
// Urbania has none: no freely-licensed photo of it exists (launched 2023,
// India-only), so its card renders without one. Replace all five with real
// photos of the actual fleet when the owner sends them - see DATA-TO-FILL.md.
window.KM_RATES = [
  { key: "dzire",   label: "Dzire",   seats: "4 seater",    perKm: 15,
    photo: "images/fleet/dzire.jpg",
    blurb: "A sedan for two or three, and the cheapest way to cover distance." },
  { key: "innova",  label: "Innova",  seats: "7 seater",    perKm: 22,
    photo: "images/fleet/innova.jpg",
    blurb: "Room for a family with luggage, and easy on long ghat roads." },
  { key: "crysta",  label: "Crysta",  seats: "7 seater",    perKm: 25,
    photo: "images/fleet/crysta.jpg",
    blurb: "The same seven seats with more comfort for longer journeys." },
  { key: "tempo",   label: "Tempo",   seats: "9-12 seater", perKm: 28,
    photo: "images/fleet/tempo.jpg",
    blurb: "For a group travelling together, with space to stand up inside." },
  { key: "urbania", label: "Urbania", seats: "12+ seater",  perKm: 35,
    photo: null,
    blurb: "The largest in the fleet, for a big group on a long route." },
];
