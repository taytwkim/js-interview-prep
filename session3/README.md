# Session 3: Support Queue

## Interview brief

You have joined a team maintaining a small internal support-ticket dashboard. Agents use it to find tickets, inspect and edit them, and close selected tickets in bulk. The app is already implemented, but users report incorrect behavior in several workflows.

Investigate and fix **three intentional bugs**. This is a more demanding practice exercise, designed for a **60-minute interview**. It is not based on knowledge of your actual interview's codebase.

You may edit any application file. Keep the app in vanilla browser JavaScript. You do not need to redesign it, add dependencies, or rewrite the architecture. Explain how you reproduce each issue, trace its cause, and verify your fix. Questions about unfamiliar syntax are welcome.

## Run locally

Double-click `index.html` to open it in a browser. No server, build step, package installation, or internet connection is required. Changes to tickets live in memory; refreshing the page restores the six sample tickets and clears all edits and selections.

Open developer tools through right-click → Inspect. The Console and Sources tabs are available for inspecting values and stepping through code. Save source changes and refresh to load them.

## File map

```text
session3/
├── README.md
├── index.html
├── style.css
└── js/
    ├── data.js       Sample tickets and configuration
    ├── store.js      Application state and ticket operations
    ├── view.js       Filtering, sorting, and dashboard rendering
    ├── editor.js     Ticket form and draft lifecycle
    └── app.js        Event handlers and application startup
```

Scripts run in the order listed in `index.html`. They share one object named `QueueApp`. For example, `QueueApp.render()` calls the render function defined in `view.js`. This app uses ordinary script files rather than JavaScript modules.

## Product requirements

- Every ticket has a stable ID, title, customer, priority, and status. Editing a ticket preserves its ID.
- Search matches a ticket's title or customer, ignoring capitalization and outer whitespace. Status and priority filters combine with search.
- Sort supports ticket ID ascending, ticket ID descending, and priority: High, Medium, Low. Equal priorities use ascending ID.
- The dashboard totals describe **all tickets**, regardless of filters. “Visible tickets” describes the current results.
- Open, In progress, and Closed are the only statuses. High, Medium, and Low are the only priorities.
- Opening a row must show that exact ticket in the editor, regardless of search, filtering, or sorting.
- Existing-ticket edits are drafts. Save validates and commits the draft. Cancel discards every unsaved change. Switching to another ticket or clicking New ticket also discards the previous unsaved draft.
- New tickets need a nonblank title and customer. Save trims outer whitespace and assigns a unique ID. Invalid saves leave the editor open and do not change the queue.
- Each checkbox selects its ticket. Selection remains attached to the same ticket across sorting, and remains selected even when a filter hides that ticket.
- “Close selected” closes **only checked tickets**, including checked tickets hidden by filters. It preserves other fields, clears selection afterward, and is disabled when nothing is selected or while the editor is open.
- “Clear filters” resets search, status, priority, and sort. It preserves tickets and selection.
- Empty results show an explanatory message and a visible count of zero.

## Manual acceptance checks

These checks cover the product broadly; they are not a list of bug locations. Use a page refresh whenever you need the original sample data.

1. On startup, see 6 tickets: 3 Open, 2 In progress, and 1 Closed. No tickets are selected.
2. Search for `  MORGAN ` and see tickets #2 and #5. Clear filters to restore all six.
3. Filter to Open and High priority. See #1 and #6, while dashboard totals stay unchanged.
4. Sort by newest ID. See #6 first and #1 last. Open rows and compare the editor's ID and fields with the row you clicked.
5. Edit an existing ticket's title, customer, priority, and status. Cancel, then reopen it. All original values should remain. Repeat with Save; saved values should remain instead.
6. Try saving a blank or whitespace-only title or customer. See a validation message and no change to the queue.
7. Create two tickets with different names. Both should appear with different IDs, and each should open independently. With filters cleared, totals should include them.
8. Select #1 and #3, then close selected. Only these two tickets should become Closed; the closed total should be 3. Selection should return to zero.
9. Select #2, filter to Open, then close selected. Hidden ticket #2 should become Closed, and no other ticket should change. Clear filters to inspect the result.
10. Search for `zzzz` and see the empty state. Clear filters and see the queue again.

Stop after your fixes and ask for a review. Hints and solutions are available on request; no answer key is included.
