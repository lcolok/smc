<template>
	<div>
		<v-menu
			bottom
			right
			content-class="dropdown-menu"
			offset-y
			transition="slide-y-transition"
			absolute
			v-bind="[$attrs]"
		>
			<v-list dense>
				<v-list-tile
					v-for="(item, i) in items"
					:key="i"
					@click="item.action({ e: $event, details })"
				>
					<!--               <v-list-tile-avatar color="rgba(0, 0, 0, 0)">
                <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>-->
					<v-icon>{{ item.icon }}</v-icon>
					<v-list-tile-title>{{ item.text }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import { Object } from 'leancloud-storage';
export default {
	watch: {
		details(val) {
			console.log(val);
		},
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		details: {
			required: false,
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
