import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
const {expect} = chai;

import Store from "../../src/state/store";
import {ProjectData, ProjectDocument} from "../../src/state/project";

PouchDB.plugin(MemoryAdapter);

const testDocuments: ProjectDocument[] = [
  {
    _id: "test",
    _rev: "",
    name: "Test Project",
    group: "Test Group"
  }
];

async function getNewStore(documents: ProjectDocument[]) {
  const database = new PouchDB(Math.random().toString(), { adapter: "memory" });
  for (const document of documents)
    await database.put<ProjectData>(document);
  return new Store(database);
}

describe('store', () => {
  it('loads project', async () => {
    const store = await getNewStore(testDocuments);
    const project = await store.getProject("test");
    expect(project.id).equals("test");
    expect(project.name).equals("Test Project");
    expect(project.group).equals("Test Group");
  });

  it('fails to load non-existing project', async () => {
    const store = await getNewStore(testDocuments);
    await expect(store.getProject("this does not exist")).to.eventually.be.rejected;
  });

  it('pushes revision on change', async () => {
    const store = await getNewStore(testDocuments);
    const project = await store.getProject("test");
    expect(project.name).equals("Test Project");
    project.name = "Test Project 2";
    store.sync();
    await store.waitForSync();
  });

  it('creates project', async () => {
    const store = await getNewStore([]);
    const project = await store.createProject({name: "Test", group: null});
    const documents = await store.database.allDocs({include_docs: true});
    expect(documents.total_rows).to.equal(1);
    const storedProject = documents.rows[0].doc as ProjectDocument;
    expect(storedProject._id).to.equal(project.id);
    expect(storedProject.name).to.equal(project.name);
  });
});
