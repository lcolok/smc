const qiniu = require('qiniu');

async function upload({ readableStream, QJ, index }) {
	return new Promise(async (resolve, reject) => {
		if (!index) index = 0;
		const uploadToken = QJ[index].token;
		const key = QJ[index].key;

		let config = {};

		var formUploader = new qiniu.form_up.FormUploader(config);
		var putExtra = new qiniu.form_up.PutExtra();

		formUploader.putStream(uploadToken, key, readableStream, putExtra, function(
			respErr,
			respBody,
			respInfo,
		) {
			if (respErr) {
				reject(respErr);
				throw respErr;
			}
			if (respInfo.statusCode == 200) {
				resolve(respBody);
			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
			}
		});
	});
}

module.exports = upload;
