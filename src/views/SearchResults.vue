<template>
  <v-container fill-height fluid grid-list-md>
    <v-layout wrap>
      <v-flex v-for="(item,index) in results" :key="index" sm6 xs12 md6 lg3>
        <material-results-card v-bind="item" />
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
		this.searchByKey({ key: this.$route.query.key });
	},
	computed: mapState({
		results: state => state.search.results,
	}),
	data() {
		return {};
	},
	methods: {
		...mapActions('search', ['searchByKey']),
		complete(index) {
			this.list[index] = !this.list[index];
		},
	},
};
</script>
