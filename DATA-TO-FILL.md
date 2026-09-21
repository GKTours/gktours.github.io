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
Region:            Rayalaseema / North Tamil Nadu
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
