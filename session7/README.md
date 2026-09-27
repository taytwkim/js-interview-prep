# Session 7: Team Directory

## Interview brief

You maintain an internal employee directory. Users browse a paginated table, search by name or email, filter by team, and change the sort order.

Support has reported **one bug**. Reproduce it, explain a hypothesis, investigate, make a focused fix, and verify the affected workflows. Aim for **20–30 minutes**. Use tools when they answer a specific question; narrating every line is not required.

## Run

Open `session7/index.html` with Live Server. If it serves the repository on port 5500:

http://127.0.0.1:5500/session7/index.html

Alternatively:

```sh
cd session7
python3 -m http.server 8007 --bind 127.0.0.1
```

Visit http://127.0.0.1:8007. Native ES modules require HTTP. No dependencies or external services are used. Refresh or Reset example restores the original view.

## Report TD-107: Search sometimes hides people who exist

**Steps**

1. Reset the example. The directory contains 12 people.
2. Click **Next** once.
3. Enter `morgan` into Search.

**Actual:** no contact rows appear, even though the result count says there are two matches.

**Expected:** Morgan Lee and Morgan Park appear, and the directory displays page 1 of 1.

The same search works after a fresh reset. Diagnose the inconsistent behavior without removing pagination or disabling search on later pages.

## Product requirements

- Display four people per page. The initial view is page 1 of 3, sorted by name A–Z.
- Search updates while typing and matches name or email, ignoring case and outer whitespace.
- Team and search filters combine. The result count is the total number of matches across all pages.
- Every change to search, team, or sort starts the resulting view at page 1.
- Sort supports name A–Z and Z–A and applies across the full set of matches before pagination.
- Next and Previous move one page at a time and must not navigate beyond the available results.
- The range label reflects the displayed rows, such as “Showing 5–8 of 12.”
- With zero matches, display “No people match your filters,” “Showing 0 of 0,” and “Page 1 of 1,” with both navigation buttons disabled.
- Reset example clears search, restores All teams and A–Z sorting, and shows the first page.

## Verification examples

Start from Reset example for each case.

| Action | Expected result |
|---|---|
| No changes | 12 matches; Alice Brown through Dan Wu; page 1 of 3 |
| Next | Evan Singh through Hugo Chen; showing 5–8 of 12 |
| Next twice, then Previous | Page 2 of 3, with Evan Singh through Hugo Chen |
| Next, then search `morgan` | Morgan Lee and Morgan Park; 2 matches; page 1 of 1 |
| Next twice, then select Design | Ben Carter, Farah Ali, and Morgan Lee; page 1 of 1 |
| Search `  MORGAN `, then select Sales | Morgan Park only |
| Next, then sort Z–A | Starts at page 1, with Morgan Park first |
| Search `nobody-here` | Empty state, zero results, both navigation buttons disabled |
| Then clear that search | First page of all 12 people |

## Project map

```text
session7/
├── README.md
├── index.html
├── style.css
└── src/
    ├── main.js       User interactions and startup
    ├── data.js       Directory records
    ├── store.js      Current view settings and state updates
    ├── directory.js  Search, sorting, and page data
    └── view.js       DOM rendering
```

There is one intentional root-cause defect and no answer key. Read the report, describe your first hypothesis or investigation step, and work aloud. I will act as the interviewer and offer hints only if requested.
