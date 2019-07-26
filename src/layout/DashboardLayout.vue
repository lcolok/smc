<template>
	<div @dragenter="showUploadBottomSheet()">
		<v-app>
			<core-dialog />
			<core-upload />
			<core-preview />
			<core-filter />
			<core-drawer />
			<core-toolbar />
			<v-flex mt-2>
				<core-view />
			</v-flex>
		</v-app>
	</div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	data: () => ({
		timerCloseDialog: '',
	}),
	// mounted() {
	// 	let vm = this;
	// 	window.addEventListener('dragenter', function(e) {
	// 		vm.showUploadBottomSheet();
	// 	});
	// 	let dropZone = document.getElementById('dropZone');
	// 	// console.log(dropZone);
	// 	dropZone.addEventListener('dragover', () => {
	// 		if (vm.timerCloseDialog) {
	// 			clearTimeout(vm.timerCloseDialog);
	// 		}
	// 		vm.timerCloseDialog = setTimeout(() => {
	// 			vm.hideUploadBottomSheet();
	// 		}, 150);
	// 	});
	// },

	methods: {
		...mapActions('upload', ['showUploadBottomSheet', 'hideUploadBottomSheet']),
	},
};
</script>
