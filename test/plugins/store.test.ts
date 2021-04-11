import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
const {expect} = chai;

import Store, { Project, Document, Interval, STORE_CURRENT_VERSION, DocumentType, Tag, Note } from "../../src/plugins/store";

PouchDB.plugin(MemoryAdapter);

const testProjects: Document<Project>[] = [
  {
    type: DocumentType.Project,
    version: STORE_CURRENT_VERSION,
    _id: "test",
    _rev: "",
    data: {
      name: "Test Project",
      group: "Test Group",
      color: "green",
      tags: new Set<string>(),
      favorite: false,
    }
  },
  {
    type: DocumentType.Project,
    version: STORE_CURRENT_VERSION,
    _id: "test2",
    _rev: "",
    data: {
      name: "Test Project 2",
      group: "Group 2",
      color: "green",
      tags: new Set<string>(["tag2"]),
      favorite: true,
    }
  }
];

const testIntervals: Document<Interval>[] = [
  {
    type: DocumentType.Interval,
    version: STORE_CURRENT_VERSION,
    _id: "testInterval",
    _rev: "",
    data: {
      projectId: "test2",
      started: 1617727974310,
      ended: null,
    }
  }
];

const testTags: Document<Tag>[] = [
  {
    type: DocumentType.Tag,
    version: STORE_CURRENT_VERSION,
    _id: "tag2",
    _rev: "",
    data: {
      name: "Test Tag",
      color: "green",
      created: 1617727974310,
    }
  }
];

const testNotes: Document<Note>[] = [
 {
  type: DocumentType.Note,
  version: STORE_CURRENT_VERSION,
  _id: "note1",
  _rev: "",
  data: {
    text: "Test Note",
    created: 1617727974310,
    projectId: "test1",
  }
 }
];

async function getNewStore(documents: {projects?: Document<Project>[], intervals?: Document<Interval>[], tags?: Document<Tag>[], notes?: Document<Note>[]} = {}) {
  const database = new PouchDB(Math.random().toString(), { adapter: "memory" });
  if (documents.projects) {
    for (const document of documents.projects)
      await database.put<Document<Project>>(document);
  }

  if (documents.intervals) {
    for (const document of documents.intervals)
      await database.put<Document<Interval>>(document);
  }

  if (documents.tags) {
    for (const document of documents.tags)
      await database.put<Document<Tag>>(document);
  }

  if (documents.notes) {
    for (const document of documents.notes)
      await database.put<Document<Note>>(document);
  }

  const store = new Store(database);
  await store.createIndex();
  return store;
}

