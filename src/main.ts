import {createApp} from "vue";
import {createPinia} from "pinia";
import {inject} from "@vercel/analytics";

import App from "@/App.vue";
import "virtual:windi.css";

const app = createApp(App);

app.use(createPinia());

inject();

app.mount("#app");
