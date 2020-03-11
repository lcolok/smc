import txtsegment from '../../../../api/xunfei/txtsegment';

export default {
	speakersList: state => {
		return state.speakersList;
	},
	volume: state => {
		function linear(t, tMin, tMax, minValue, maxValue) {
			let duration = tMax - tMin;
			let diff = maxValue - minValue;
			return (t / duration) * diff + minValue;
		}
		let volume = linear(state.volumeSlider, 0, 100, -20, 20);
		volume = Math.floor(volume);
		return (state.volume = volume);
	},
	speed: state => {
		return [-200, -100, 0, 100, 200][state.speedSlider];
	},
	totalWord: state => {
		let handledValue = state.content;
		[/\[0\.5秒\]/g, /\[1秒\]/g, /\[2秒\]/g, /\[=[a-z]{1,6}[1-4]\]/g].forEach(
			e => {
				handledValue = handledValue.replace(e, '');
			},
		);
		return (state.totalWord = handledValue.length);
	},
	afterSegment: state => {
		return txtsegment(state.content);
	},
	sliderMax: (state, getters) => {
		return (getters.afterSegment.length - 1) * state.sliderScale;
	},
	queries: (state, getters) => {
		let progress = state.currentProgress;
		let scale = state.sliderScale;
		// let rate = (progress - Math.floor(progress / scale) * scale) / scale;
		let rate = progress / scale - Math.floor(progress / scale);

		console.log(rate);
		let currentSentence = getters.afterSegment[Math.floor(progress / scale)];
		console.log(currentSentence);
		let len = currentSentence.length;
		return currentSentence.substr(Math.floor(len * rate), 1);
	},
};
