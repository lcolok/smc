const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://api.chumanapp.com/',
	timeout: 5000,
	headers: {
		Accept: '*/*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language':
			'zh-Hans-CN;q=1, zh-Hant-CN;q=0.9, zh-Hant-HK;q=0.8, en-CN;q=0.7, ja-JP;q=0.6',
		Connection: 'keep-alive',
		Host: 'api.chumanapp.com',
		Locale: 'zh-cn',
		MAuthorization:
			'0b379ed3f4f361a68859dece9ee632fe:c3ebcc4002dbccb03e82a669b9ef4057:ar9hzZ0PI2Pp542Ha9KDf73sDYc=',
		'User-Agent': 'TouchManga/4.9.9 (iPhone; iOS 13.5; Scale/3.00)',
		device: 'ios',
		versioncode: 'ios_4.9.9',
	},
});

module.exports = instance;
