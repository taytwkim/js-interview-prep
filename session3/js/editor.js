QueueApp.editorFields = {
  title: document.querySelector("#edit-title"),
  customer: document.querySelector("#edit-customer"),
  priority: document.querySelector("#edit-priority"),
  status: document.querySelector("#edit-status")
};

QueueApp.openEditor = function (id) {
  QueueApp.beginDraft(id);
  const draft = QueueApp.state.draft;
  if (!draft) return;

  document.querySelector("#editor-heading").textContent = draft.id === null ? "New ticket" : "Ticket #" + draft.id;
  for (const field of Object.keys(QueueApp.editorFields)) {
    QueueApp.editorFields[field].value = draft[field];
  }
  document.querySelector("#editor-message").textContent = "";
  document.querySelector("#app-message").textContent = "";
  document.querySelector("#editor-placeholder").hidden = true;
  document.querySelector("#ticket-form").hidden = false;
  QueueApp.render();
  QueueApp.editorFields.title.focus();
};

QueueApp.hideEditor = function () {
  document.querySelector("#ticket-form").hidden = true;
  document.querySelector("#editor-placeholder").hidden = false;
  document.querySelector("#editor-message").textContent = "";
};

QueueApp.bindEditor = function () {
  for (const field of Object.keys(QueueApp.editorFields)) {
    const input = QueueApp.editorFields[field];
    const eventType = field === "title" || field === "customer" ? "input" : "change";
    input.addEventListener(eventType, function () {
      QueueApp.updateDraft(field, input.value);
    });
  }

  document.querySelector("#ticket-form").addEventListener("submit", function (event) {
    event.preventDefault();
    for (const field of Object.keys(QueueApp.editorFields)) {
      QueueApp.updateDraft(field, QueueApp.editorFields[field].value);
    }
    const error = QueueApp.saveDraft();
    if (error) {
      document.querySelector("#editor-message").textContent = error;
      return;
    }
    QueueApp.hideEditor();
    document.querySelector("#app-message").textContent = "Ticket saved.";
    QueueApp.render();
  });

  document.querySelector("#cancel-edit").addEventListener("click", function () {
    QueueApp.discardDraft();
    QueueApp.hideEditor();
    QueueApp.render();
  });
};
