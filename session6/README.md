# Session 6: Training Order Review

## Interview brief

You are maintaining an internal page used to review a company's training order before checkout. An order contains workshop reservations. A coordinator can adjust seat counts, cancel or restore reservations, and inspect the order total.

Support has reported the issue below. There is **one intentional root-cause bug**. Diagnose and fix it while preserving the existing behavior. Aim for **25–35 minutes**, including explaining your investigation and verification.

Use vanilla JavaScript. You may inspect or edit any application file. No new features, framework migration, or visual redesign is needed.

## Run

Open `session6/index.html` with Live Server. If your server is running from the repository root on port 5500:

http://127.0.0.1:5500/session6/index.html

Alternatively, from the repository root:

```sh
cd session6
python3 -m http.server 8006 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8006. The app uses native ES modules and needs an HTTP server, but no installation or external services. Refresh or click Reset example to restore the starting order.

## Report TR-106: Total is incorrect after a reservation is canceled

**Reproduction**

1. Reset the example.
2. Confirm the initial total is **$270.00**.
3. Cancel **Data Storytelling**.
4. Look at the order summary.

**Actual:** the amount due becomes **$180.00**.

**Expected:** the amount due is **$200.00**.

The canceled reservation should remain available to restore, but it must not affect the price of the current order. Investigate why the displayed total does not match the rules below.

## Pricing and interaction rules

- An active reservation contributes `seats × price per seat` to the subtotal.
- Canceled reservations contribute nothing to the subtotal or discount eligibility.
- An order with **at least 5 active seats** receives a **10% discount on the entire active subtotal**. Otherwise, no discount applies.
- Amount due equals subtotal minus discount. There are no taxes or fees in this exercise.
- Prices are stored as integer cents. Round the discount to the nearest whole cent.
- Seat counts must be whole numbers from 1 through 20. Invalid changes show an error and leave the previous stored quantity intact.
- Cancel preserves the reservation's seat count. Restore makes that same reservation active again.
- Filtering the table changes only which reservations are visible; it must not change the order summary.
- All-canceled orders show zero active seats and $0.00 due. An empty filtered view displays a message.
- All data is local and resets on reload. There is no real payment processing.

## Starting order

| Workshop | Seats | Price per seat | Status |
|---|---:|---:|---|
| DOM Debugging Lab | 2 | $40.00 | Active |
| Design Systems Basics | 2 | $60.00 | Active |
| Data Storytelling | 2 | $50.00 | Active |

## Verification examples

Each case starts from Reset example unless it says otherwise.

| Action | Active seats | Subtotal | Discount | Amount due |
|---|---:|---:|---:|---:|
| No changes | 6 | $300.00 | $30.00 | $270.00 |
| Cancel Data Storytelling | 4 | $200.00 | $0.00 | $200.00 |
| Then increase DOM Debugging Lab to 3 seats | 5 | $240.00 | $24.00 | $216.00 |
| Set every reservation to 1 seat | 3 | $150.00 | $0.00 | $150.00 |
| Cancel all reservations | 0 | $0.00 | $0.00 | $0.00 |
| Cancel and then restore Data Storytelling | 6 | $300.00 | $30.00 | $270.00 |

Also verify that changing the visibility filter does not change the totals, and that invalid quantities are rejected.

## Project map

```text
session6/
├── README.md
├── index.html
├── style.css
└── src/
    ├── main.js     Startup and user actions
    ├── data.js     Example reservations
    ├── store.js    Order state and mutations
    ├── pricing.js Order calculations and currency formatting
    └── view.js    Table and summary rendering
```

## Interview format

Talk through your investigation as though a teammate is watching. Before using a breakpoint or log, say what you want to learn. Explain what the evidence shows, what you will change, and which cases you will verify afterward.

The interviewer will respond to your reasoning and questions, but will not identify the bug type or offer hints unless requested. You do not have to narrate every line or guess the cause immediately. Start by describing your understanding of the report and your first investigation step.
