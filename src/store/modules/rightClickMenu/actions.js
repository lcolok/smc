export default {
	rightClick({ state }, { index, e }) {
		// e.preventDefault()
		// console.log(e);
		// this.showMenu = false
		// this.MenuX = e.clientX
		// this.MenuY = e.clientY
		// this.$nextTick(() => {
		//   this.showMenu = true
		// })
		console.log(index);
		console.log(e);
		console.log(this._vm);

		e.preventDefault();
		// console.log(index);
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
