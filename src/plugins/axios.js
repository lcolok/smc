import Vue from 'vue';
// Lib imports
import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV == 'development') {
	baseURL = 'http://localhost:3000';
} else {
	baseURL = 'https://smc.leanapp.cn';
}

axios.defaults.baseURL = baseURL;

Vue.prototype.$http = axios;

Vue.prototype.$cloud = {
	routes: (funcName, data) => {
		// return axios.post('/hub/routesFunc?funcName=' + funcName, config);
		return new Promise((resolve, reject) => {
			axios({
				method: 'POST',
				url: '/hub/routesFunc',
				params: { funcName },
				data,
			})
				.then(response => {
					resolve(response.data);
				})
				.catch(reject);
		});
	},
};
