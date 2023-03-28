import App from "@/App.vue";

import "@unocss/reset/antfu.css";
import "@/assets/main.css";
import "uno.css";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
