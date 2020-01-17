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
}
