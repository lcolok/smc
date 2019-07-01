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
import { mapState } from 'vuex';

export default {
	computed: mapState({
		// 箭头函数可使代码更简练
		results: state => state.search.results,
	}),
	data() {
		return {
			
		};
	},
	methods: {
		complete(index) {
			this.list[index] = !this.list[index];
		},
	},
};
</script>
