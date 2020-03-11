export default {
	speakersList(state, data) {
		state.speakersList = data;
	},
	lyricClick(state, index) {
		console.log(index);
		state.currentProgress = index * state.sliderScale;
	},
};
