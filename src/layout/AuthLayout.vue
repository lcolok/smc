<template>
	<v-app>
		<div dark height="100%" class="mainHolder text-center white--text">
			<v-layout align-center column justify-start>
				<v-container>
					<h1 class="display-2 font-weight-thin mb-4">SMC</h1>
					<h4 class="subheading">Save file , save life.</h4>

					<slide-y-up-transition mode="out-in" origin="center top">
						<router-view></router-view>
					</slide-y-up-transition>
					<base-footer />
				</v-container>
			</v-layout>
		</div>
	</v-app>
</template>
<script>
import '@/assets/vendor/nucleo/css/nucleo.css'; //主要为argon中的icon
import '@/assets/scss/argon.scss';
import { SlideYUpTransition } from 'vue2-transitions';

export default {
	name: 'auth-layout',
	components: {
		SlideYUpTransition,
	},
	data() {
		return {
			year: new Date().getFullYear(),
			showMenu: false,
			icons: [
				'mdi-wechat',
				'mdi-qqchat',
				'mdi-sina-weibo',
				'mdi-apple',
				'mdi-google',
				'mdi-microsoft',
			],
		};
	},
};
</script>

<style scope>
* {
	box-sizing: border-box;
}
.mainHolder {
	width: 100%;
	height: 100%;
	background-image: url(https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg);
	background-attachment: fixed;
	background-position: center;
	background-size: cover;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
	width: 0 !important;
}
::-webkit-scrollbar {
	width: 0 !important;
	height: 0;
}
/* 隐藏滚动条 */
</style>
