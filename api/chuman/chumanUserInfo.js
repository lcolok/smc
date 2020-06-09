const axios = require('axios');
const sheet = require('./lib/sheet.json');

const instance = axios.create({
	baseURL: 'https://api.chumanapp.com/',
	timeout: 5000,
});

module.exports = ({ params: { nickname } }) =>
	new Promise(async (resolve, reject) => {
		if (!(nickname instanceof Array)) {
			nickname = [nickname];
		}
		const arr = [];

		for (name of nickname) {
			const id = sheet[name].id;
			const MAuthorization = sheet[name].info;
			if (!MAuthorization) {
				console.log('没有对应sheetID');
				arr.push({});
				break;
			}
			const { data } = await instance.get('/secure', {
				params: {
					m: 'Api',
					c: 'User',
					a: 'user_info',
					user_id: id,
				},
				headers: {
					MAuthorization,
				},
			});
			if (data.status == 'ok') {
				arr.push(data.data);
			} else {
				arr.push([]);
			}
		}
		resolve(arr);
	});
