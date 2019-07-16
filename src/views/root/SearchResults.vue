<template>
	<v-container v-if="update" fill-height fluid grid-list-md>
		<material-right-click-menu />
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
		return { update: true };
	},
	watch: {
		results() {
			this.reload();
		},
	},
	computed: {
		...mapState('search', ['results']),
	},
	methods: {
		...mapActions('search', ['searchByKey']),
		complete(index) {
			this.list[index] = !this.list[index];
		},
		reload() {
			// 移除组件
			this.update = false;
			// 在组件移除后，重新渲染组件
			// this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
			this.$nextTick(() => {
				this.update = true;
			});
		},
	},
};
</script>
