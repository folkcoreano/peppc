import App from "@/App.vue";
import {inject} from "@vercel/analytics";

import "@unocss/reset/antfu.css";
import "@/assets/main.css";
import "uno.css";

const app = createApp(App);

app.use(createPinia());

inject();

app.mount("#app");
