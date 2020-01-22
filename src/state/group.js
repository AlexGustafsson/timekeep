export default class TimekeepGroup {
  constructor(name) {
    this.name = name;
    this.timekeeps = [];
  }

  static parse(state, timekeeps) {
    const group = new TimekeepGroup();

    group.name = state.name;
    group.timekeeps = timekeeps.filter(x => state.timekeeps.includes(x.id));

    return group;
  }

  static serialize(group) {
    return {
      name: group.name,
      timekeeps: group.timekeeps.map(x => x.id)
    };
  }

  includes(timekeep) {
    return this.timekeeps.findIndex(x => x.id === timekeep.id) !== -1;
  }

  remove(timekeep) {
    if (this.includes(timekeep))
      this.timekeeps.splice(this.timekeeps.findIndex(x => x.id === timekeep.id), 1);
  }

  add(timekeep) {
    if (!this.includes(timekeep))
      this.timekeeps.push(timekeep);
  }
}
