import PouchDB from "pouchdb";

import EventEmitter from "./event-emitter";

// An event raised on a property change
export type ProjectEvent = {
  property: string,
  newValue: any,
  oldValue: any,
  project: Project
}

// The data represented by the project
export type ProjectData = {
  name: string,
  group: string | null;
}

// The document as stored in the database
export type ProjectDocument = ProjectData & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export default class Project extends EventEmitter<ProjectEvent> {
  // The project's globally unique identifier
  public readonly id: string;
  // The raw document
  public readonly data: ProjectDocument;

  constructor(id: string, data: ProjectDocument) {
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
