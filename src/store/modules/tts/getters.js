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
};
