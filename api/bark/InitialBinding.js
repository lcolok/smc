const axios = require('axios');

const bind = async ({ params: { barkID, userID, domain } }) => {
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
