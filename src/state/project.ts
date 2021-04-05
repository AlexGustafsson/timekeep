import EventEmitter from "./event-emitter";

export type ProjectEvent = {
  property: string,
  newValue: any,
  oldValue: any,
  project: Project
}

export type ProjectData = {
  name: string,
  group: string | null;
}

export default class Project extends EventEmitter<ProjectEvent> {
  // The project's globally unique identifier
  public readonly id: string;
  private data: ProjectData;

  constructor(id: string, data: ProjectData) {
    super();
    this.id = id;
    this.data = data;
  }

  get name(): string {
    return this.data.name;
  }

  set name(value: string) {
    const oldValue = this.data.name;
    this.data.name = value;
    this.emit("change", {property: "name", newValue: value, oldValue, project: this});
  }

  get group(): string | null {
    return this.data.group;
  }

  set group(value: string | null) {
    const oldValue = this.data.group;
    this.data.group = value;
    this.emit("change", {property: "group", newValue: value, oldValue, project: this});
  }
}
