import Vue from 'vue';
import Vuetify from 'vuetify';
import theme from '@/plugins/theme.js';
import 'vuetify/dist/vuetify.min.css';

import '@mdi/font/scss/materialdesignicons.scss';

// import colors from 'vuetify/es5/util/colors';

// console.log(colors);
Vue.use(Vuetify);

const vuetifyOptions = {
	theme: {
		themes: {
			light: theme,
		},
	},
	icons: {
		iconfont: 'mdi', // default - only for display purposes
	},
};

export default new Vuetify(vuetifyOptions);
