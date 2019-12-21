export function getWeek(date = new Date()) {
  const nearestThursday = new Date()
  nearestThursday.setDate(date.getDate() + 4 - (date.getDay() || 7));

  const firstDayOfYear = new Date(nearestThursday.getFullYear(), 0, 1);

  // The number of full weeks to today's date
  const weeks = Math.ceil((((date - firstDayOfYear) / 86400000) + 1) / 7);

  return weeks;
}
