import { createApp } from "vue";
import { createPinia } from "pinia";
import "./App.scss";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
