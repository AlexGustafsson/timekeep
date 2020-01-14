export function getWeek(date = new Date()) {
  const nearestThursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  nearestThursday.setUTCDate(nearestThursday.getUTCDate() + 4 - (nearestThursday.getUTCDay() || 7));

  const firstDayOfYear = new Date(Date.UTC(nearestThursday.getUTCFullYear(), 0, 1));

  // The number of full weeks to today's date
  const week = Math.ceil((((nearestThursday - firstDayOfYear) / 86400000) + 1) / 7);

  return week;
}

export function getYear(date = new Date()) {
  return date.getFullYear();
}

export function getDay(date = new Date()) {
  return ((date.getDay() + 6) % 7) + 1;
}
