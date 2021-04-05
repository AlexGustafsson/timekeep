/* globals localStorage Blob */
import type { App } from "vue";

import { reactive, watch } from "vue";
import PouchDB from "pouchdb";

// import type Timekeep from "./timekeep"

export default class Store {
  database: PouchDB.Database;
  // timekeeps: Timekeep[]
  timekeeps: number[];

  constructor() {
    this.database = new PouchDB("timekeep");
    this.timekeeps = [];
  }

  save() {
    // TODO
    console.log("save");
  }

  static install(app: App) {
    const store = new Store();
    const instance = reactive(store) as Store;

    // Watch for changes and save the database accordingly
    watch(
      () => instance.timekeeps,
      () => {
        instance.save();
      }
    );

    app.config.globalProperties.$store = instance;
  }
}
