# Session 1: Shopping List

This is a small shopping list built with plain HTML, CSS, and browser JavaScript. You should be able to add items with quantities, mark items as bought, remove items, and show only items you still need to buy.

The app contains **three intentional bugs**. Your task is to investigate and fix them. Allow about **20–30 minutes**, but take extra time for questions if you need it.

## Files

```text
session1/
├── README.md
├── index.html
├── style.css
└── script.js
```

- `index.html` defines the page's elements.
- `style.css` controls their appearance.
- `script.js` handles interactions and updates the page.

## Run locally

1. Open this folder in your file manager.
2. Double-click `index.html` to open it in your browser.
3. Keep the files open in your editor. After saving a change, refresh the browser to load it.

No installation, server, or external library is needed. Changes to the shopping list are stored only while the page is open. Refreshing resets the sample data.

To open your browser's developer tools, right-click the page and select **Inspect**. The **Console** tab shows JavaScript errors and lets you evaluate JavaScript expressions.

## Expected behavior

- On a fresh page, the list contains Apples (quantity 2, not bought) and Bread (quantity 1, bought). The total quantity is 3.
- Adding Milk with quantity 3 creates one new row and changes the total quantity to 6. The item-name field clears and the quantity resets to 1.
- Empty or whitespace-only item names are rejected. Quantities must be positive whole numbers.
- Checking or unchecking an item's Bought checkbox changes that item's bought status.
- Selecting **Show only items still to buy** displays only items that are not bought. Clearing it displays all items again.
- Clicking **Remove** deletes just that item and updates the total quantity.
- The total quantity always includes all items, including bought items and items hidden by the filter.
- When no items match the current view, the page displays a message instead of list rows.

## How we'll practice

Start by using the app and comparing what happens with the expected behavior. Describe what you observe and talk through your reasoning while you investigate.

Ask questions about HTML, the DOM, or JavaScript whenever you need to. I'll explain those concepts without revealing the bugs. If you get stuck, ask for a small hint. I'll provide a solution only if you explicitly request it.
