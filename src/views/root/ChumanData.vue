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
import _ from 'lodash';
import sheet from '../../../api/chuman/lib/sheet.json';

export default {
	data() {
		return {
			headers: [
				{
					text: '账户名',
					align: 'start',
					sortable: false,
					value: 'name',
				},
				{ text: '视频总数', value: 'video_count' },
				{ text: '粉丝数', value: 'fans_count' },
				{ text: '总赞数', value: 'like_num_count' },
				{ text: '总播放数', value: 'play_num_count' },
				{ text: '集均获粉', value: 'fans_count_average' },
				{ text: '集均赞数', value: 'like_num_average' },
				{ text: '集均播放数', value: 'play_num_average' },
			],
			accounts: [],
		};
	},
	mounted: async function() {
		const accounts = [];

		// const nicknameGroup = ['星星相吸', '剧花磕瓜', '流浪享游'];

		const nicknameGroup = _.keys(sheet);

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
			dic.name = info.profile.nickname;
			dic.video_count = videoList.length;
			dic.like_num_count = dic.play_num_count = 0;
			videoList.forEach((video, index) => {
				dic.like_num_count += video.like_num;
				dic.play_num_count += video.play_num;
			});

			dic.like_num_average = Math.ceil(dic.like_num_count / dic.video_count);
			dic.play_num_average = Math.ceil(dic.play_num_count / dic.video_count);
			dic.fans_count_average = Math.ceil(dic.fans_count / dic.video_count);

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
