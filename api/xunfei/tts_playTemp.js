const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const hash = require('object-hash');
const qiniu = require('qiniu');
const { play, getSpeakerList } = require('./core');
const AV = require('leancloud-storage');
const uploadToQiniu = require('./libs/uploadToQiniu');

module.exports = async function({ params }) {
	const payload = params;

	const ttsPath = '/tmp/tts/';

	if (!fs.existsSync(ttsPath)) {
		if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');
		fs.mkdirSync(ttsPath);
	}

	const md5 = hash.MD5(payload);

	console.log(md5);

	const tempFilePath = path.resolve(ttsPath, md5 + '.mp3');

	const query = new AV.Query('tts_mp3Temp');
	query.equalTo('md5', md5);
	const result = await query.first();
	if (result) {
		return result.get('url');
	}

	if (fs.existsSync(tempFilePath)) {
		return md5;
	}

	return new Promise(function(resolve) {
		play(payload).then(async req => {
			let stream = req.data;
			// console.log(stream);
			stream.pipe(
				fs.createWriteStream(tempFilePath).on('finish', () => {
					console.log('       ', payload.text, 'finished');

					uploadToQiniu({
						filepath: tempFilePath,
					}).then(async ({ code, data }) => {
						if (code == 0) {
							console.log(data);
							const dic = { url: data.url, chosenClass: 'tts_mp3Temp', md5 };
							await save2LeanCloud(dic);
							resolve(data.url);
						}
					});

					resolve(md5);
					return;
				}),
			);
		});
	});
};

function save2LeanCloud(dic) {
	return new Promise((resolve, reject) => {
		var extendedClass = AV.Object.extend(dic.chosenClass);
		var file = new extendedClass();
		for (var i in dic) {
			if (i == 'size') {
				file.set(i, Number(dic[i]));
				continue;
			}

			if (i == 'chosenClass') continue;

			file.set(i, dic[i]);
		}
		file.save().then(
			function() {
				console.log('已上传到LeanCloud');
				resolve();
			},
			function(error) {
				console.log(JSON.stringify(error));
				reject();
			},
		);
	});
}
