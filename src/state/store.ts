import PouchDB from "pouchdb";
import {App, reactive} from "vue";

import Project, { ProjectEvent, ProjectData } from "./project";

export default class Store {
  public readonly database: PouchDB.Database;

  private projectUpdates: ProjectEvent[];
  private isSyncing: boolean;

  constructor(database: PouchDB.Database) {
    this.database = database;

    this.projectUpdates = [];
    this.isSyncing = false;
  }

  public async getProject(id: string): Promise<Project> {
    const data = await this.database.get<Project>(id);
    const project = new Project(data);
    project.on("change", this.onProjectUpdate);
    return project;
  }

  public async createProject(data: ProjectData): Promise<Project> {
    const response = await this.database.post<ProjectData>(data);
    return new Project({...data, _rev: response.rev, _id: response.id});
  }

  public async sync(): Promise<void> {
    if (this.isSyncing)
      return await this.waitForSync();


  }

  public async waitForSync(): Promise<void> {

  }

  private async onProjectUpdate(data: ProjectEvent) {
    const {project, oldValue, newValue, property} = data;
    console.log(`Project ${project.id} updated '${property}' from ${oldValue} to ${newValue}`);
  }

  static install(app: App, options: { database: PouchDB.Database }) {
    const store = new Store(options.database);
    const instance = reactive(store) as Store;

    app.config.globalProperties.$store = instance;
  }
}
