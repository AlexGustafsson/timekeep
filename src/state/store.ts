import PouchDB from "pouchdb";
import FindPlugin from "pouchdb-find";
PouchDB.plugin(FindPlugin);

import { App } from "vue";

// Base store data type
export interface DocumentData {}

// Base document type
export interface Document<T extends DocumentData> extends PouchDB.Core.IdMeta, PouchDB.Core.RevisionIdMeta {
  type: string,
  version: string,
  data: T
}

export interface DocumentHit extends PouchDB.Core.IdMeta, PouchDB.Core.RevisionIdMeta {
  type: string,
  version: string,
  data?: DocumentData
}

// The data stored by a project
export interface Project extends DocumentData {
  name: string,
  group: string | null;
}

export const STORE_CURRENT_VERSION = "2.0.0";

export default class Store {
  public readonly database: PouchDB.Database;

  constructor(database: PouchDB.Database) {
    this.database = database;
  }

  public async createIndex() {
    await this.database.createIndex({
      index: {
        fields: ["type", "version", "data.name", "data.group"]
      }
    });
  }

  public async query(request: PouchDB.Find.FindRequest<{}>): Promise<DocumentHit[]> {
    const results = await this.database.find({ ...request, fields: [...(request.fields || []), "type", "version", "_id", "_rev"]});
    return results.docs as DocumentHit[];
  }

  public async get<T extends DocumentData>(id: string): Promise<Document<T>> {
    const document = await this.database.get<Document<T>>(id);
    return document;
  }

  public async create<T extends DocumentData>(data: T, type: string): Promise<Document<T>> {
    const entry = {data, type, version: STORE_CURRENT_VERSION};
    const response = await this.database.post(entry);
    return { ...entry, _rev: response.rev, _id: response.id};
  }

  public async createProject(data: Project): Promise<Document<Project>> {
    return this.create<Project>(data, "project");
  }

  public async update<T extends DocumentData>(document: Document<T>): Promise<void> {
    const response = await this.database.put<Document<T>>(document);
    document._rev = response.rev;
  }

  static install(app: App, options: { database: PouchDB.Database }) {
    const store = new Store(options.database);
    app.config.globalProperties.$store = store;
  }
}
