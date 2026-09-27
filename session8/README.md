# Session 8: Expense Review Queue

## Interview brief

This internal dashboard lets a reviewer filter expense requests, select requests, and approve them in bulk. Support has reported **one selection bug**.

Take time to understand the project before changing code. Aim for about 30–40 minutes overall, including orientation and verification. You can read quietly, make a short file/function map, and explain your findings in chunks. You do not need to narrate every line.

## Run

Open `session8/index.html` with Live Server. If the repository is served on port 5500:

http://127.0.0.1:5500/session8/index.html

Alternatively, from the repository root:

```sh
cd session8
python3 -m http.server 8008 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8008. No dependencies or external services are required. Native ES modules require HTTP. Refresh or Reset example restores the sample requests and clears selection.

## Report ER-108: “Select all visible” disagrees with the rows

1. Reset the example.
2. Set Category to **Travel**.
3. Check **Select all visible**. Both Travel rows should be selected; the selected count should be 2.
4. Change Category to **Meals**.

**Actual:** Select all visible appears checked, even though neither Meals row is checked. Clicking it does not select the Meals rows.

**Expected:** after switching to Meals, Select all visible is unchecked. Checking it selects both Meals rows while preserving the two hidden Travel selections, giving 4 selected requests.

There is one intentional root-cause defect. Fix the selection behavior without clearing selection whenever filters change or removing the select-all control.

## Product requirements

- Selection belongs to request IDs and survives filtering and sorting.
- Each row checkbox changes only that request's selection.
- Select all visible is checked **only when every currently visible request is selected** and at least one request is visible.
- If some visible rows are selected, the control displays a mixed state. If none are selected, it is unchecked. Hidden selections do not determine this indicator.
- Using Select all visible when not all visible rows are selected selects every visible row and preserves hidden selections.
- Using it when all visible rows are selected deselects those visible rows only. Hidden selections remain.
- With no visible requests, Select all visible is unchecked and disabled.
- Category, status, and search combine. Search matches employee or description and ignores capitalization and outer whitespace.
- Sorting changes row order only. It must not change selection or totals.
- Selected count and selected amount include hidden selected requests.
- Approve selected changes selected requests to Approved, clears selection, and preserves other fields. It works for hidden selected requests too. It is disabled with no selection.
- Previously approved requests remain selectable; approving them again has no additional effect on their status.
- Reset example restores six Pending requests and clears all controls and selection.

## Sample requests

| ID | Employee | Category | Amount |
|---|---|---|---:|
| E101 | Alex Chen | Travel | $120.00 |
| E102 | Morgan Lee | Travel | $80.00 |
| E103 | Sam Rivera | Meals | $25.00 |
| E104 | Casey Patel | Meals | $35.00 |
| E105 | Jordan Park | Supplies | $60.00 |
| E106 | Taylor Brooks | Supplies | $40.00 |

## Verification scenarios

- Reproduce the report, then select both Meals requests. Expect 4 selected requests totaling $260.00.
- With those four selected, deselect all visible Meals rows. Expect the two Travel selections to remain, totaling $200.00.
- With the same two Travel requests selected, switch to All categories. The select-all control should show a mixed state. Select all to get 6 requests totaling $360.00; deselect all to get zero.
- Select one visible row. Confirm the mixed state, then select all visible and verify every visible row is checked.
- Change sort order and confirm the same request IDs remain selected.
- Select Travel requests, filter to Meals, and approve selected. Only Travel requests should become Approved. Selection should clear.
- Search for `no-match` while some requests are selected. The select-all control is disabled, but hidden selections remain available for approval.
- Reset restores the initial state.

## File map

```text
session8/
├── README.md
├── index.html
├── style.css
└── src/
    ├── main.js       Startup and user-action handlers
    ├── data.js       Example requests
    ├── store.js      Filter, selection, and approval state
    ├── selectors.js  Derived view data
    └── view.js       DOM rendering
```

Start with the entry point and identify where user actions, stored state, and rendering connect. The interviewer will listen to your investigation and ask follow-up questions; hints are available only on request. No solutions are included.
