/*
 * Tour packages and the places they visit. Prices are placeholders ("from", per person,
 * twin sharing) — replace them with the real tariff.
 * lon/lat are only used to plot the route map; they are approximate.
 */
window.PLACES = {
  tirupati:       { name: "Tirupati",        lon: 79.42, lat: 13.63 },
  tirumala:       { name: "Tirumala",        lon: 79.35, lat: 13.68 },
  srikalahasti:   { name: "Srikalahasti",    lon: 79.70, lat: 13.75 },
  kanipakam:      { name: "Kanipakam",       lon: 79.04, lat: 13.28 },
  tiruchanur:     { name: "Tiruchanur",      lon: 79.45, lat: 13.61 },
  govindaraja:    { name: "Govindaraja Swamy temple", lon: 79.42, lat: 13.63 },
  kapilatheertham:{ name: "Kapila Theertham", lon: 79.42, lat: 13.65 },
  mangapuram:     { name: "Srinivasa Mangapuram", lon: 79.33, lat: 13.62 },
  gudimallam:     { name: "Gudimallam",      lon: 79.60, lat: 13.59 },
  ardhagiri:      { name: "Ardhagiri",       lon: 78.93, lat: 13.33 },
  gandikota:      { name: "Gandikota",       lon: 78.29, lat: 14.81 },
  jammalamadugu:  { name: "Jammalamadugu",   lon: 78.38, lat: 14.85 },
  belum:          { name: "Belum Caves",     lon: 78.11, lat: 15.10 },
  kadapa:         { name: "Kadapa",          lon: 78.82, lat: 14.47 },
  horsley:        { name: "Horsley Hills",   lon: 78.40, lat: 13.66 },
  madanapalle:    { name: "Madanapalle",     lon: 78.50, lat: 13.55 },
  talakona:       { name: "Talakona Falls",  lon: 79.22, lat: 13.81 },
  lepakshi:       { name: "Lepakshi",        lon: 77.61, lat: 13.80 },
  penukonda:      { name: "Penukonda",       lon: 77.59, lat: 14.08 },
  puttaparthi:    { name: "Puttaparthi",     lon: 77.81, lat: 14.17 },
  srisailam:      { name: "Srisailam",       lon: 78.87, lat: 16.07 },
  mahanandi:      { name: "Mahanandi",       lon: 78.63, lat: 15.47 },
  ahobilam:       { name: "Ahobilam",        lon: 78.72, lat: 15.13 },
  kanchipuram:    { name: "Kanchipuram",     lon: 79.70, lat: 12.83 },
  mahabalipuram:  { name: "Mahabalipuram",   lon: 80.19, lat: 12.62 },
  chennai:        { name: "Chennai",         lon: 80.27, lat: 13.08 },
  tiruvannamalai: { name: "Tiruvannamalai",  lon: 79.07, lat: 12.23 },
  gingee:         { name: "Gingee Fort",     lon: 79.42, lat: 12.25 },
  vellore:        { name: "Vellore",         lon: 79.13, lat: 12.92 },
  sripuram:       { name: "Sripuram",        lon: 79.09, lat: 12.87 },
  yelagiri:       { name: "Yelagiri Hills",  lon: 78.64, lat: 12.58 },
};

window.REGIONS = {
  rayalaseema: "Rayalaseema",
  tamilnadu: "North Tamil Nadu",
};

window.THEMES = ["Day trip", "Pilgrimage", "Heritage", "Nature", "Adventure"];

