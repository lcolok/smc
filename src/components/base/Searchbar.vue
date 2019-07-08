<template>
	<v-autocomplete
		v-model="searchContent"
		:loading="loading"
		:items="items"
		class="mr-4 mt-2 purple-input"
		:label="$t('Search...')"
		@keyup.enter="search(suggest)"
		hide-details
		hide-no-data
		no-filter
		:search-input.sync="suggest"
	/>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
	data: () => ({
		loading: false,
		searchContent: null,

		items: [],
		suggest: null,
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

		baiduSuggest: async function(s) {
			this.loading = true;

			s = s.replace(/\'/g, ''); //把输入法自动生成的那个间隔符号忽略掉

			// Simulated ajax query
			setTimeout(() => {
				var vm = this;
				this.$http
					.get(`/functions/su?wd=${s}&action=opensearch`)
					.then(function(response) {
						let items = JSON.parse(response.data.data)[1];
						// console.log(items);
						vm.items = items;
					});
				this.loading = false;
			}, 0);
		},
	},
};
</script>
