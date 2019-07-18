export default {
	showUploadBottomSheet({ state }) {
		// console.log(state);
		state.uploadBottomSheet = true;
	},
	hideUploadBottomSheet({ state }, delay) {
		// console.log('hide');

		if (state.timerCloseDialog) {
			clearTimeout(state.timerCloseDialog);
		}
		state.timerCloseDialog = setTimeout(() => {
			state.uploadBottomSheet = false;
		}, delay || 0);
	},
	toggleUploadBottomSheet({ state }) {
		state.uploadBottomSheet = !state.uploadBottomSheet;
	},
};
