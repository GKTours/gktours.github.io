# Data needed to finish the website

Fill in what you have and send it back. Anything left blank keeps its current placeholder.

## 1. Business details

| Item | Current placeholder | Your value |
|---|---|---|
| Business name | GK Tours and Travels | ✔ confirmed |
| Office town / address | Tirupati, Andhra Pradesh | |
| Phone numbers | +91 9505999160, +91 8074395059 | ✔ confirmed |
| WhatsApp number | +91 9505999160 (assumed: first phone) | confirm |
| Gmail shown on the site | gk.tours.travelz@gmail.com | ✔ confirmed |
| Website domain (if bought) | gopipilgrimsandtravels.in | ✔ live |
| Logo file (optional) | marigold circle | |

## 2. Who receives the enquiry emails

List every Gmail address that should get a copy of each enquiry (owner, manager, booking desk…).

For each address, open **https://web3forms.com**, enter the address and press "Create Access Key". The key arrives in that inbox. Send me the keys. They are not secret passwords, since they only allow sending mail *to* that inbox.

| Person / role | Gmail | Web3Forms key |
|---|---|---|
| | | |
| | | |

## 3. Packages

Copy this block once per package. Any number of packages works. You can remove, replace or add to the current eight.

```
Name:              (e.g. Tirumala darshan circuit)
Region:            Rayalaseema / Tamil Nadu
Kind:              Pilgrimage / Heritage / Nature / Adventure  (one or more)
Places, in order:  (e.g. Tirupati, Tirumala, Srikalahasti, Kanipakam)
Days / nights:     (e.g. 2 days, 1 night)
Starting price:    ₹ ____ per person
Price basis:       (e.g. twin sharing, AC car, from Tirupati)
What's included:   (3–4 short points)
One-line description:
```

## 3a. Car fares (the Tariff page)

Taken from your fare sheet `GK_Travels_Fare_Price_Professional.xlsx` (21 Sep 2026) and shown as
cards in the same grid as the trip packages, under the **Car fare** filter.
Edit `shared/fares.js` to change any of it.

**Three routes have no fare in the sheet, so the page says "Contact for price":**

| Route | Sedan one way | Sedan two way | SUV one way | SUV two way |
|---|---|---|---|---|
| Tirupati → Alivelu Mangapuram | | | | |
| Tirupati → Madurai | | | | |
| Tirupati → Srisailam | | | | |

(The Alivelu Mangapuram rows said "trip" instead of a number — send the fares and they go straight in.)

**Please also confirm:**

- [ ] Fares are for the **whole vehicle**, not per person. The page says so.
- [ ] Each fare card shows the cheapest **sedan one-way** fare in its corner stamp. Right figure to lead with?
- [ ] "Two way" = the return trip, same day. Is there an extra charge if the party stays overnight?
- [ ] "Toll, parking and permit charges where they apply are extra." Correct? Or are fares all-inclusive?
- [ ] Is there a driver batta / night halt charge to show?
- [ ] Is there a km limit on each fare, after which extra km are charged?
- [ ] "Golden Temple" is shown as **Golden Temple, Vellore** (Sripuram). Right one?
- [ ] "Alivelu Mangapuram" is described as the Padmavathi temple at **Tiruchanur**. Right one?
- [ ] Tempo Traveller and mini bus are offered in the enquiry form but have no fares. Add them?


## 4. Form choices

- **Pickup points** (currently Tirupati, Chennai, Bengaluru, Kadapa, Anantapur, Kurnool, Vellore, Other):
- **Vehicles** (currently Sedan 4 seats, Innova/SUV 7 seats, Tempo Traveller 12 seats, Mini bus 20+ seats):

## 5. Please confirm these promises in the page text

The page currently says the following. Confirm each or give the correct wording.

- [ ] "We reply the same day."
- [ ] "We'll call you within a few hours" (shown after an enquiry is sent).
- [ ] "Nothing is charged now" (on the booking form).
- [ ] "Pay the balance after the trip" (booking step 4). What is the real advance/payment rule?
- [ ] Hero line: "Temple towns, canyon forts and hill air, a short drive from Tirupati." Is Tirupati the right base town?

## 6. Three day-trip packages were removed — we need their real prices

Kanipakam, Srikalahasti and Gudimallam each used to appear on the site **twice**:
once as a day-trip package, once as a point-to-point car fare. Both sold the same
journey, so the duplicates have been removed. **The car fare cards were kept**,
because their prices come from your own fare sheet. The three day-trip packages
were deleted, because their prices were placeholders we invented before the sheet
arrived — and they were lower than the one-way car fare, which cannot be right:

| Temple | Car fare, one way | Car fare, return | Old day-trip price (deleted) |
|---|---|---|---|
| Kanipakam | ₹2,200 | ₹3,800 | ₹1,799 |
| Srikalahasti | ₹2,200 | ₹3,300 | ₹1,299 |
| Gudimallam | ₹1,400 | ₹2,200 | ₹1,199 |

The site now sells these three as a car and driver only. What the packages also
offered — darshan queue guidance, Rahu-Ketu pooja timing at Srikalahasti, the
Kalamkari workshop stop — is no longer advertised for them.

**If you want those day trips back as proper packages, send the real price for
each** (car both ways, plus the darshan help):

- [ ] Kanipakam day trip: ₹______
- [ ] Srikalahasti day trip: ₹______
- [ ] Gudimallam day trip: ₹______
