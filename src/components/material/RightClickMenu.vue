<template>
	<base-menu
		:dark="false"
		v-if="index === showMenuIndex"
		v-model="showMenu"
		:items="listItems"
		:position-x="MenuX"
		:position-y="MenuY"
		v-bind="[$attrs, $props]"
	/>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	// beforeCreate() {
	// 	console.log(this.$attrs);
	// },

	data: () => ({
		// ...mapState('rightClickMenu', ['showMenu']),
		result: { attributes: {} },
	}),
	computed: {
		...mapState('rightClickMenu', [
			'listItems',
			'MenuX',
			'MenuY',
			'showMenuIndex',
		]),

		showMenu: {
			get: function() {
				return this.$store.state.rightClickMenu.showMenu;
			},
			set: function(newValue) {
				this.$store.state.rightClickMenu.showMenu = newValue;
			},
		},
	},
	props: {
		index: {
			type: Number,
			default: undefined,
		},
	},
};
</script>
<style lang="scss" scoped></style>
