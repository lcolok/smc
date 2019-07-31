<template>
	<v-container>
		<preview-plyr :attrs="attrs" />
	</v-container>
</template>

<script>
import * as _ from 'lodash';
import AV from 'leancloud-storage';

export default {
	data() {
		return {
			attrs: {
				attachmentURL: null,
			},
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (_.has(to, 'query.id')) {
				let id = to.query.id;
				console.log(id);
				let query = new AV.Query('ShimoBed');
				query.equalTo('objectId', id);
				query.first().then(videoObj => {
					if (videoObj) {
						console.log(videoObj);
						let attachmentURL = videoObj.get('attachmentURL');
						vm.attrs.attachmentURL = attachmentURL;
						console.log(attachmentURL);
					}
				});
			} else {
				console.log('没有vid');
			}
		});
	},
};
</script>
