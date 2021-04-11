import PouchDB from "pouchdb";
import FindPlugin from "pouchdb-find";
PouchDB.plugin(FindPlugin);

import type { App } from "vue";

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
  type: DocumentType;
  version: string;
  data: T;
}

export interface DocumentHit extends PouchDB.Core.IdMeta, PouchDB.Core.RevisionIdMeta {
  type: string;
  version: string;
  data?: DocumentData;
}

// The data stored by a project
export interface Project extends DocumentData {
  name: string;
  group: string | null;
  favorite: boolean;
  color: string;
  tags: Set<string>;
}

export interface Interval extends DocumentData {
  projectId: string;
  started: number;
  ended: number | null;
}

export interface Note extends DocumentData {
  projectId: string;
  created: number;
  text: string;
}

export interface Tag extends DocumentData {
  name: string;
  color: string;
  created: number;
}

export const STORE_CURRENT_VERSION = "2.0.0";

export enum DocumentType {
  Project = "project",
  Interval = "interval",
  Tag = "tag",
  Note = "note",
  Any = "any",
}

export default class Store {
  public readonly database: PouchDB.Database;

  constructor(database: PouchDB.Database) {
    this.database = database;
  }

  public async createIndex(): Promise<void> {
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async query(request: PouchDB.Find.FindRequest<{}>, fetchDocuments = false): Promise<DocumentHit[]> {
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
      const response = await this.database.allDocs({ include_docs: true });
      // TODO: Replace filter with a TypeScript type assertion?
      const isDocument = (potentialDocument: PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>) => {
        const requiredFields = ["type", "version", "data"];
        const existingFields = requiredFields.filter((x) => Object.prototype.hasOwnProperty.call(potentialDocument, x));
        return existingFields.length === requiredFields.length;
      };

      return response.rows
        .filter((x) => x.doc)
        .map((x) => x.doc as PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>)
        .filter(isDocument) as Document<T>[];
    } else {
      return (await this.query({ selector: { type } }, true)) as Document<T>[];
    }
  }

  public getAllProjects(): Promise<Document<Project>[]> {
    return this.getAll<Project>(DocumentType.Project);
  }

  public async get<T extends DocumentData>(id: string): Promise<Document<T>> {
    const document = await this.database.get<Document<T>>(id);
    return document;
  }

  public async getBulk<T extends DocumentData>(ids: string[]): Promise<(Document<T> | null)[]> {
    const documents = await this.database.allDocs({keys: ids, include_docs: true});
    return documents.rows.map((x) => x.doc ? x.doc : null) as Document<T>[];
  }

  public async create<T extends DocumentData>(data: T, type: DocumentType): Promise<Document<T>> {
    const entry = { data, type, version: STORE_CURRENT_VERSION };
    const response = await this.database.post(entry);
    return { ...entry, _rev: response.rev, _id: response.id };
  }

  public createProject(data: Project): Promise<Document<Project>> {
    return this.create<Project>(data, DocumentType.Project);
  }

  // Note: does not validate that projectId refers to valid project
  public async toggleInterval(projectId: string, timestamp = Date.now()): Promise<void> {
    const hits = await this.query({ selector: { type: DocumentType.Interval, "data.projectId": projectId, "data.ended": null } }, true);
    if (hits.length == 0) {
      const data = { projectId, started: timestamp, ended: null };
      await this.create<Interval>(data, DocumentType.Interval);
    } else {
      const ongoingInterval = hits[0] as Document<Interval>;
      ongoingInterval.data.ended = timestamp;
      await this.update<Interval>(ongoingInterval);
    }
  }

  public createNote(data: Note): Promise<Document<Note>> {
    return this.create<Note>(data, DocumentType.Note);
  }

  public createTag(data: Tag): Promise<Document<Tag>> {
    return this.create<Tag>(data, DocumentType.Tag);
  }

  public async getNotes(projectId: string): Promise<Document<Note>[]> {
    return await this.query({ selector: { type: DocumentType.Note, "data.projectId": projectId } }, true) as Document<Note>[];
  }

  public async update<T extends DocumentData>(document: Document<T>): Promise<void> {
    const response = await this.database.put<Document<T>>(document);
    document._rev = response.rev;
  }
}

export function createStore(database: PouchDB.Database): (app: App) => void {
  const store = new Store(database);
  store.createIndex();
  return (app) => {
    app.config.globalProperties.$store = store;
  };
}
