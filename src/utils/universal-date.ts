export type UTCValues = {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

type DateLike = Date | UniversalDate | string | number;

// A wrapper around Date to provide simple-to-use, all-UTC methods
export default class UniversalDate {
  public date: Date;

  constructor(date?: DateLike) {
    if (date instanceof UniversalDate) this.date = date.date;
    else if (date instanceof Date || typeof date === "number" || typeof date === "string") this.date = new Date(date);
    else this.date = new Date();
  }

  static fromUTC(values: UTCValues) {
    values = {
      year: 0,
      month: 0,
      date: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      ...values,
    };

    return new UniversalDate(new Date(Date.UTC(values.year, values.month, values.date, values.hours, values.minutes, values.seconds, values.milliseconds)));
  }

  get year(): number {
    return this.date.getUTCFullYear();
  }

  get month(): number {
    return this.date.getUTCMonth();
  }

  // Get the ISO 8601 week number
  get week(): number {
    const nearestThursday = new Date(Date.UTC(this.year, this.month, this.day));
    nearestThursday.setUTCDate(nearestThursday.getUTCDate() + 4 - (nearestThursday.getUTCDay() || 7));

    const firstDayOfYear = new Date(Date.UTC(nearestThursday.getUTCFullYear(), 0, 1));

    // The number of full weeks to today's date
    const week = Math.ceil(((nearestThursday.getTime() - firstDayOfYear.getTime()) / 86400000 + 1) / 7);

    return week;
  }

  get day(): number {
    return this.date.getUTCDate();
  }

  // The zero-based day of week where weeks start with a monday
  get dayOfWeek(): number {
    return (this.date.getUTCDay() + 6) % 7;
  }

  // The UTC timestamp (milliseconds since start of epoch)
  get timestamp(): number {
    return this.date.getTime();
  }

  // Compare the year of two dates
  isSameYear(date: DateLike): boolean {
    const universalDate = new UniversalDate(date);
    return universalDate.year === this.year;
  }

  // Compare the week (and implicitly year) of two dates
  isSameWeek(date: DateLike): boolean {
    const universalDate = new UniversalDate(date);
    return universalDate.year === this.year && universalDate.week === this.week;
  }

  // Compare the days (and implicitly week and year) of two dates
  isSameDay(date: DateLike): boolean {
    const universalDate = new UniversalDate(date);
    return universalDate.year === this.year && universalDate.week === this.week && universalDate.dayOfWeek === this.dayOfWeek;
  }

  // Returns a UniversalDate corresponding to the last millisecond of the day
  getEndOfDay(): UniversalDate {
    const endOfDay = new UniversalDate(this.date);
    endOfDay.date.setUTCHours(23);
    endOfDay.date.setUTCMinutes(59);
    endOfDay.date.setUTCSeconds(59);
    endOfDay.date.setUTCMilliseconds(999);

    return endOfDay;
  }

  // Returns a UniversalDate corresponding to the first millisecond of the day
  getStartOfDay(): UniversalDate {
    const startOfDay = new UniversalDate(this.date);
    startOfDay.date.setUTCHours(0);
    startOfDay.date.setUTCMinutes(0);
    startOfDay.date.setUTCSeconds(0);
    startOfDay.date.setUTCMilliseconds(0);

    return startOfDay;
  }
}
