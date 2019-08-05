export default {
	deleteItem(state, index) {
		console.log(index);
		return state.results.splice(index, 1);
	},
};
