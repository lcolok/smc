const qs = require('qs');
const instance = require('./lib/axiosInstance');

module.exports = ({ params: { page, user_id } }) =>
	new Promise((resolve, reject) => {
		const data = qs.stringify({ page, pagesize: 30, type: 2, user_id });
		// console.log(data);
		instance('/secure/?m=Api&c=Video&a=user_video_list', {
			method: 'POST',
			// params: {
			// 	m: 'Api',
			// 	c: 'Video',
			// 	a: 'user_video_list',
			// },
			data,
			headers: {
				Accept: '*/*',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language':
					'zh-Hans-CN;q=1, zh-Hant-CN;q=0.9, zh-Hant-HK;q=0.8, en-CN;q=0.7, ja-JP;q=0.6',
				Connection: 'keep-alive',
				'Content-Type': 'application/x-www-form-urlencoded',
				Host: 'api.chumanapp.com',
				Locale: 'zh-cn',
				MAuthorization:
					'0b379ed3f4f361a68859dece9ee632fe:c3ebcc4002dbccb03e82a669b9ef4057:YcNScEheSJyZu1lhFBV7HccG7aY=',
				'User-Agent': 'TouchManga/4.9.9 (iPhone; iOS 13.5; Scale/3.00)',
				device: 'ios',
				versioncode: 'ios_4.9.9',
			},
		})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
