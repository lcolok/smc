const _ = require('lodash');
const { getSpeakerList } = require('./core');
const AV = require('leancloud-storage');

function save2LeanCloud(dic) {
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
		},
		function(error) {
			console.log(JSON.stringify(error));
		},
	);
	return;
}

module.exports = async function() {
	const speakersArr = await getSpeakerList();
	_.forEach(speakersArr, (value, i) => {
		_.forEach(value, (val, j) => {
			let url;
			try {
				url = new URL(val);
				url.protocol = 'https';
			} catch (err) {}
			if (url) {
				speakersArr[i][j] = url.toString();
			}
		});
	});
	const dic = { speakersArr, chosenClass: 'XunFei' };
	save2LeanCloud(dic);
	return speakersArr;
};
