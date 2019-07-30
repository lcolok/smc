<template> </template>

<script>
import AV from 'leancloud-storage';
import * as _ from 'lodash';

export default {
	mounted() {
		let vm = this;
		if (_.has(vm.$route, 'query.userID') && _.has(vm.$route, 'query.barkID')) {
			let userID = vm.$route.query.userID,
				barkID = vm.$route.query.barkID;
			console.log(userID, barkID);
			AV.Cloud.run('finishedBinding', { barkID, userID });
		}
	},
};
</script>

<style lang="scss" scoped></style>
