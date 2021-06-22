import PouchDB from "pouchdb";
import { createApp } from "vue";

// Import global style
import "./main.css";

import App from "./app.vue";

import { createStore } from "./plugins/store";
import { createTooltip } from "./plugins/tooltip";
import router from "./router";

const database = new PouchDB("timekeep");
const store = createStore(database);
const tooltip = createTooltip();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(tooltip);
app.mount("#app");
