<template>
	<v-container fluid grid-list-xl fill-height>
		<v-layout wrap align-space-around justify-center column fill-height>
			<v-flex mt-2>
				<v-data-table
					:headers="headers"
					:items="accounts"
					:items-per-page="10"
					class="elevation-1"
				></v-data-table>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AV from 'leancloud-storage';

export default {
	data() {
		return {
			headers: [
				{
					text: '账户名',
					align: 'start',
					sortable: false,
					value: 'nickname',
				},
				{ text: '粉丝数', value: 'fans_count' },
				{ text: '视频总数', value: 'video_count' },
				{ text: 'Carbs (g)', value: 'carbs' },
				{ text: 'Protein (g)', value: 'protein' },
				{ text: 'Iron (%)', value: 'iron' },
			],
			accounts: [],
		};
	},
	mounted: async function() {
		const accounts = [];
		const nicknameGroup = ['星星相吸', '剧花磕瓜', '流浪享游'];
		const [infoArr, videoListArr] = await Promise.all([
			AV.Cloud.run('chumanUserInfo', {
				nickname: nicknameGroup,
			}),
			AV.Cloud.run('chumanUserVideoList', {
				nickname: nicknameGroup,
			}),
		]);

		nicknameGroup.forEach((nickname, index) => {
			const dic = {};
			const info = infoArr[index];
			const videoList = videoListArr[index];
			dic.nickname = nickname;
			dic.fans_count = info.fans_count;
			dic.video_count = videoList.length;

			accounts.push(dic);
		});

		console.log(infoArr, videoListArr);

		this.accounts = accounts;
	},

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
