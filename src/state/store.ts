import PouchDB from "pouchdb";
import FindPlugin from "pouchdb-find";
PouchDB.plugin(FindPlugin);

import { App } from "vue";

// Base store data type
export type DocumentData = Record<string, unknown>;

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

  public async query(request: PouchDB.Find.FindRequest<{}>, fetchDocuments = false): Promise<DocumentHit[]> { // eslint-disable-line @typescript-eslint/ban-types
    // Shallow copy
    const preparedRequest = Object.assign({}, request);

    // If the entire document is to be fetched, exclude the field filter completely
    delete preparedRequest.fields;
    if (!fetchDocuments)
      preparedRequest.fields = [...(request.fields || []), "type", "version", "_id", "_rev"]

    const results = await this.database.find(preparedRequest);
    return results.docs as DocumentHit[];
  }

  public async getAll<T extends DocumentData>(type: string): Promise<Document<T>[]> {
    return await this.query({ selector: { type } }, true) as Document<T>[];
  }

  public getAllProjects(): Promise<Document<Project>[]> {
    return this.getAll<Project>("project");
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

  public createProject(data: Project): Promise<Document<Project>> {
    return this.create<Project>(data, "project");
  }

  public async update<T extends DocumentData>(document: Document<T>): Promise<void> {
    const response = await this.database.put<Document<T>>(document);
    document._rev = response.rev;
  }
}

export function createStore(database: PouchDB.Database): (app: App) => void {
  const store = new Store(database);
  store.createIndex();
  return app => {
    app.config.globalProperties.$store = store;
  };
}
