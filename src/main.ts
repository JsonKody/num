import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.scss";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).mount("#app");

// Zamezeni priblizovani na iPadu pri mackani tlacitka
document.addEventListener("touchend", function (event: TouchEvent): void {
  if (event.target && (event.target as HTMLElement).tagName === "BUTTON") {
    if (event.cancelable) {
      event.preventDefault();
    }
  }
});
