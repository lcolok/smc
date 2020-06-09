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

			let pageArr = [];
			const videoListArr = sheet[name].videoList;
			for (i in videoListArr) {
				let { data } = await instance(
					'/secure/?m=Api&c=Video&a=user_video_list',
					{
						data: qs.stringify({
							page: Number(i) + 1,
							pagesize: 30,
							type: 2,
							user_id: id,
						}),
						headers: {
							MAuthorization: videoListArr[i],
						},
					},
				);
				console.log(data.status);
				if (data.status == 'ok') {
					pageArr = pageArr.concat(data.data.list);
				}
			}
			arr.push(pageArr);
		}

		resolve(arr);
	});
