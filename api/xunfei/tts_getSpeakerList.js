const _ = require('lodash');
const { getSpeakerList } = require('./core');
const AV = require('leancloud-storage');

module.exports = async function() {
	// const speakersArr = await getSpeakerList();

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
	const query = new AV.Query('XunFei');
	query.exists('speakersArr');
	query.descending('createdAt');
	query.limit(1);
	const item = await query.first();
	const speakersArr = item.get('speakersArr');
	tagsArr = ['中文主播', '英语主播', '方言主播', '特色主播'];
	extract = [];
	tagsArr.map(k => {
		let list = _.filter(speakersArr, i => i.tags.includes(k));
		list = _.orderBy(list, ['used_times'], ['desc']);
		extract.push({
			tab: k,
			list,
		});
	});

	return extract;
};
