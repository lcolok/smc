import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'

import '@mdi/font/scss/materialdesignicons.scss'

import colors from 'vuetify/es5/util/colors'


// console.log(colors);
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme
})
