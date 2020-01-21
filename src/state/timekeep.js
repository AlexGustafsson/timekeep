import {UniversalDate, unique} from '../utils';
import TimekeepDay from './timekeep-day';

export default class Timekeep {
  constructor(name) {
    // The project's name
    this.name = name;
    // The days tracked by the object
    this.days = [];
    // A pseudo-random ID likely containing enough entropy to be globally unique
    this.id = Math.random() * 1E17;
    // Whether or not the timekeep should be shown on the homepage
    this.favorite = true;
  }

  static parse(state) {
    const timekeep = new Timekeep();

    timekeep.name = state.name;
    timekeep.days = state.days.map(TimekeepDay.parse);
    timekeep.id = state.id;
    timekeep.favorite = state.favorite;

    return timekeep;
  }

  static serialize(timekeep) {
    return {
      name: timekeep.name,
      days: timekeep.days.map(TimekeepDay.serialize),
      id: timekeep.id,
      favorite: timekeep.favorite
    };
  }

  // Get the timekeep day of today if it exists, null otherwise
  getToday() {
    const today = new UniversalDate();
    const days = this.days.find(x => x.date.isSameDay(today));

    return days || null;
  }

  get isCounting() {
    const today = this.getToday();
    if (today === null)
      return false;

    return today.isCounting;
  }

  // Add a checkpoint for timetracking for the current day
  addCheckpoint() {
    let today = this.getToday();
    if (today === null) {
      today = new TimekeepDay();
      this.days.push(today);
    }

    today.addCheckpoint();
  }

  getDay(year, week, dayOfWeek) {
    const day = this.days.find(x => x.date.year === year && x.date.dayOfWeek === dayOfWeek && x.date.week === week);
    return day || null;
  }

  // Get days for either the year and week or just the year
  getDays(year, week) {
    if (year && week)
      return this.days.filter(x => x.date.year === year && x.date.week === week);

    if (year)
      return this.days.filter(x => x.date.year === year);

    return [];
  }

  // Get the total time of a given day or days
  // Either supply all three, just year and week or just year
  getTime(year, week, dayOfWeek) {
    if (year && week && dayOfWeek) {
      const day = this.getDay(year, week, dayOfWeek);
      if (!day)
        return 0;
      return day.getTime();
    }

    const days = this.getDays(year, week);
    const sum = days.reduce((sum, x) => sum + x.getTime(), 0);
    return sum;
  }

  // Get an array of years tracked by this timekeep
  getTrackedYears() {
    const years = this.days.reduce((years, day) => [...years, day.date.year], []);
    return unique(years);
  }

  // Get an array of weeks tracked by this timekeep during the given year
  getTrackedWeeks(year) {
    const days = this.getDays(year);
    const weeks = days.reduce((weeks, day) => [...weeks, day.date.week], []);
    return unique(weeks);
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}
