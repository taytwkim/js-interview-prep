window.QueueApp = {};

QueueApp.statusLabels = { open: "Open", progress: "In progress", closed: "Closed" };
QueueApp.priorityLabels = { high: "High", medium: "Medium", low: "Low" };
QueueApp.priorityOrder = { high: 0, medium: 1, low: 2 };

QueueApp.sampleTickets = [
  { id: 1, title: "Cannot sign in", customer: "Alex Chen", priority: "high", status: "open" },
  { id: 2, title: "Invoice has wrong address", customer: "Morgan Lee", priority: "medium", status: "progress" },
  { id: 3, title: "Export button is missing", customer: "Sam Rivera", priority: "low", status: "open" },
  { id: 4, title: "Update notification settings", customer: "Casey Patel", priority: "low", status: "closed" },
  { id: 5, title: "Report takes too long", customer: "Morgan Lee", priority: "high", status: "progress" },
  { id: 6, title: "Payment confirmation missing", customer: "Jordan Park", priority: "high", status: "open" }
];
