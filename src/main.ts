import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import { pop } from "toolpop";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);
app.directive("pop", pop);

app.use(pinia).mount("#app");

/**
 * Icons:
 * https://tabler-icons.io/
 */
