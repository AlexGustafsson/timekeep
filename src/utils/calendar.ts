import UniversalDate from "./universal-date";

interface Month {
  year: number;
  month: number;
  startWeek: number;
  endWeek: number;
  firstWeekOffset: number;
  days: number
}

interface Year {
  year: number;
  months: Month[];
}

export default class Calendar {
  static daysOfMonth(year: number, month: number): number {
    const date = UniversalDate.fromUTC({year, month: month + 1});
    // The dates are basically 1-indexed, meaing 0 will be -1 - the last day
    // of the previous month. We therefore offset the input month by one
    // to get the requested month's end day
    date.date.setDate(0);
    return date.day;
  }

  static getMonth(year: number, month: number): Month {
    const startOfTheMonth = UniversalDate.fromUTC({ year, month });
    const endOfTheMonth = UniversalDate.fromUTC({ year, month, date: Calendar.daysOfMonth(year, month) });
    const firstWeekOffset = startOfTheMonth.dayOfWeek;
    const startWeek = startOfTheMonth.week;
    const endWeek = endOfTheMonth.week;
    const days = endOfTheMonth.day;

    return {year, month, startWeek, endWeek, firstWeekOffset, days};
  }

  static getYear(year: number): Year {
    return {
      year,
      months: new Array(12).fill(null).map((_, i) => this.getMonth(year, i))
    };
  }
}