describe('store', () => {
  it('loads project', async () => {
    const store = await getNewStore({projects: testProjects});
    const project = await store.get<Project>("test");
    expect(project._id).equals("test");
    expect(project.data.name).equals("Test Project");
    expect(project.data.group).equals("Test Group");
  });

  it('fails to load non-existing project', async () => {
    const store = await getNewStore({projects: testProjects});
    await expect(store.get<Project>("this does not exist")).to.eventually.be.rejected;
  });

  it('pushes revision on save', async () => {
    const store = await getNewStore({projects: testProjects});
    const project = await store.get<Project>("test");
    expect(project.data.name).to.equal("Test Project");
    project.data.name = "Updated Test Project";
    await store.update<Project>(project);
    const storedProject = await store.database.get<Document<Project>>("test");
    expect(storedProject.data.name).to.equal(project.data.name);
    expect(project._rev).to.equal(storedProject._rev);
  });

  it('creates project', async () => {
    const store = await getNewStore();
    const project = await store.createProject({name: "Test", group: null, color: "green", favorite: false, tags: new Set<string>()});
    const documents = await store.database.allDocs({include_docs: true});
    // TODO: This is a race condition where the first row will sometimes be
    // the row for the index instead
    const storedProject = documents.rows[0].doc as Document<Project>;
    expect(storedProject._id).to.equal(project._id);
    expect(storedProject.data.name).to.equal(project.data.name);
  });

  it('queries project', async() => {
    const store = await getNewStore({projects: testProjects});
    const hits = await store.query({
      selector: {"data.group": {"$regex": "2"}},
      fields: ["data.name"]
    });
    expect(hits.length).to.equal(1);
    const project = hits[0].data as Project;
    expect(project.name).to.equal("Test Project 2");
  });

  it('queries project and fetches documents', async () => {
    const store = await getNewStore({projects: testProjects});
    const hits = await store.query({
      selector: { "data.group": { "$regex": "2" } },
      fields: ["data.name"]
    }, true);
    expect(hits.length).to.equal(1);
    const project = hits[0].data as Project;
    // Test a field that was not specified in the request
    expect(project.group).to.equal("Group 2");
  });

  it('fetches all documents', async () => {
    const store = await getNewStore({projects: testProjects, intervals: testIntervals});

    const documents = await store.getAll();
    expect(documents.length).to.equal(testProjects.length + testIntervals.length);
  });

  it('fetches all documents of a type', async () => {
    const store = await getNewStore({ projects: testProjects, intervals: testIntervals });

    const documents = await store.getAll<Project>(DocumentType.Project);
    expect(documents.length).to.equal(2, "unexpected stored number of projects");

    const intervals = await store.getAll<Interval>(DocumentType.Interval);
    expect(intervals.length).to.equal(1, "unexpected stored number of intervals");
  });

  it('always includes special fields in query', async () => {
    const store = await getNewStore({projects: testProjects});
    const hits = await store.query({selector: {_id: "test"}, fields: ["data.name"]});
    expect(hits.length).to.equal(1);
    const project = hits[0] as Document<Project>;
    // Test some of the implicitly required fields
    expect(project.type).to.equal(DocumentType.Project);
    expect(project._id).to.equal("test");
    expect(project.version).to.equal(STORE_CURRENT_VERSION);
    // Test the specified field
    expect(project.data.name).to.equal("Test Project");
  });

  it('creates an interval when first toggled', async() => {
    const store = await getNewStore();

    // Toggle a previously non-existing interval
    const start = Date.now();
    await store.toggleInterval("test", start);

    // Ensure it is created correctly
    const storedIntervals = await store.getAll<Interval>(DocumentType.Interval);
    expect(storedIntervals.length).to.equal(1);
    const storedInterval = storedIntervals[0];
    expect(storedInterval.type).to.equal(DocumentType.Interval);
    expect(storedInterval.data.started).to.equal(start);
  });

  it('finishes an interval when toggled', async() => {
    const store = await getNewStore({ intervals: testIntervals });

    // Toggle a previously existing interval
    const end = Date.now();
    await store.toggleInterval("test2", end);

    // Ensure it is set correctly
    const storedIntervals = await store.getAll<Interval>(DocumentType.Interval);
    expect(storedIntervals.length).to.equal(1);
    const storedInterval = storedIntervals[0];
    expect(storedInterval.type).to.equal(DocumentType.Interval);
    expect(storedInterval.data.started).to.equal(1617727974310);
    expect(storedInterval.data.ended).to.equal(end);
    expect(storedInterval.data.projectId).to.equal("test2");
  });

  it('creates a note', async () => {
    const store = await getNewStore();

    const note = await store.createNote({projectId: "test", text: "Test note", created: 0});

    const documents = await store.database.allDocs({ include_docs: true });
    const storedNote = documents.rows[0].doc as Document<Note>;
    expect(storedNote._id).to.equal(note._id);
    expect(storedNote.data.text).to.equal(note.data.text);
    expect(storedNote.data.projectId).to.equal(note.data.projectId);
  });

  it('creates a tag', async () => {
    const store = await getNewStore();

    const tag = await store.createTag({ color: "green", name: "Tag", created: 0 });

    const documents = await store.database.allDocs({ include_docs: true });
    const storedNote = documents.rows[0].doc as Document<Note>;
    expect(storedNote._id).to.equal(tag._id);
    expect(storedNote.data.text).to.equal(tag.data.text);
    expect(storedNote.data.projectId).to.equal(tag.data.projectId);
  });

  it('returns notes for project', async () => {
    const store = await getNewStore({notes: testNotes});
    const notes = await store.getNotes("test1");
    expect(notes.length).to.equal(1);
    expect(notes[0].data.text).to.equal("Test Note");
  });

  it('fetches batch of tags', async () => {
    const store = await getNewStore({projects: testProjects, tags: testTags});
    const tags = await store.getBulk<Tag>(["tag2", "thisTagDoesNoTexist"]);
    expect(tags.length).to.equal(2);
    expect(tags[0]?.data.name).to.equal("Test Tag");
    expect(tags[1]).to.be.null;
  });
});
