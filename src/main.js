import Vue from "vue";
// import './plugins/antd'
// import './plugins/vuetify'
import ArgonDashboard from './plugins/argon-dashboard'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import rawDisplayer from "./vue/infra/raw-displayer.vue";
import './registerServiceWorker'


import './plugins/directives'
import 'animate.css';
import '@mdi/font/css/materialdesignicons.css';//mdi图标

// Components
import './components'

Vue.config.productionTip = false
Vue.use(ArgonDashboard)
Vue.component("rawDisplayer", rawDisplayer);

import store from '@/store'

// // Sync router with store
// import { sync } from 'vuex-router-sync'
// // Sync store with router
// sync(store, router)


/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,

  render: h => h(App)
}).$mount('#app')

