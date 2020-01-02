/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//uploaderURL to attachmentURL using the expand.js
//rsu : Refresh shortened url

const AV = require('leanengine');
const path = require('path');
const expand = require(path.resolve('server/utils/expandUtils'));

module.exports = (req, res, next) => {
	const query = new AV.Query('ShimoBed');
	query.doesNotExist('newShortURL'); //空值查询
	query.limit(1000); //请求数量上限为1000条
	query
		.find()
		.then(async every => {
			let len = every.length;
			console.log('总数:' + len);

			every
				.filter(object => {
					return !object.get('newShortURL');
				})
				.map(async each => {
					let attachmentURL,
						matched,
						selfMakeAttachmentURL,
						regExp = /(http(s?):\/\/(attachments-cdn\.shimo\.im)\/([a-z0-9]{16,})(\/[\S]+)*)(\?)*/i;

					attachmentURL = each.get('attachmentURL');

					if (attachmentURL) {
						matched = attachmentURL.match(regExp);
						if (matched) {
							selfMakeAttachmentURL = attachmentURL
							// .replace(
							// 	/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
							// 	'https://dn-shimo-attachment.qbox.me/',
							// );
							AV.Cloud.run('shortenURL', {
								origURL: selfMakeAttachmentURL,
							}).then(shortURL => {
								console.log(shortURL);
								each.set('newShortURL', shortURL);
								each.save();
							});
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

	res.send('rsu');
};
