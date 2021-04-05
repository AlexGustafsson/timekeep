import PouchDB from "pouchdb";
import { createApp } from "vue";

// Import global style (contains reset-css which needs to be loaded first)
import "./style/main.css";

import App from "./app.vue";

import { createStore } from "./state/store";
import router from "./router";

const database = new PouchDB("timekeep");
const store = createStore(database);

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
