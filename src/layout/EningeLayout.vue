<template>
	<div class="main-content bg-default">
		<!-- Navbar -->

		<!-- Header -->
		<div class="header bg-gradient-success py-2 py-lg-3">
			<div class="container">
				<div class="header-body text-center mb-7">
					<div class="row justify-content-center">
						<!-- <div class="col-lg-5 col-md-6">
							<h2 class="text-white font-weight-bold">二维码更新后台</h2>
							<p class="text-lead text-white font-weight-bolder">
								把新的二维码裁剪好并拖拽上传即可
							</p>
						</div> -->
					</div>
				</div>
			</div>
			<div class="separator separator-bottom separator-skew zindex-100">
				<svg
					x="0"
					y="0"
					viewBox="0 0 2560 100"
					preserveAspectRatio="none"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon
						class="fill-default"
						points="2560 0 2560 100 0 100"
					></polygon>
				</svg>
			</div>
		</div>
		<!-- Page content -->
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
							<a href="/#/login" class="font-weight-bold ml-1" target="_blank"
								>JUB MEDIA</a
							>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
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
