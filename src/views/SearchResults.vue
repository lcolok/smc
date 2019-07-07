<template>
	<v-container fill-height fluid grid-list-md>
		<v-layout wrap>
			<v-flex v-for="(item, index) in results" :key="index" sm6 xs12 md6 lg3>
				<material-results-card
					v-bind="item"
					:title="item.name"
					:subTitle="item.name_trans"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import router from '@/router';

export default {
	mounted() {
		console.log(this.$route.query);
		let query = this.$route.query;
		if (query.key) {
			this.searchByKey({ key: query.key });
		}
	},
	data() {
		return {};
	},
	computed: {
		...mapState('search', ['results']),
	},
	methods: {
		...mapActions('search', ['searchByKey']),
		complete(index) {
			this.list[index] = !this.list[index];
		},
	},
};
</script>
