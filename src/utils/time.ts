export const secondsInMinute = 60;
export const secondsInHour = secondsInMinute * 60;
export const secondsInDay = secondsInHour * 24;

export function humanReadableTime(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / secondsInDay);
  totalSeconds %= secondsInDay;

  const hours = Math.floor(totalSeconds / secondsInHour);
  totalSeconds %= secondsInHour;

  const minutes = Math.floor(totalSeconds / secondsInMinute);
  totalSeconds %= secondsInMinute;

  const seconds = totalSeconds;

  if (days > 0)
    return `${days} days ${hours} hours`;
  if (hours > 0)
    return `${hours} hours ${minutes} minutes`;
  if (minutes > 0)
    return `${minutes} minutes ${seconds} seconds`;
  return `${seconds} seconds`;
}
