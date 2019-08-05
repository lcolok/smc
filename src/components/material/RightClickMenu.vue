<template>
	<!-- <v-menu
		v-model="showMenu"
		v-if="index === showMenuIndex"
		:position-x="MenuX"
		:position-y="MenuY"
		absolute
		offset-y
	>
		<v-list>
			<v-list-tile
				v-for="(menuItem, i) in listItems"
				:key="i"
				@click="menuItem.action(result, $event)"
				:name="menuItem.name"
				:copyContent="result.attributes.copyContent"
				:objectID="result.id"
				:copyShortURL="result.attributes.shortURL"
				:copyLongURL="result.attributes.uploaderURL"
			>
				<v-list-tile-avatar>
					<v-icon>{{ menuItem.icon }}</v-icon>
				</v-list-tile-avatar>
				<v-list-tile-title>{{ menuItem.text }}</v-list-tile-title>
			</v-list-tile>
		</v-list>
	</v-menu> -->
	<base-menu
		v-if="index === showMenuIndex"
		v-model="showMenu"
		:items="listItems"
		:position-x="MenuX"
		:position-y="MenuY"
		:details="$attrs"
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