window.PACKAGES = [
  {
    id: "tirumala",
    title: "Tirumala darshan circuit",
    region: "rayalaseema",
    tags: ["Pilgrimage"],
    days: 2, nights: 1, price: 4999,
    scene: "temple", mood: "dawn",
    route: ["tirupati", "tirumala", "srikalahasti", "kanipakam"],
    blurb: "Sri Venkateswara darshan on the hill, then Srikalahasti's Vayu lingam and the Vinayaka temple at Kanipakam.",
    includes: ["AC car with driver", "1 night hotel in Tirupati", "Darshan slot help", "Breakfast"],
  },
  // ---- one-day temple trips from Tirupati (nights: 0 shows as "Day trip") ----
  {
    id: "tirupati-local",
    title: "Tirupati local temples",
    region: "rayalaseema",
    tags: ["Day trip", "Pilgrimage"],
    days: 1, nights: 0, price: 1499,
    scene: "temple", mood: "ember",
    route: ["tiruchanur", "govindaraja", "kapilatheertham", "mangapuram"],
    blurb: "Goddess Padmavathi at Tiruchanur, the Govindaraja Swamy temple in town, the waterfall shrine at Kapila Theertham and Kalyana Venkateswara at Srinivasa Mangapuram.",
    includes: ["AC car with driver", "Pickup and drop at your hotel", "Temple timings planned", "About 8 hours"],
  },
  {
    id: "kanipakam",
    title: "Kanipakam Vinayaka darshan",
    region: "rayalaseema",
    tags: ["Day trip", "Pilgrimage"],
    days: 1, nights: 0, price: 1799,
    scene: "tank", mood: "noon",
    route: ["tirupati", "kanipakam"],
    blurb: "The self-manifested Varasiddhi Vinayaka, found in a well on the banks of the Bahuda river, with the Manikanteswara and Varadaraja temples beside it.",
    includes: ["AC car with driver", "Pickup from Tirupati", "Darshan queue guidance", "Back the same evening"],
  },
  {
    id: "srikalahasti",
    title: "Srikalahasti temple darshan",
    region: "rayalaseema",
    tags: ["Day trip", "Pilgrimage"],
    days: 1, nights: 0, price: 1299,
    scene: "temple", mood: "evening",
    route: ["tirupati", "srikalahasti"],
    blurb: "Srikalahasteeswara, the Vayu lingam among the five Pancha Bhoota Shiva temples, on the Swarnamukhi river. Time for Rahu-Ketu pooja, and a stop at a Kalamkari workshop.",
    includes: ["AC car with driver", "Pickup from Tirupati", "Rahu-Ketu pooja time planned", "Kalamkari workshop stop"],
  },
  {
    id: "gudimallam",
    title: "Gudimallam Parasurameswara temple",
    region: "rayalaseema",
    tags: ["Day trip", "Pilgrimage", "Heritage"],
    days: 1, nights: 0, price: 1199,
    scene: "shrine", mood: "sea",
    route: ["tirupati", "gudimallam"],
    blurb: "A Shiva lingam more than 2,000 years old, carved with a standing figure of Shiva, in the sunken sanctum of a quiet village temple near Renigunta.",
    includes: ["AC car with driver", "Pickup from Tirupati", "Half-day trip", "Add Srikalahasti the same day"],
  },
  {
    id: "ardhagiri",
    title: "Ardhagiri Veeranjaneya Swamy temple",
    region: "rayalaseema",
    tags: ["Day trip", "Pilgrimage"],
    days: 1, nights: 0, price: 1699,
    scene: "hilltemple", mood: "monsoon",
    route: ["tirupati", "ardhagiri"],
    blurb: "Hanuman's hill temple, said to stand on the half of the Sanjeevani mountain that fell here. Pilgrims carry home water from the hilltop pond, believed to heal.",
    includes: ["AC car with driver", "Pickup from Tirupati", "Easy climb to the shrine", "Combine with Kanipakam, 15 km away"],
  },
  {
    id: "gandikota",
    title: "Gandikota canyon camp",
    region: "rayalaseema",
    tags: ["Adventure", "Heritage"],
    days: 2, nights: 1, price: 5499,
    scene: "canyon", mood: "noon",
    route: ["kadapa", "gandikota", "jammalamadugu", "belum"],
    blurb: "Sunrise over the Penna gorge, a night in tents by the fort walls, and a walk through the Belum limestone caves.",
    includes: ["Tent stay with dinner", "Fort and gorge walk", "Belum Caves tickets", "AC vehicle"],
  },
  {
    id: "horsley",
    title: "Horsley Hills and Talakona",
    region: "rayalaseema",
    tags: ["Nature"],
    days: 2, nights: 1, price: 4499,
    scene: "waterfall", mood: "monsoon",
    route: ["tirupati", "talakona", "madanapalle", "horsley"],
    blurb: "Andhra's tallest waterfall in the Seshachalam forest, then cool air and eucalyptus at 1,265 m on Horsley Hills.",
    includes: ["Hill resort stay", "Forest entry fees", "Breakfast and dinner", "AC vehicle"],
  },
  {
    id: "lepakshi",
    title: "Lepakshi and Penukonda heritage day",
    region: "rayalaseema",
    tags: ["Heritage", "Pilgrimage"],
    days: 2, nights: 1, price: 3999,
    scene: "mandapa", mood: "dusk",
    route: ["lepakshi", "penukonda", "puttaparthi"],
    blurb: "The hanging pillar and painted ceilings of Lepakshi, the Vijayanagara fort at Penukonda, and Prasanthi Nilayam.",
    includes: ["Local heritage guide", "1 night stay", "Breakfast", "AC vehicle"],
  },
  {
    id: "nallamala",
    title: "Srisailam and the Nallamala temples",
    region: "rayalaseema",
    tags: ["Pilgrimage", "Nature"],
    days: 3, nights: 2, price: 7999,
    scene: "hills", mood: "forest",
    route: ["ahobilam", "mahanandi", "srisailam"],
    blurb: "Mallikarjuna jyotirlinga above the Krishna, the nine Narasimha shrines of Ahobilam, and Mahanandi's spring pools.",
    includes: ["2 nights stay", "Ghat road driver", "Temple timing plan", "Breakfast"],
  },
  {
    id: "kanchi",
    title: "Kanchipuram and Mahabalipuram",
    region: "tamilnadu",
    tags: ["Heritage", "Pilgrimage"],
    days: 2, nights: 1, price: 5999,
    scene: "shore", mood: "sea",
    route: ["chennai", "kanchipuram", "mahabalipuram"],
    blurb: "Kailasanathar and Ekambareswarar in the silk city, then the Shore Temple and Five Rathas by the sea.",
    includes: ["Beach-side stay", "Silk weaver visit", "Monument tickets", "AC vehicle"],
  },
  {
    id: "arunachala",
    title: "Tiruvannamalai and Gingee Fort",
    region: "tamilnadu",
    tags: ["Pilgrimage", "Heritage"],
    days: 2, nights: 1, price: 4799,
    scene: "fort", mood: "ember",
    route: ["tiruvannamalai", "gingee"],
    blurb: "Girivalam around Arunachala, the Annamalaiyar temple towers, and the climb to Gingee's Rajagiri citadel.",
    includes: ["1 night stay", "Girivalam drop and pickup", "Fort guide", "AC vehicle"],
  },
  {
    id: "yelagiri",
    title: "Vellore Golden Temple and Yelagiri",
    region: "tamilnadu",
    tags: ["Nature", "Pilgrimage"],
    days: 2, nights: 1, price: 4999,
    scene: "hills", mood: "evening",
    route: ["vellore", "sripuram", "yelagiri"],
    blurb: "Sripuram's golden temple lit at night, Vellore Fort's moat, and fourteen hairpin bends up to Yelagiri lake.",
    includes: ["Hill stay", "Boating at Punganur lake", "Breakfast", "AC vehicle"],
  },
];

window.PICKUP_POINTS = ["Tirupati", "Chennai", "Bengaluru", "Kadapa", "Anantapur", "Kurnool", "Vellore", "Other"];
window.VEHICLES = ["Sedan (4 seats)", "Innova / SUV (7 seats)", "Tempo Traveller (12 seats)", "Mini bus (20+ seats)"];

window.formatINR = (n) => "₹" + Number(n).toLocaleString("en-IN");
// "2 days, 1 night" / "Day trip"
window.tripLength = (p) => p.nights === 0
  ? (p.days === 1 ? "Day trip" : `${p.days} days`)
  : `${p.days} day${p.days > 1 ? "s" : ""}, ${p.nights} night${p.nights === 1 ? "" : "s"}`;
// "2D/1N" / "day trip" — compact form for dropdowns and emails
window.tripShort = (p) => p.nights === 0 ? (p.days === 1 ? "day trip" : `${p.days}D`) : `${p.days}D/${p.nights}N`;
window.packageById = (id) => window.PACKAGES.find((p) => p.id === id);
