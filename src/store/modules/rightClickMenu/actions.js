export default {
	rightClick({ state }, { index, e }) {
		e.preventDefault();
		state.showMenu = false;
		state.showMenuIndex = index;
		state.MenuX = e.clientX;
		state.MenuY = e.clientY;

		this._vm.$nextTick(() => {
			state.showMenu = true;
		});

		setTimeout(() => {
			// state.initClipboardJS();
		}, 0);
	},
};
