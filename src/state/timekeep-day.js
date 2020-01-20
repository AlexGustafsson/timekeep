import {UniversalDate} from '../utils';

export default class TimekeepDay {
  constructor(date = new UniversalDate()) {
    // The UTC date of the day, the time is undefined
    this.date = date;
    // Array of UTC timestamps where the tracking either started or ended
    this.checkpoints = [];
    // An offset in milliseconds which is added to the total time of the day
    // Useful for adjusting the time tracked by checkpoints
    this.offset = 0;
  }

  static parse(state) {
    const day = new TimekeepDay();

    day.date = new UniversalDate(state.date);
    day.checkpoints = state.checkpoints.map(x => new UniversalDate(x));
    day.offset = state.offset;

    day.patch();

    return day;
  }

  static serialize(day) {
    return {
      date: day.date.timestamp,
      checkpoints: day.checkpoints.map(x => x.timestamp),
      offset: day.offset
    };
  }

  // Patch the day by ensuring that if the day has past,
  // it is no longer counting (that is, stop counting by midnight automatically)
  patch(today = new UniversalDate()) {
    // If it's the same day, it doesn't matter whether or not it's counting
    if (this.date.isSameDay(today))
      return;

    // If the day is still counting, stop counting at the end of the day
    if (this.checkpoints.length % 2 === 1)
      this.checkpoints.push(this.date.getEndOfDay());
  }

  get isCounting() {
    // If there is an uneven amount of checkpoints, the last is still active
    return this.checkpoints.length % 2 === 1;
  }

  addCheckpoint(universalDate = new UniversalDate()) {
    this.checkpoints.push(universalDate);
  }

  getTime() {
    const checkpoints = [...this.checkpoints, new UniversalDate()];

    let sum = 0;
    for (let i = 0; i < Math.floor(checkpoints.length / 2); i++) {
      const a = checkpoints[i * 2];
      const b = checkpoints[(i * 2) + 1];

      sum += b.timestamp - a.timestamp;
    }

    return sum + this.offset;
  }
}
