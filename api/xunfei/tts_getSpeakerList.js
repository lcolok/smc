const _ = require('lodash');
const { getSpeakerList } = require('./core');

module.exports = async function() {
	const speakersArr = await getSpeakerList();

	// extract = speakersArr.map(e =>
	// 	_.pick(e, [
	// 		'speaker_name',
	// 		'speaker_no',
	// 		'speaker_language',
	// 		'speaker_specialty',
	// 		'audio_url',
	// 		'img_url',
	// 		'used_times',
	// 	]),
	// );
	tagsArr = ['方言主播', '中文主播', '英语主播', '特色主播'];
	extract = [];
	tagsArr.map(k => {
		extract.push({
			tab: k,
			list: _.filter(speakersArr, i => i.tags.includes(k)),
		});
	});

	// console.log(extract);
	return extract;
};
