export function getWeek(date = new Date()) {
  const nearestThursday = new Date();
  nearestThursday.setDate(date.getDate() + 4 - (date.getDay() || 7));

  const firstDayOfYear = new Date(nearestThursday.getFullYear(), 0, 1);

  // The number of full weeks to today's date
  const weeks = Math.ceil((((date - firstDayOfYear) / 86400000) + 1) / 7);

  return weeks;
}

export function getYear(date = new Date()) {
  return date.getFullYear();
}

export function getDay(date = new Date()) {
  return ((date.getDay() + 6) % 7) + 1;
}
