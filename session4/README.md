# Session 4: Workshop Planner

## Your assignment

Maintain a workshop-booking interface written in vanilla browser JavaScript. Users search a workshop catalog, add workshops to a plan, adjust seats, and undo plan changes.

Below are **three reported defects**, with reproduction steps and expected behavior. Your task is to diagnose their causes and fix them. Allow **60–90 minutes**, including orientation to the project. This is a challenging practice simulation, not a claim about your actual interview.

## Start the app

From the repository root, run:

```sh
cd session4
python3 -m http.server 8004 --bind 127.0.0.1
```

Visit **http://127.0.0.1:8004**. Stop the server with Ctrl+C. If port 8004 is occupied, choose another port and use it in the URL.

Use the server rather than double-clicking the HTML: this project uses browser ES modules. Python only serves the files; there is no backend application to debug, no package installation, and no external service. Node, React, and other frameworks are not part of the app.

Save code changes and refresh the browser. All plan data resets on refresh. Open developer tools through right-click → Inspect; Console and Sources are useful here. Enabling “Disable cache” in the Network tab while developer tools are open can help when reloading edits.

## Bug report WP-101 — Results don't match the current search

**Steps**
1. Refresh and wait for all six workshops to appear.
2. Type `d`, then add `o` within about half a second. Leave `do` in the field.
3. Wait two seconds without typing anything else.

**Reported:** the final results can include workshops that don't match `do`.

**Expected:** the final results must match the search field's current text. For `do`, show only **DOM Debugging Lab**. Earlier searches must not overwrite results for a later search. Keep the search usable while results are loading.

## Bug report WP-102 — Undo doesn't restore the previous seat count

**Steps**
1. Refresh and wait for the initial catalog. Do not search for this check.
2. Add **DOM Debugging Lab** once. The plan should have one seat, costing $40.
3. Press its `+` button. The plan should have two seats, costing $80.
4. Press Undo.

**Reported:** the plan still shows two seats.

**Expected:** Undo restores the entire previous plan: one seat and a $40 total. Repeated Undo should walk backward through changes one at a time; a second Undo here should return to an empty plan. This should work for adding, adjusting, removing, and clearing.

## Bug report WP-103 — One Add click changes the plan more than once

**Steps**
1. Refresh and wait for all workshops to appear.
2. Type `dom` into the search box and wait for loading to finish.
3. Clear the search box and wait for all workshops to return.
4. Click Add to plan on **DOM Debugging Lab** exactly once.

**Reported:** the plan can gain multiple seats from that single click.

**Expected:** one click adds exactly one seat, regardless of how often the catalog has been searched or redrawn. Adding a workshop already in the plan increments its seat count by exactly one.

The exact incorrect count may depend on how many search updates ran. The requirement is always one click → one added seat.

## Other behavior to preserve

- Initially there are six catalog workshops and an empty plan with a $0 total.
- Search is case-insensitive, trims outer whitespace, and matches workshop titles. Blank search returns all workshops; `zzzz` returns an empty-state message.
- Catalog search shows a loading indicator. Normal search delays are intentionally simulated and are not themselves a bug. Do not remove the delays or disable search to solve a report.
- Adding creates a plan row with one seat, or increases the existing row's quantity. Each workshop appears at most once in the plan.
- `+` adds one seat; `−` subtracts one. The minimum quantity is one, at which point `−` is disabled. Remove deletes that row.
- Subtotals equal price × seats; the grand total is the sum of subtotals. Prices are whole-dollar USD amounts.
- Each successful plan change can be undone. No-op actions should not create an undo entry. Search changes must not create undo entries.
- Clear plan empties the plan and can be undone. Undo is disabled when there is no history.

## Project map

```text
session4/
├── README.md
├── index.html
├── style.css
└── src/
    ├── main.js          Entry point and coordination
    ├── data.js          Workshop fixtures
    ├── api.js           Simulated asynchronous catalog API
    ├── store.js         Plan state, operations, history, subscriptions
    ├── catalog-view.js  Catalog rendering and events
    └── plan-view.js     Plan rendering and events
```

Start at `index.html`, follow its module entry point, then follow imports. Unlike session3, these files do not share a global application object. A module makes values available with `export`; another module accesses them using `import`.

## Vocabulary available before you start

These concepts describe the architecture, not the locations or fixes for the reports:

- **ES module:** a file with its own scope that can import and export values. Relative browser imports include `.js`.
- **Promise / async / await:** the API returns a Promise for a future result. `await` pauses that async function until the result arrives; the page can still process other events.
- **Subscription:** `subscribe(callback)` registers a function to call when plan state changes. Here it connects state updates to rendering.
- **Event delegation:** a parent element handles clicks from buttons inside it. `closest()` finds the nearest matching element, and `dataset` reads `data-*` attributes.
- **History snapshot:** an earlier state kept so Undo can restore it.

Fix the root causes while preserving these features. No answer key or bug markers are included. Ask for navigation help, a concept explanation, or a small hint whenever you need one.
