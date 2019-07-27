'use strict';

// 禁止右键菜单
document.oncontextmenu = function() {
	return process.env.NODE_ENV === 'development'; //如果在开发模式就返回 true ，可以使用右键，如果生产模式就返回 false，禁止右键
};
// 禁止文字选择
// document.onselectstart = function(){ return false; };
// 禁止复制
// document.oncopy = function(){ return false; };
// 禁止剪切
// document.oncut = function(){ return false; };
// 禁止粘贴
// document.onpaste = function(){ return false; };

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Components
import './components';

// Plugins
import './plugins';

// Sync router with store
// import { sync } from 'vuex-router-sync'

// Application imports
import App from './App';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

import 'normalize.css';

// Sync store with router
// sync(store, router)

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.VUE_APP_PUBLIC_PATH;

/* eslint-disable no-new */
new Vue({
	i18n,
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
