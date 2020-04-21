/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//uploaderURL to attachmentURL using the expand.js
const AV = require('leanengine');
const path = require('path');
const expand = require(path.resolve('server/utils/expandUtils'));

module.exports = (req, res, next) => {
	const query = new AV.Query('newShimoBed');
	query.doesNotExist('attachmentURL'); //空值查询
	query.limit(1000); //请求数量上限为1000条
	query
		.find()
		.then(async every => {
			let len = every.length;
			console.log('总数:' + len);

			every
				.filter(object => {
					return !object.get('attachmentURL');
				})
				.map(async each => {
					let attachmentURL,
						uploaderURL,
						expandedURL,
						matched,
						shortURL,
						oldExpandedURL,
						regExp = /(http(s?):\/\/(attachments-cdn\.shimo\.im)\/([a-z0-9]{16,})(\/[\S]+)*)(\?)*/i;
					uploaderURL = each.get('uploaderURL');
					shortURL = each.get('shortURL');
					oldExpandedURL = each.get('expandedURL');
					if (uploaderURL) {
						expandedURL = await expand(uploaderURL);

						expandedURL = decodeURIComponent(expandedURL);
						matched = expandedURL.match(regExp);
						if (matched) {
							attachmentURL = matched[1];
							console.log(attachmentURL);
							each.set('attachmentURL', attachmentURL);
							each.save();
						}

						// axios({
						// 	method: 'get',
						// 	url: uploaderURL,
						// 	maxRedirects: 0,
						// }).catch(function(error) {
						// 	expandedURL = error.response.headers.location;
						// 	expandedURL = decodeURIComponent(expandedURL);
						// 	console.log(expandedURL);
						// 	if (
						// 		expandedURL.match(
						// 			regExp, //去掉参数部分
						// 		)
						// 	) {
						// 		attachmentURL = expandedURL.split('?')[0];
						// 	}
						// 	if (attachmentURL) {
						// 		console.log(attachmentURL);
						// 	}
						// });
					} else if (shortURL) {
						// expandedURL = await expand(shortURL);
						// console.log(expandedURL);
					}
					if (oldExpandedURL) {
						// console.log(oldExpandedURL);
						matched = oldExpandedURL.match(regExp);
						if (matched) {
							attachmentURL = matched[1];
							console.log(attachmentURL);
							each.set('attachmentURL', attachmentURL);
							each.save();
						}
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

	res.send('u2a');
};
