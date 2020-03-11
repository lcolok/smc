const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { play, getSpeakerList } = require('./core');

module.exports = async function({ params }) {
	const { te, text, vid } = params;
	if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');
	const ttsPath = '/tmp/tts/';
	if (!fs.existsSync(ttsPath)) fs.mkdirSync(ttsPath);
	const randomName = crypto.randomBytes(4).readUInt32LE(0);
	const tempFilename = path.resolve(ttsPath, randomName + '.mp3');
	console.log(tempFilename);

	return new Promise(function(resolve) {
		play({ te, text, vid }).then(req => {
			let stream = req.data;
			// console.log(stream);
			stream.pipe(
				fs.createWriteStream(tempFilename).on('finish', () => {
					console.log('       ', text, 'finished');
					resolve(randomName);
					return;
				}),
			);
		});
	});
};
