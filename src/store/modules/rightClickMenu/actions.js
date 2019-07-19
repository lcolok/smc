export default {
	rightClick({ state, commit }, { index, e }) {
		e.preventDefault();
		commit('showMenu', false);
		state.showMenuIndex = index;
		state.MenuX = e.clientX;
		state.MenuY = e.clientY;
		this._vm.$nextTick(() => {
			commit('showMenu', true);
		});
		setTimeout(() => {
			// state.initClipboardJS();
		}, 0);
	},
};
