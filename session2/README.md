# Session 2: Lunch Finder

A café has a small lunch menu. This page should help you search for a dish, stay within a budget, and hide sold-out dishes. It uses only HTML, CSS, and browser JavaScript.

There are **three intentional bugs**. Find and fix them by comparing the app with the expected behavior below. Plan for about **20–30 minutes**, with extra time for questions if needed.

## Files

```text
session2/
├── README.md
├── index.html
├── style.css
└── script.js
```

## Run it

Open `index.html` in your browser by double-clicking it in your file manager. No installation or server is needed. Save code changes in your editor, then refresh the browser.

Right-click the page and select **Inspect** to open developer tools. You can use the Console to inspect errors and values, and the Sources tab to set breakpoints.

## Expected behavior

- Initially, all six dishes appear and the result count is 6.
- Search updates as you type, ignores capitalization, and ignores spaces at the beginning or end. Searching for `WRAP` displays Chicken Wrap and Veggie Wrap, with a result count of 2.
- The maximum-price dropdown includes dishes that cost **exactly** the selected amount. With an empty search and “Any availability,” choosing $10 shows Tomato Soup, Garden Salad, Veggie Wrap, and Cheese Toastie. The result count is 4.
- Changing the availability dropdown to “Available now” immediately hides sold-out dishes. With the other filters at their defaults, four dishes remain.
- Filters work together. Searching for `wrap`, choosing $10, and selecting “Available now” shows only Veggie Wrap, with a result count of 1.
- A search for `pizza` shows no dishes, a result count of 0, and “No dishes match your filters.”
- Clicking “Clear filters” clears the search, restores both dropdowns to their defaults, and displays all six dishes again.

The menu data is fixed for this exercise. Refreshing the page resets the filters.

## Interview practice

Start by reproducing a mismatch between expected and actual behavior. Then trace the relevant event, input values, filtering, and DOM updates. Explain your reasoning as you work.

Ask about unfamiliar HTML or JavaScript whenever you need to. I can explain concepts or provide a small hint on request. Solutions are available only if you explicitly ask for them.
