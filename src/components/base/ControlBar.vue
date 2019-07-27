<template>
	<v-flex class="control-bar">
		<v-btn
			icon
			large
			@click="
				leftClick({
					$event,
					$attrs,
					$props,
					typeName: thisDescriptionList.typeName,
				})
			"
		>
			<v-icon>
				mdi-play
			</v-icon>
		</v-btn>
	</v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	computed: {
		...mapState('search', ['descriptionList']),
		thisDescriptionList() {
			return this.descriptionList[this.suffix] || this.unknownDescription;
		},
	},
	methods: {
		...mapActions('preview', ['leftClick']),
	},
	props: {
		suffix: {
			type: String,
			default: undefined,
		},
	},
};
</script>

<style lang="scss" scoped>
.control-bar {
	position: absolute;
}
</style>
