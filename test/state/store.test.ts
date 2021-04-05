import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
const {expect} = chai;

import Store, { Project, Document, STORE_CURRENT_VERSION } from "../../src/state/store";

PouchDB.plugin(MemoryAdapter);

const testDocuments: Document<Project>[] = [
  {
    type: "project",
    version: STORE_CURRENT_VERSION,
    _id: "test",
    _rev: "",
    data: {
      name: "Test Project",
      group: "Test Group"
    }
  },
  {
    type: "project",
    version: STORE_CURRENT_VERSION,
    _id: "test2",
    _rev: "",
    data: {
      name: "Test Project 2",
      group: "Group 2"
    }
  }
];

async function getNewStore(documents: Document<Project>[]) {
  const database = new PouchDB(Math.random().toString(), { adapter: "memory" });
  for (const document of documents)
    await database.put<Document<Project>>(document);
  const store = new Store(database);
  await store.createIndex();
  return store;
}

describe('store', () => {
  it('loads project', async () => {
    const store = await getNewStore(testDocuments);
    const project = await store.get<Project>("test");
    expect(project._id).equals("test");
    expect(project.data.name).equals("Test Project");
    expect(project.data.group).equals("Test Group");
  });

  it('fails to load non-existing project', async () => {
    const store = await getNewStore(testDocuments);
    await expect(store.get<Project>("this does not exist")).to.eventually.be.rejected;
  });

  it('pushes revision on save', async () => {
    const store = await getNewStore(testDocuments);
    const project = await store.get<Project>("test");
    expect(project.data.name).to.equal("Test Project");
    project.data.name = "Updated Test Project";
    await store.update<Project>(project);
    const storedProject = await store.database.get<Document<Project>>("test");
    expect(storedProject.data.name).to.equal(project.data.name);
    expect(project._rev).to.equal(storedProject._rev);
  });

  it('creates project', async () => {
    const store = await getNewStore([]);
    const project = await store.createProject({name: "Test", group: null});
    const documents = await store.database.allDocs({include_docs: true});
    const storedProject = documents.rows[0].doc as Document<Project>;
    expect(storedProject._id).to.equal(project._id);
    expect(storedProject.data.name).to.equal(project.data.name);
  });

  it('queries project', async() => {
    const store = await getNewStore(testDocuments);
    const hits = await store.query({
      selector: {"data.group": {"$regex": "2"}},
      fields: ["data.name"]
    });
    expect(hits.length).to.equal(1);
    const project = hits[0].data as Project;
    expect(project.name).to.equal("Test Project 2");
  })

  it('queries project and fetches documents', async () => {
    const store = await getNewStore(testDocuments);
    const hits = await store.query({
      selector: { "data.group": { "$regex": "2" } },
      fields: ["data.name"]
    }, true);
    expect(hits.length).to.equal(1);
    const project = hits[0].data as Project;
    // Test a field that was not specified in the request
    expect(project.group).to.equal("Group 2");
  })

  it('fetches all documents of a type', async () => {
    const store = await getNewStore(testDocuments);
    const documents = await store.getAll("project");
    expect(documents.length).to.equal(2);
  });
});
