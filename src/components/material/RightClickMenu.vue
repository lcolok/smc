<template>
	<v-menu
		v-model="showMenu"
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
	</v-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			result: { attributes: {} },
		};
	},
	computed: {
		...mapState('rightClickMenu', ['listItems', 'MenuX', 'MenuY', 'showMenu']),
	},
};
</script>
