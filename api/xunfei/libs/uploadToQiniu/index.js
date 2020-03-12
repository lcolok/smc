const path = require('path');
const fs = require('fs');
const AV = require('leancloud-storage');

const unshorten = require('./lib/unshorten');

const upload = require('./lib/upload');

function downAndUpload({ filepath, stream }) {
	return new Promise(async (resolve, reject) => {
		const readableStream = stream || fs.createReadStream(filepath);

		const QJ = await AV.Cloud.run('getQiniuJSON', {
			fileNameArr: ['temp.mp3'],
		});
		if (QJ.length > 0) console.log('Got shimo token');
		else return reject;

		console.log('Uploading to Qiniu upload server');
		const { code, data } = await upload({
			readableStream,
			QJ,
		});

		[data.images, data.url] = await unshorten([data.images, data.url]);
		resolve({ code, data, filepath });
	});
}

module.exports = downAndUpload;
