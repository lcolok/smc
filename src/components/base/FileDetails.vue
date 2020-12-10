<template>
	<v-flex>
		<v-flex class="file-type-prompt">
			<v-layout align-center justify-start row fill-height>
				<v-icon size="18" color="white">{{ thisDescriptionList.icon }}</v-icon>

				<v-flex>{{ suffixInLowerCase }}</v-flex>
			</v-layout>
		</v-flex>
		<v-flex class="file-size">
			<v-layout align-center justify-start row fill-height>
				<v-icon size="18" color="white">mdi-harddisk</v-icon>
				<v-flex>{{ prettyBytes(size) }}</v-flex>
			</v-layout>
		</v-flex>
	</v-flex>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import prettyBytes from 'pretty-bytes';

export default {
	created() {
		// console.log(this);
	},
	props: {
		suffix: {
			type: String,
			default: undefined,
		},
		size: {
			type: Number,
			default: undefined,
		},
	},
	computed: {
		...mapState('search', ['unknownDescription', 'descriptionList']),
		suffixInLowerCase() {
			return this.suffix.toLowerCase().trim();
		},
		thisDescriptionList() {
			return (
				this.descriptionList[this.suffixInLowerCase] || this.unknownDescription
			);
		},
	},
	methods: { prettyBytes },
};
</script>
<style lang="scss" scoped>
.file-type-prompt {
	position: absolute;
	bottom: 2%;
	left: 2%;
}

.file-size {
	position: absolute;
	bottom: 2%;
	right: 2%;
}
</style>
