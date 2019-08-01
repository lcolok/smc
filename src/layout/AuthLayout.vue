<template>
	<v-app>
		<div class="main-content bg-default">
			<template>
				<v-parallax
					dark
					height="450"
					src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
				>
					<v-layout align-center column justify-center>
						<h1 class="display-2 font-weight-thin mb-4">Vuetify.js</h1>
						<h4 class="subheading">Build your application today!</h4>
					</v-layout>
				</v-parallax>
			</template>
			<div class="container mt--8 pb-5">
				<slide-y-up-transition mode="out-in" origin="center top">
					<router-view></router-view>
				</slide-y-up-transition>
			</div>
			<footer class="py-5">
				<div class="container">
					<div class="row align-items-center justify-content-xl-between">
						<div class="col-xl-6">
							<div class="copyright text-center text-xl-left text-muted">
								&copy; {{ year }}
								<a
									href="https://www.creative-tim.com"
									class="font-weight-bold ml-1"
									target="_blank"
									>Creative Tim</a
								>
							</div>
						</div>
					</div>
				</div>
			</footer>
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
		};
	},
};
</script>
<style></style>
