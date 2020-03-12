const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const hash = require('object-hash');
const { play, getSpeakerList } = require('./core');

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

	if (fs.existsSync(tempFilePath)) {
		return md5;
	}

	return new Promise(function(resolve) {
		play(payload).then(req => {
			let stream = req.data;
			// console.log(stream);
			stream.pipe(
				fs.createWriteStream(tempFilePath).on('finish', () => {
					console.log('       ', payload.text, 'finished');
					resolve(md5);
					return;
				}),
			);
		});
	});
};
