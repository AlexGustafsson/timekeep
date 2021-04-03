export default class TimekeepGroup {
  public name: string;
  public id: string;
  public timekeeps: any[];

  constructor(name: string) {
    // The group's name
    this.name = name;
    // A pseudo-random ID likely containing enough entropy to be globally unique
    this.id = String(Math.random() * 1e17);
    this.timekeeps = [];
  }

  static parse(state, timekeeps) {
    const group = new TimekeepGroup(state.name);
    group.id = state.id;
    group.timekeeps = timekeeps.filter((x) => state.timekeeps.includes(x.id));

    return group;
  }

  static serialize(group) {
    return {
      name: group.name,
      id: group.id,
      timekeeps: group.timekeeps.map((x) => x.id),
    };
  }

  includes(timekeep): boolean {
    return this.timekeeps.findIndex((x) => x.id === timekeep.id) !== -1;
  }

  remove(timekeep) {
    if (this.includes(timekeep))
      this.timekeeps.splice(
        this.timekeeps.findIndex((x) => x.id === timekeep.id),
        1
      );
  }

  add(timekeep) {
    if (!this.includes(timekeep)) this.timekeeps.push(timekeep);
  }
}
