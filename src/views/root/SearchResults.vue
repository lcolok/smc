<template>
	<v-container v-if="update && exist" fill-height fluid grid-list-md>
		<v-layout wrap>
			<v-flex v-for="(item, index) in results" :key="index" sm6 xs12 md6 lg3>
				<material-results-card
					v-bind="item"
					:title="item.name"
					:subTitle="item.name_trans"
					:index="index"
				/>
			</v-flex>
		</v-layout>
	</v-container>
	<v-container v-else fill-height>
		<v-layout align-center justify-center column fill-height>
			<lottie-file-not-found />

			<v-layout align-start justify-center column fill-height>
				<h5>
					{{ $t('Your search - ') }}{{ oldKey
					}}{{ $t(' - did not match any documents.') }}
				</h5>
				<h5>建议：</h5>
				<ul>
					<li>请检查输入字词有无错误。</li>
					<li>请尝试其他查询词。</li>
					<li>请改用较常见的字词。</li>
				</ul>
			</v-layout>
		</v-layout>
	</v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import router from '@/router';
import * as _ from 'lodash';

export default {
	// created() {
	// 	this.showMenu(false);
	// },
	beforeRouteEnter(to, from, next) {
		//beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
		if (_.has(to, 'query.key')) {
			next(vm => {
				// 通过 `vm` 访问组件实例
				let query = to.query;
				if (query.key !== vm.oldKey) {
					vm.searchByKey({ key: query.key });
				}
			});
		} else {
			next({ path: from.fullPath });
		}
	},
	beforeRouteLeave(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		this.showMenu(false);
		next();
	},

	data() {
		return {
			update: true,
		};
	},
	watch: {
		results(val) {
			this.reload();
		},
	},
	computed: {
		...mapState('search', ['results']),
		...mapState('search', ['oldKey']),
		exist: {
			get() {
				return !_.isEmpty(this.results);
			},
			set(val) {
				return;
			},
		},
	},
	methods: {
		...mapActions('search', ['searchByKey']),
		...mapMutations('rightClickMenu', ['showMenu']),
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
