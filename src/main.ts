import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMask from 'v-mask';
App.use(VueMask);
createApp(App).use(router).mount('#app')
