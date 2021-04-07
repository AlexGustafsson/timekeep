import PouchDB from "pouchdb";
import FindPlugin from "pouchdb-find";
PouchDB.plugin(FindPlugin);

import { App } from "vue";

// TODO: Use the changes API to make the database reactive?
// All instances have read observability, on write use database to save the instance
// which will update observed instances via change...
// https://pouchdb.com/api.html#changes

// Debug in dev mode
// PouchDB.debug.enable('*');

// Write a plugin for reactivity?
// https://pouchdb.com/api.html#plugins

// Base store data type
export type DocumentData = Record<string, unknown>;

// Base document type
export interface Document<T extends DocumentData> extends PouchDB.Core.IdMeta, PouchDB.Core.RevisionIdMeta {
  type: DocumentType,
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

export interface Interval extends DocumentData {
  projectId: string,
  start: number,
  end: number | null
}

export const STORE_CURRENT_VERSION = "2.0.0";

export enum DocumentType {
  Project = "project",
  Interval = "interval",
  Any = "any",
}

export default class Store {
  public readonly database: PouchDB.Database;

  constructor(database: PouchDB.Database) {
    this.database = database;
  }

  public async createIndex() {
    // NOTE: PouchDB does not support indexes where a document does not have
    // a certain field
    // See: https://stackoverflow.com/questions/47470345/couchdb-mango-queries-and-indexes

    // Create a generic index for all documents
    // await this.database.createIndex({
    //   index: {
    //     fields: ["type", "version"]
    //   }
    // });

    // // Create an index for projects
    // await this.database.createIndex({
    //   index: {
    //     fields: ["data.name", "data.group"]
    //   }
    // });

    // // Create an index for intervals
    // await this.database.createIndex({
    //   index: {
    //     fields: ["data.projectId", "data.start", "data.end"]
    //   }
    // });
  }

  public async query(request: PouchDB.Find.FindRequest<{}>, fetchDocuments = false): Promise<DocumentHit[]> { // eslint-disable-line @typescript-eslint/ban-types
    // Shallow copy
    const preparedRequest = Object.assign({}, request);

    // If the entire document is to be fetched, exclude the field filter completely
    // otherwise, always include the specified fields as they are used for various
    // calls and references
    delete preparedRequest.fields;
    if (!fetchDocuments) {
      const fields = [...(request.fields || []), "type", "version", "_id", "_rev"];
      preparedRequest.fields = [...new Set(fields)];
    }

    const results = await this.database.find(preparedRequest);
    return results.docs as DocumentHit[];
  }

  public async getAll<T extends DocumentData>(type = DocumentType.Any): Promise<Document<T>[]> {
    if (type === DocumentType.Any) {
      const response = await this.database.allDocs({include_docs: true});
      // TODO: Replace filter with a TypeScript type assertion?
      return response.rows.map(x => x.doc!).filter(x => x.hasOwnProperty("type") && x.hasOwnProperty("version") && x.hasOwnProperty("data")) as Document<T>[];
    } else {
      return await this.query({ selector: { type } }, true) as Document<T>[];
    }
  }

  public getAllProjects(): Promise<Document<Project>[]> {
    return this.getAll<Project>(DocumentType.Project);
  }

  public async get<T extends DocumentData>(id: string): Promise<Document<T>> {
    const document = await this.database.get<Document<T>>(id);
    return document;
  }

  public async create<T extends DocumentData>(data: T, type: DocumentType): Promise<Document<T>> {
    const entry = {data, type, version: STORE_CURRENT_VERSION};
    const response = await this.database.post(entry);
    return { ...entry, _rev: response.rev, _id: response.id};
  }

  public createProject(data: Project): Promise<Document<Project>> {
    return this.create<Project>(data, DocumentType.Project);
  }

  // Note: does not validate that projectId refers to valid project
  public async toggleInterval(projectId: string, timestamp = Date.now()) {
    const hits = await this.query({selector: {type: DocumentType.Interval, "data.projectId": projectId, "data.end": null}}, true);
    if (hits.length == 0) {
      const data = { projectId, start: timestamp, end: null };
      await this.create<Interval>(data, DocumentType.Interval);
    } else {
      const ongoingInterval = hits[0] as Document<Interval>;
      ongoingInterval.data.end = timestamp;
      await this.update<Interval>(ongoingInterval);
    }
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
