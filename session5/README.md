# Session 5: Client Handoff Board

An internal dashboard helps a team prepare client handoffs. Select a client to load its brief, edit its readiness checklist, and add notes to an activity log.

This is a second attempt at the concepts from session4, in different workflows. There are **three intentional bugs**. Allow 45–60 minutes, or take longer to explain your reasoning. The reports below identify the problems; your job is to trace and fix their causes.

## Run

Use **Open with Live Server** on `session5/index.html`. If Live Server serves the repository on port 5500, visit:

http://127.0.0.1:5500/session5/index.html

Alternatively, from the repository root:

```sh
cd session5
python3 -m http.server 8005 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8005. No dependencies or installation are required. Use HTTP rather than double-clicking the HTML because the app uses ES modules. Refresh restores all sample data and clears notes and drafts.

## Report HB-201: A brief belongs to the wrong client

1. Refresh and wait for the initial brief to load.
2. Select **Northstar Studio**, then select **Ridgeway Foods** within about one second.
3. Wait three seconds without clicking again.

**Reported:** the selected client heading says Ridgeway Foods, but the brief describes Northstar Studio.

**Expected:** the brief, owner, and target date must belong to the currently selected client. An older result must never replace the current client's brief. Loading and error messages must also describe the current selection.

The API intentionally simulates different response times to reproduce variable network latency. Preserve those delays and allow users to switch clients while a brief is loading. There is no real remote service.

## Report HB-202: Cancel keeps checklist changes

1. Refresh. Harbor Books is selected initially, with 1 of 3 tasks complete.
2. Click **Edit checklist**.
3. Check **Confirm access** and uncheck **Assign owner**.
4. Click **Cancel**.
5. Reopen the checklist.

**Reported:** the unsaved changes remain. The completed count alone can hide this because it is still 1 of 3.

**Expected:** Cancel preserves the original checkboxes: only Assign owner is checked. Save commits the changes instead. Switching clients while editing discards the draft. One client's checklist must never change another client's checklist.

## Report HB-203: One saved note appears multiple times

1. Refresh and stay on Harbor Books.
2. Click **Add note**, then **Cancel**. Repeat that once more.
3. Click **Add note** again, enter `Handoff reviewed`, and click **Save note** once.

**Reported:** the activity log contains multiple copies of the note.

**Expected:** one submission creates exactly one note for the selected client, regardless of how many times the composer has been opened or canceled. Cancel creates no note. Blank or whitespace-only notes show a validation message and leave the composer open.

## Other behavior to preserve

- The app has three clients. Selection updates the heading, checklist summary, and client-specific activity log immediately while the brief loads.
- The brief should show “Loading client brief…” during its request. Previous-client text should not remain visible as though it belongs to the new client.
- Checklist summaries always show committed data. Draft edits must not change the saved checklist until Save.
- Clicking Edit checklist while already editing starts again from committed data. Switching clients dismisses both editors.
- Notes are trimmed, displayed as plain text, and shown newest first. Notes stay with their client when switching selections.
- Saving or canceling a note closes its composer. Opening it again starts with an empty field.
- Refresh resets the entire exercise. There is no persistence or real message sending.

## File map

```text
session5/
├── README.md
├── index.html
├── style.css
└── src/
    ├── main.js      Startup, selection, and brief loading
    ├── data.js      Client fixtures
    ├── api.js       Simulated asynchronous brief API
    ├── store.js     Selection, checklists, drafts, and notes
    ├── view.js      Main dashboard rendering
    └── editors.js   Checklist editor and note composer
```

Start at the module entry point in `index.html`, then follow imports. This exercise uses the same browser concepts as session4; there is no framework, build tool, or backend to learn.

Reproduce one report at a time. State a hypothesis, inspect the relevant values or calls, make a small fix, and repeat the report. Check that ordinary successful actions still work. No solutions or bug-location comments are included. Ask for a hint only when you want one.
