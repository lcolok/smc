<template>
	<v-text-field
		v-model="searchContent"
		:loading="loading"
		class="mt-2 purple-input"
		:label="$t('Search...')"
		@keyup.enter="
			$event.target.blur();
			search(searchContent);
		"
		hide-details
		v-bind="[$attrs, $props]"
		type="search"
		clearable
	>
		<template v-slot:label>
			搜索
			<v-icon style="vertical-align: middle" size="20">mdi-cloud-search</v-icon>
		</template></v-text-field
	>
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
		...mapMutations('app', ['setDrawer']),

		search: async function(key) {
			console.log(key);
			this.items = [];
			this.searchByKey({ key });
		},
	},
};
</script>
