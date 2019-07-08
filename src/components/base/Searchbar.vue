<template>
	<v-text-field
		v-model="searchContent"
		:loading="loading"
		class="mr-4 mt-2 purple-input"
		:label="$t('Search...')"
		@keyup.enter="search(searchContent)"
		hide-details
		autofocus
	/>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
	data: () => ({
		loading: false,
		searchContent: null,
	}),

	watch: {
		suggest(val) {
			val && val !== this.searchContent && this.baiduSuggest(val);
		},
	},
	methods: {
		...mapActions('search', ['searchByKey']),
		search: async function(key) {
			console.log(key);

			this.items = [];
			this.searchByKey({ key });
		},
	},
};
</script>
