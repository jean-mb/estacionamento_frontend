import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// App.use(BootstrapVue)
createApp(App).use(router).mount('#app')
