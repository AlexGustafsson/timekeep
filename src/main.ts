import { createApp } from "vue";

// Import global style (contains reset-css which needs to be loaded first)
import "./style/main.css";

import App from "./app.vue";

// import { Store } from "./state";
import router from "./router";

const app = createApp(App);
// app.use(Store);
app.use(router);
app.mount("#app");
