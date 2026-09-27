export const clients = [
  {
    id: "harbor", name: "Harbor Books", owner: "Alex", targetDate: "October 6",
    brief: "Harbor Books is preparing a new online ordering portal for independent bookstores.",
    checklist: [
      { id: "owner", label: "Assign owner", done: true },
      { id: "access", label: "Confirm access", done: false },
      { id: "review", label: "Review handoff", done: false }
    ]
  },
  {
    id: "northstar", name: "Northstar Studio", owner: "Morgan", targetDate: "October 12",
    brief: "Northstar Studio needs its design library and asset permissions transferred to a new team.",
    checklist: [
      { id: "owner", label: "Assign owner", done: true },
      { id: "access", label: "Confirm access", done: true },
      { id: "review", label: "Review handoff", done: false }
    ]
  },
  {
    id: "ridgeway", name: "Ridgeway Foods", owner: "Jordan", targetDate: "October 20",
    brief: "Ridgeway Foods is rolling out a supplier dashboard and needs an operations handoff.",
    checklist: [
      { id: "owner", label: "Assign owner", done: false },
      { id: "access", label: "Confirm access", done: false },
      { id: "review", label: "Review handoff", done: false }
    ]
  }
];
