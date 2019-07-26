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
import { mapState } from 'vuex';

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
	methods: {
		renderSize(value) {
			if (null == value || value == '') {
				return '0 Bytes';
			}
			var unitArr = new Array(
				'Bytes',
				'KB',
				'MB',
				'GB',
				'TB',
				'PB',
				'EB',
				'ZB',
				'YB',
			);
			var index = 0,
				srcsize = parseFloat(value);
			index = Math.floor(Math.log(srcsize) / Math.log(1024));
			var size = srcsize / Math.pow(1024, index);
			//  保留的小数位数
			size = size.toFixed(2);
			return `${size} ${unitArr[index]}`;
		},
	},
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
