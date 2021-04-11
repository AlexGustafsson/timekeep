export type UTCValues = {
  year?: number;
  // 1-based month 1-12
  month?: number;
  // 1-based day 1-31
  dayOfTheMonth?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

// A wrapper around Date to provide simple-to-use, all-UTC methods
export default class UniversalDate {
  public date: Date;

  constructor(timestamp?: number) {
    this.date = new Date(timestamp ?? Date.now());
  }

  // Create a date from UTC values
  static fromUTC(values: UTCValues): UniversalDate {
    return new UniversalDate(
      Date.UTC(
        values.year ?? 0,
        (values.month ?? 1) - 1,
        values.dayOfTheMonth ?? 1,
        values.hours ?? 0,
        values.minutes ?? 0,
        values.seconds ?? 0,
        values.milliseconds ?? 0
      )
    );
  }

  // Create a date from a specific week of the year
  static fromWeek(year: number, week: number, dayOfTheWeek = 0): UniversalDate {
    // Start at the first week of the year
    let targetWeek = UniversalDate.fromUTC({ year });

    // Add a day at a time to safely handle leap years, week 52/53 - 1 etc.
    while (targetWeek.week != week && targetWeek.year === year) {
      targetWeek = new UniversalDate(targetWeek.timestamp + 1000 * 60 * 60 * 24);
    }
    if (targetWeek.week !== week) throw Error(`Year ${year} has no week ${week}`);

    // Rewind to the first day of the week
    for (let i = targetWeek.dayOfTheWeek; i > 0; i--) targetWeek = new UniversalDate(targetWeek.timestamp - 1000 * 60 * 60 * 24);

    // Move to the target day of the week
    for (let i = targetWeek.dayOfTheWeek; i < dayOfTheWeek; i++) targetWeek = new UniversalDate(targetWeek.timestamp + 1000 * 60 * 60 * 24);

    return targetWeek;
  }

  // Wrap a regular date
  static fromDate(date: Date): UniversalDate {
    return new UniversalDate(date.getTime());
  }

  // The number of days of a month. Month is 1-based
  static daysOfMonth(year: number, month: number): number {
    const date = UniversalDate.fromUTC({ year, month: month + 1 });
    // The dates are basically 1-indexed, meaing 0 will be -1 - the last day
    // of the previous month. We therefore offset the input month by one
    // to get the requested month's end day
    date.date.setDate(0);
    return date.dayOfTheMonth;
  }

  // The year represented by the date
  get year(): number {
    return this.date.getUTCFullYear();
  }

  // The one-based month of the year
  get month(): number {
    return this.date.getUTCMonth() + 1;
  }

  // The ISO 8601 week number
  get week(): number {
    const nearestThursday = new Date(Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()));
    nearestThursday.setUTCDate(nearestThursday.getUTCDate() + 4 - (nearestThursday.getUTCDay() || 7));

    const firstDayOfYear = new Date(Date.UTC(nearestThursday.getUTCFullYear(), 0, 1));

    // The number of full weeks to today's date
    const week = Math.ceil(((nearestThursday.getTime() - firstDayOfYear.getTime()) / 86400000 + 1) / 7);

    return week;
  }

  // The one-based day of the month
  get dayOfTheMonth(): number {
    return this.date.getUTCDate();
  }

  // The zero-based day of week where weeks start on a Monday
  get dayOfTheWeek(): number {
    return (this.date.getUTCDay() + 6) % 7;
  }

  static get dayNames(): string[] {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }

  // The name of the day of the week
  get dayOfTheWeekString(): string {
    return UniversalDate.dayNames[this.dayOfTheWeek - 1];
  }

  static get monthNames(): string[] {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  // The name of the month
  get monthString(): string {
    return UniversalDate.monthNames[this.month - 1];
  }

  // The UTC timestamp (milliseconds since start of epoch)
  get timestamp(): number {
    return this.date.getTime();
  }

  // Compare the year of two dates
  isSameYear(date: UniversalDate): boolean {
    return date.year === this.year;
  }

  // Compare the week (and implicitly year) of two dates
  isSameWeek(date: UniversalDate): boolean {
    return date.year === this.year && date.week === this.week;
  }

  // Compare the days (and implicitly week and year) of two dates
  isSameDay(date: UniversalDate): boolean {
    return date.year === this.year && date.month === this.month && date.dayOfTheMonth === this.dayOfTheMonth;
  }

  // Whether or not the date represents today's date
  isToday(): boolean {
    return this.isSameDay(new UniversalDate());
  }

  // Returns a UniversalDate corresponding to the last millisecond of the day
  getEndOfDay(): UniversalDate {
    const endOfDay = UniversalDate.fromDate(this.date);
    endOfDay.date.setUTCHours(23);
    endOfDay.date.setUTCMinutes(59);
    endOfDay.date.setUTCSeconds(59);
    endOfDay.date.setUTCMilliseconds(999);

    return endOfDay;
  }

  // Returns a UniversalDate corresponding to the first millisecond of the day
  getStartOfDay(): UniversalDate {
    const startOfDay = UniversalDate.fromDate(this.date);
    startOfDay.date.setUTCHours(0);
    startOfDay.date.setUTCMinutes(0);
    startOfDay.date.setUTCSeconds(0);
    startOfDay.date.setUTCMilliseconds(0);

    return startOfDay;
  }

  // Offset the date with some number of days
  offsetDays(days: number): UniversalDate {
    const timeOffset = days * 24 * 60 * 60 * 1000;
    return new UniversalDate(this.timestamp + timeOffset);
  }

  // Offset the date with some number of weeks
  offsetWeeks(weeks: number): UniversalDate {
    return this.offsetDays(7 * weeks);
  }
}
