/* eslint-disable no-console */
const AV = require('leanengine');
const axios = require('axios');
const launch = async ({ params: { user } }) => {
	return new Promise((resolve, reject) => {
		let query = new AV.Query('_User');
		query.equalTo('username', user);
		query.first().then(async userObj => {
			if (userObj) {
				let barkID = userObj.get('barkID');

				let token = userObj.get('token');

				let resp = await axios({
					method: 'GET',
					url: encodeURI(
						`https://api.day.app/${barkID}/SMC登录验证/点开此消息即可登录`,
					),
					params: {
						url: `https://www.baidu.com`,
					},
				});

				resolve(token);
			}
		});
	});
};

module.exports = launch;
