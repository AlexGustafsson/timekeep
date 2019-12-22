import {getDay, getWeek, getYear} from './utils';

export default class Timekeeping {
  constructor(state) {
    this.name = state.name;
    this.years = state.years || {};
    this.id = state.id || Math.random() * 1E17;
    this.favorite = state.favorite || true;
  }

  get counting() {
    const year = getYear();
    const week = getWeek();
    const day = getDay();
    this.assertDay(year, week, day);

    return this.years[year][week][day].length % 2 !== 0;
  }

  assertYear(year) {
    this.years[year] = this.years[year] || {};
  }

  assertWeek(year, week) {
    this.assertYear(year);
    this.years[year][week] = this.years[year][week] || {};
  }

  assertDay(year, week, day) {
    this.assertWeek(year, week);
    this.years[year][week][day] = this.years[year][week][day] || [];
  }

  startCounting() {
    const year = getYear();
    const week = getWeek();
    const day = getDay();
    this.assertDay(year, week, day);

    this.years[year][week][day].push(new Date())
  }

  stopCounting() {
    const year = getYear();
    const week = getWeek();
    const day = getDay();
    this.assertDay(year, week, day);

    this.years[year][week][day].push(new Date())
  }

  toggleCounting() {
    const year = getYear();
    const week = getWeek();
    const day = getDay();
    this.assertDay(year, week, day);

    if (this.years[year][week][day].length % 2 === 0)
      this.startCounting();
    else
      this.stopCounting();
  }

  getTime(year, week, day) {
    this.assertDay(year, week, day);

    const checkpoints = [...this.years[year][week][day], new Date()];

    let sum = 0;
    for (let i = 0; i < Math.floor(checkpoints.length / 2); i ++) {
      const a = checkpoints[i * 2];
      const b = checkpoints[i * 2 + 1];

      sum += b - a;
    }

    return sum;
  }

  getTotalTime(year, week) {
    this.assertDay(year, week);

    const days = this.years[year][week];
    let sum = 0;

    for (const day of Object.keys(days)) {
      sum += this.getTime(year, week, day);
    }

    return sum;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}
