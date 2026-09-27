export function getDirectoryPage(people, state) {
  const query = state.query.trim().toLowerCase();
  const matches = people.filter(function (person) {
    const matchesQuery = person.name.toLowerCase().includes(query) || person.email.toLowerCase().includes(query);
    const matchesTeam = state.team === "all" || person.team === state.team;
    return matchesQuery && matchesTeam;
  });

  matches.sort(function (a, b) {
    const order = a.name.localeCompare(b.name);
    return state.sort === "desc" ? -order : order;
  });

  const total = matches.length;
  const pageCount = Math.max(1, Math.ceil(total / state.pageSize));
  const startIndex = (state.page - 1) * state.pageSize;
  const rows = matches.slice(startIndex, startIndex + state.pageSize);

  return {
    rows: rows,
    total: total,
    page: state.page,
    pageCount: pageCount,
    first: rows.length > 0 ? startIndex + 1 : 0,
    last: rows.length > 0 ? startIndex + rows.length : 0,
    hasPrevious: state.page > 1,
    hasNext: state.page < pageCount
  };
}
