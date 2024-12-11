import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from './vueBootstrap.js';

const app = createApp(App);

initializeApp(app);

app.mount('#dashboardsearchbar');
