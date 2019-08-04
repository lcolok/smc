<template>
	<v-flex>
		<v-flex class="file-type-prompt">
			<v-layout align-center justify-start row fill-height>
				<v-icon size="18" color="white">{{ thisDescriptionList.icon }}</v-icon>

				<v-flex>{{ suffix }}</v-flex>
			</v-layout>
		</v-flex>
		<v-flex class="file-size">
			<v-layout align-center justify-start row fill-height>
				<v-icon size="18" color="white">mdi-harddisk</v-icon>
				<v-flex>{{ renderSize(size) }}</v-flex>
			</v-layout>
		</v-flex>
	</v-flex>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { renderSize } from '@/utils/handle';
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
		thisDescriptionList() {
			return this.descriptionList[this.suffix] || this.unknownDescription;
		},
	},
	methods: { renderSize },
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
