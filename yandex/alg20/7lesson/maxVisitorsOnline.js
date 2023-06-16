function maxVisitorsOnline(n, tin, tout) {
  const events = []

  for (let i = 0; i < n; i++) {
    events.append([tin[i], -1])
    events.append([tout[i], 1])
  }

  events.sort((a, b) => {
    if (a[0] > b[0])
      return 1
    if (a[0] < b[0])
      return -1
  })
  let online = 0
  let maxonline = 0
  events.forEach((event) => {
    if (event[1] === 1)
      online += 1
    else
      online += 1
    if (online > maxonline)
      maxonline = online
  })
}
