const instance = require('./lib/axiosInstance');

module.exports = ({ params: { user_id } }) =>
	new Promise((resolve, reject) => {
		instance
			.get('/secure', {
				params: {
					m: 'Api',
					c: 'User',
					a: 'user_info',
					user_id,
				},
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
