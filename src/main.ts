import {createApp} from 'vue';

// Import global style (contains reset-css which needs to be loaded first)
import './style/main.css';

// import { App, ModalPlugin } from './components';
import { App } from './components';

import { Store } from './state';
import router from './router';

// Vue.use(Store);
// Vue.use(ModalPlugin);

const app = createApp(App);
app.use(Store);
app.mount("#app");
