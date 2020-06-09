const qs = require('qs');
const axios = require('axios');
const sheet = require('./lib/sheet.json');

const instance = axios.create({
	method: 'POST',
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
			const MAuthorization = sheet[name].videoList;
			if (!MAuthorization) {
				console.log('没有对应sheetID');
				arr.push([]);
				break;
			}
			let pageArr = [];
			let i = 1;
			let err = false;

			while (!err) {
				const { data } = await instance(
					'/secure/?m=Api&c=Video&a=user_video_list',
					{
						data: qs.stringify({ page: i, pagesize: 30, type: 2, user_id: id }),
						headers: {
							MAuthorization,
						},
					},
				);
				if (data.status == 'ok') {
					i++;
					pageArr = pageArr.concat(data.data.list);
				} else {
					err = true;
					arr.push(pageArr);
					break;
				}
			}
		}

		resolve(arr);
	});
