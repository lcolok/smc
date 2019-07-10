//uploaderURL to attachmentURL using the expand.js
const AV = require('leanengine');

let axios = require('axios');

axios.interceptors.request.use(
	function(request) {
		request['headers']['common']['Accept'] = 'application/json;charset=gb2312;';
		return request;
	},
	function(error) {
		return Promise.reject(error);
	},
);

module.exports = (req, res, next) => {
	const query = new AV.Query('ShimoBed');
	query.doesNotExist('attachmentURL'); //空值查询
	query.limit(500); //请求数量上限为1000条
	query
		.find()
		.then(async every => {
			let len = every.length;
			console.log('总数:' + len);

			every
				.filter(e => {
					return !e.get('attachmentURL');
				})
				.map(async each => {
					let attachmentURL, uploaderURL, expandedURL;
					uploaderURL = each.get('uploaderURL');

					if (uploaderURL) {
						uploaderURL = uploaderURL.replace('https', 'http');
						// console.log(uploaderURL);
						axios({
							method: 'get',
							url: uploaderURL,
							maxRedirects: 0,
						}).catch(function(error) {
							expandedURL = error.response.headers.location;
							expandedURL = decodeURIComponent(expandedURL);
							if (
								expandedURL.match(
									/(attachments-cdn\.shimo\.im)\/([a-z0-9]{16,})\/([\S]+)\?/i, //去掉参数部分
								)
							) {
								attachmentURL = expandedURL.split('?')[0];
							}
							if (attachmentURL) {
								console.log(attachmentURL);
							}
						});
					}
				});
		})
		.then(
			function() {
				// 更新成功
			},
			function(error) {
				// 异常处理
			},
		);

	res.send();
};
