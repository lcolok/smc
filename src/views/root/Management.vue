<template>
	<v-container fluid grid-list-xl fill-height>
		<v-layout wrap align-space-around justify-center column fill-height>
			<v-flex mt-2>
				<h2 class="title font-weight-light">
					{{ $t('Invitation code generator') }}
				</h2>
				<base-code-generator xs12 />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AV from 'leancloud-storage';

export default {
	beforeRouteEnter(to, from, next) {
		//beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
		if (AV.User.current().id == '5d19ba8a30863b0070ef7faf') {
			next();
		} else {
			next({ path: '/' });
		}
	},
};
</script>
