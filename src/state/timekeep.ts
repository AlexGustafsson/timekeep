import { UniversalDate, unique } from "../utils";
import TimekeepDay from "./timekeep-day";

export default class Timekeep {
  // The project"s name
  public name: string;
  // The days tracked by the object
  public days: TimekeepDay[];
  public id: string;
  // Whether or not the timekeep should be shown on the homepage
  public isFavorite: boolean;

  constructor(name: string) {
    this.name = name;
    this.days = [];
    // A pseudo-random ID likely containing enough entropy to be globally unique
    this.id = String(Math.random() * 1e17);
    this.isFavorite = true;
  }

  // static parse(state) {
  //   const timekeep = new Timekeep(state.name);

  //   timekeep.days = state.days.map(TimekeepDay.parse);
  //   timekeep.id = state.id;
  //   timekeep.isFavorite = state.isFavorite;

  //   return timekeep;
  // }

  // static serialize(timekeep) {
  //   return {
  //     name: timekeep.name,
  //     days: timekeep.days.map(TimekeepDay.serialize),
  //     id: timekeep.id,
  //     favorite: timekeep.favorite
  //   };
  // }

  // Get the timekeep day of today if it exists, null otherwise
  getToday(): TimekeepDay | null {
    const today = new UniversalDate();
    const day = this.days.find((x) => x.date.isSameDay(today));

    return day || null;
  }

  get isCounting(): boolean {
    const today = this.getToday();
    if (today === null) return false;

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

  getDay(year: number, week: number, dayOfWeek: number): TimekeepDay | null {
    const day = this.days.find((x) => x.date.year === year && x.date.dayOfWeek === dayOfWeek && x.date.week === week);
    return day || null;
  }

  // Get days for either the year and week or just the year
  getDays(year: number): TimekeepDay[];
  getDays(year: number, week: number): TimekeepDay[];
  getDays(year: number, week?: number): TimekeepDay[] {
    if (typeof week !== "undefined") return this.days.filter((x) => x.date.year === year && x.date.week === week);

    return this.days.filter((x) => x.date.year === year);
  }

  // Get the total time of a given day or days
  getTime(year: number, week: number): number;
  getTime(year: number, week: number, dayOfWeek: number): number;
  getTime(year: number, week: number, dayOfWeek?: number) {
    if (typeof dayOfWeek !== "undefined") {
      const day = this.getDay(year, week, dayOfWeek);
      if (!day) return 0;
      return day.getTime();
    }

    const days = this.getDays(year, week);
    const sum = days.reduce((sum, x) => sum + x.getTime(), 0);
    return sum;
  }

  // Get an array of years tracked by this timekeep
  getTrackedYears(): number[] {
    const years = this.days.reduce((years, day) => [...years, day.date.year], []);
    return unique(years);
  }

  // Get an array of weeks tracked by this timekeep during the given year
  getTrackedWeeks(year: number): number[] {
    const days = this.getDays(year);
    const weeks = days.reduce((weeks, day) => [...weeks, day.date.week], []);
    return unique(weeks);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
