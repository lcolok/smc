export default {
	speakersList(state, data) {
		state.speakersList = data;
	},
	lyricClick(state, index) {
		console.log(index);
		state.currentProgress = index * state.sliderScale;
	},
	setSegmentMD5(state, md5) {
		state.segmentMD5 = md5;
	},
	setAnchor(state, anchor) {
		state.anchor = anchor;
	},
};
