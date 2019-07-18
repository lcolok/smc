<template>
	<div class="text-xs-center">
		<v-bottom-sheet v-model="UBS">
			<v-card>
				<v-container fill-height fluid grid-list-md>
					<v-layout wrap>
						<v-flex>
							<div @dragover="hideUploadBottomSheet(100)">
								<base-filepond
									:uploadedCallBack="uploadShimobed"
									id="dropZone"
								/>
							</div>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card>
		</v-bottom-sheet>
	</div>
</template>

<script>
import AV from 'leancloud-storage';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState('app', ['uploadBottomSheet']),
		UBS: {
			get() {
				return this.uploadBottomSheet;
			},
			set(val) {
				return (this.$store.state.app.uploadBottomSheet = val);
			},
		},
	},
	methods: {
		...mapActions('app', ['hideUploadBottomSheet']),
		uploadShimobed: async function(error, cb) {
			let dic = cb.file.qiniu;

			console.log(dic);

			let filename = cb.file.name;

			let arr = filename.split('.');
			let suffix = arr.pop();
			let realName = arr.join('.');

			dic.data.suffix = suffix;
			dic.data.name = realName;
			console.log(dic);

			AV.Cloud.run('updateShimo', dic);
			return;
		},
	},
};
</script>
<style scope>
.filepond--file-action-button {
	cursor: pointer;
}

.filepond--root {
	height: calc(100vh - 4px - 64px - 50px);
}

.filepond--panel-root {
	background-color: rgb(223, 223, 223);
}
.mapouter {
	text-align: right;
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 0;
}
.gmap_canvas {
	overflow: hidden;
	background: none !important;
	height: 100%;
	width: 100%;
}
@media (min-width: 50em) {
	.filepond--item {
		width: calc(33.33% - 0.5em);
	}
}
</style>
