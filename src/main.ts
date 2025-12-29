import { createApp } from "vue";
import App from "./App.vue";

//quasar
import { Quasar, Dialog, Notify, Loading } from "quasar";
import "quasar/src/css/index.sass";

//router
import router from "./router";

//global
import globals from "./helpers/helpers/functions";

//pinia
import { createPinia } from "pinia";


createApp(App)
  .use(Quasar, {
    plugins: {
      Dialog,
      Notify,
      Loading,
    },
    config: {
      extras: ['material-icons'],
      brand: {},
    },
  })
  .use(router)
  .use(createPinia())
  .provide("myGlobal", globals)
  .mount("#app");




