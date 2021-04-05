import * as PouchDB from "pouchdb";
import {App, reactive} from "vue";

import Project, {ProjectEvent} from "./project";

export default class Store {
  private database: PouchDB.Database;

  constructor(database: PouchDB.Database) {
    this.database = database;
  }

  public async getProject(id: string): Promise<Project> {
    const data = await this.database.get<Project>(id);
    const project = new Project(data);
    project.on("change", this.onProjectUpdate);
    return project;
  }

  private onProjectUpdate(data: ProjectEvent) {
    const {project, property, newValue, oldValue} = data;
    console.log(`Project ${project.id} updated '${property}' from ${oldValue} to ${newValue}`);
  }

  static install(app: App, options: { database: PouchDB.Database }) {
    const store = new Store(options.database);
    const instance = reactive(store) as Store;

    app.config.globalProperties.$store = instance;
  }
}
