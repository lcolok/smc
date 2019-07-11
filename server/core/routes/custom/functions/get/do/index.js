const axios = require('axios');
const iconv = require('iconv-lite');

module.exports = (req, res, next) => {
	let params = req.query;
	params.action = 'opensearch'; //增加此句会让服务器返回数组

	axios
		.get('http://www.baidu.com/su', {
			params: params,
			responseType: 'arraybuffer', //这是起到决定性的作用
			transformResponse: [
				function(data) {
					data = iconv.decode(data, 'gbk');

					return data;
				},
			],
		})
		.then(function(response) {
			// console.log(response);
			res.json({ data: response.data, duration: response.duration });
		})
		.catch(function(error) {
			console.log(error);
		});
};
