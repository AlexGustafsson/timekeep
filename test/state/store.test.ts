import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";
import { expect } from "chai";

import Store from "../../src/state/store";
import {ProjectData} from "../../src/state/project";

PouchDB.plugin(MemoryAdapter);

describe('store', () => {
  it('loads project', async () => {
    const database = new PouchDB("timekeep", {adapter: "memory"});
    await database.put<ProjectData>({
      _id: "test",
      name: "Test Project",
      group: "Test Group"
    });

    const store = new Store(database);
    const project = await store.getProject("test");
    expect(project.id).equals("test");
    expect(project.name).equals("Test Project");
    expect(project.group).equals("Test Group");
  });
});
