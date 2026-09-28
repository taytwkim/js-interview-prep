# Session 9: Reply Library

## Interview brief

A support team maintains reusable reply templates. Agents can search the library, edit a template, and create a new template using the same editor panel.

There is **one intentional root-cause bug**. Investigate the report, make a focused fix, and verify the surrounding workflows. Allow **25–35 minutes**, including time to map the code. No framework, dependencies, or backend are involved.

## Run

Open `session9/index.html` with Live Server. If your server serves the repository on port 5500:

http://127.0.0.1:5500/session9/index.html

Alternatively, from the repository root:

```sh
cd session9
python3 -m http.server 8009 --bind 127.0.0.1
```

Visit http://127.0.0.1:8009. Use HTTP because the app uses ES modules. Refresh restores the three sample templates and closes the editor.

## Report RL-109: Creating a reply unexpectedly replaces another reply

1. Refresh. The library contains three templates.
2. Edit **Shipping update**.
3. Change its title to **Shipping update revised**, then Save.
4. Click **New template**.
5. Enter title **Weekend support**, select **General**, and enter body **Our team will respond on Monday.**
6. Click Save.

**Actual:** the library still contains three templates. Weekend support replaces the previously edited Shipping update revised template.

**Expected:** there are four templates. Shipping update revised remains with its original ID and saved content. Weekend support is a separate template with its own ID.

Creating a template immediately after a fresh page load works. The problem depends on the user's earlier actions. Do not solve it by forcing a reload between actions or removing the shared editor.

## Product requirements

- Edit loads the chosen template. Saving updates only that template and preserves its ID.
- New template always opens blank title/body fields with General selected. Saving creates a new template with a unique ID regardless of earlier actions.
- Cancel closes the editor without changing the library. New or Edit while another draft is open discards the previous unsaved draft.
- Title and body must contain non-whitespace text. Invalid saves show a message, keep the editor open, and make no library changes.
- Save trims outer whitespace from title and body. Duplicate titles are allowed; identity depends on IDs.
- Search matches title or body, ignoring capitalization and outer whitespace. Category filtering combines with search.
- Changing filters does not change the open draft or the identity of the template being edited. Saving follows those filters; a saved template may be hidden by the current filters.
- The total count describes the whole library; the visible count describes the filtered results.
- All data is in memory and resets on refresh. No messages are actually sent.

## Verification scenarios

Start from a fresh reload for each independent scenario.

| Scenario | Expected |
|---|---|
| Follow the reported workflow | Four templates; both the revised and new template remain |
| Create two new templates | Five total; distinct IDs; both open with their own content |
| Edit a template, change its body, then Cancel | Original content preserved |
| Open Edit, then Cancel, then create a new template | Four total; existing records unchanged |
| Open Edit, change a field, then click New template and save a new reply | Old unsaved change discarded; separate new template created |
| Create a reply, then edit that reply | Count unchanged by the edit; same ID |
| Submit whitespace-only title or body | Error; editor stays open; count/content unchanged |
| Search for `tracking` | Only Shipping update appears |
| Choose Billing and search for `no-match` | Empty state, zero visible, total count unchanged |

## Project map

```text
session9/
├── README.md
├── index.html
├── style.css
└── src/
    ├── data.js     Initial templates
    ├── store.js    Library state and save operations
    ├── editor.js   Shared form and editor actions
    ├── view.js     Filtering and library rendering
    └── main.js     Startup and filter controls
```

Take a few minutes to understand input → state → output. Before inspecting a value or adding a breakpoint, say what you want to learn. It's fine to read quietly, then summarize. At the end, explain the cause, your change, and your verification. Hints are available only if requested.
