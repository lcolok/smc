<template>
	<div class="text-center">
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			:nudge-width="200"
			offset-x
		>
			<template v-slot:activator="{ on }">
				<a v-on="on" class="btn btn-neutral btn-icon">
					<span class="btn-inner--icon">
						<img :src="`${$baseUrl}img/icons/common/bark_icon.svg`" />
					</span>
					<span class="btn-inner--text">Bark</span>
				</a>
			</template>

			<v-card>
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<img
								src="https://images-cdn.shimo.im/pZxf2ZWkuAYha0iK__thumbnail"
								alt="LCO"
								@click="launch('lcolok')"
							/>
						</v-list-item-avatar>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>
<script>
import AV from 'leancloud-storage';
import router from '@/router';
import * as _ from 'lodash';
export default {
	data: () => ({
		fav: true,
		menu: false,
		message: false,
		hints: true,
	}),
	methods: {
		launch: async function(user) {
			let vm = this;
			let token = await AV.Cloud.run('launchByBark', { user });
			AV.User.become(token).then(
				function(user) {
					// 登录成功
					if (user) {
						console.log(user);
						let dest;
						if (_.has(vm.$route, 'query.redirect')) {
							dest = vm.$route.query.redirect;
						} else {
							//默认转跳到
							dest = '/';
						}
						console.log(dest);
						router.push({
							path: dest,
						});
					}
				},
				function(error) {
					// session token 无效
				},
			);
		},
	},
};
</script>
