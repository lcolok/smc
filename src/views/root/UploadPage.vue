<template>
	<div class="mapouter">
		<div class="gmap_canvas">
			<v-container fill-height fluid grid-list-md>
				<v-layout wrap>
					<v-flex>
						<base-filepond :uploadedCallBack="uploadShimobed" />
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>
import AV from 'leancloud-storage';

export default {
	methods: {
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
	height: 54rem;
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
