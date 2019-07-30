/* eslint-disable no-console */
const axios = require('axios');
const AV = require('leanengine');
const bind = async ({ params: { barkID, userID, domain, token } }) => {
	let BarkBinding = AV.Object.extend('BarkBinding');
	let bark = new BarkBinding();
	bark.set({ barkID, userID, token });
	bark.save().then(
		function(barkObject) {
			// 成功
			console.log(barkObject);
		},
		function(error) {
			// 失败
		},
	);

	let resp = await axios({
		method: 'GET',
		url: encodeURI(
			`https://api.day.app/${barkID}/SMC绑定初始验证/点开此消息即可完成绑定`,
		),
		params: {
			url: `https://192.168.1.111/init_bark?userID=${userID}&barkID=${barkID}`,
		},
	});
};

module.exports = bind;
