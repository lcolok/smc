<template> </template>
<script>
import AV from 'leancloud-storage';

export default {
	data: () => ({
		dialog: false,
		barkURL: null,
	}),
	watch: {
		barkURL(val) {
			let matcher = val.match(/http[s]?:\/\/api\.day\.app\/(\w*)\//i);

			let barkID = matcher[1];
			let userID = AV.User.current().id;
			let domain = window.location.host;
			console.log(barkID);
			if (barkID) {
				AV.Cloud.run('InitialBinding', { barkID, userID, domain });
			}
		},
	},
};
</script>
