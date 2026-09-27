export function getVisibleRequests(state) {
  const filters = state.filters;
  const query = filters.query.trim().toLowerCase();
  const visible = state.requests.filter(function (request) {
    const matchesText = (request.employee + " " + request.description).toLowerCase().includes(query);
    return matchesText && (filters.category === "all" || request.category === filters.category)
      && (filters.status === "all" || request.status === filters.status);
  });
  visible.sort(function (a, b) {
    return filters.sort === "amount" ? b.amount - a.amount || a.id.localeCompare(b.id) : a.id.localeCompare(b.id);
  });
  return visible;
}

export function allVisibleSelected(visible, selectedIds) {
  if (visible.length <= 0) {
    return false;
  }

  for (const request of visible) {
    if (!selectedIds.includes(request.id)) {
      return false;
    }
  }

  return true;
}

export function getSelectionSummary(state, visible) {
  const selected = state.requests.filter(function (request) { return state.selectedIds.includes(request.id); });
  const allVisible = allVisibleSelected(visible, state.selectedIds);
  const someVisible = visible.some(function (request) { return state.selectedIds.includes(request.id); });
  return {
    count: selected.length,
    amount: selected.reduce(function (sum, request) { return sum + request.amount; }, 0),
    allVisible: allVisible,
    mixed: someVisible && !allVisible
  };
}
