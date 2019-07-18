<template>
	<div id="app">
		<base-lottie
			style="position:relative;bottom:4px;"
			:options="defaultOptions"
			:height="20"
			:width="20"
			@animCreated="initAnim"
		/>
	</div>
</template>

<script>
import * as animationData from './json/1683-cloud-upload.json';
import { mapState } from 'vuex';
export default {
	name: 'app',
	watch: {
		status(val) {
			switch (val) {
				case 'uploading':
					this.uploading();
					break;
				case 'finished':
					this.finished();
					break;
				default:
					break;
			}
		},
	},
	data() {
		return {
			defaultOptions: {
				animationData: animationData.default,
				animationSpeed: 3,
				loop: true,
			},
		};
	},
	computed: {
		...mapState('upload', ['uploadBottomSheet', 'status']),
	},
	methods: {
		initAnim: function(anim) {
			this.anim = anim;
			this.anim.goToAndStop(30, true);
		},

		staticFrame: function() {
			this.anim.goToAndStop(0, true);
		},

		uploading: function() {
			this.anim.playSegments([[30, 60], [0, 60]], false);
		},
		finished: function() {
			this.anim.playSegments([[0, 30], [30, 31]], false);
		},

		stop: function() {
			this.anim.stop();
		},

		play: function() {
			this.anim.play();
		},

		pause: function() {
			this.anim.pause();
		},

		onSpeedChange: function() {
			this.anim.setSpeed(this.animationSpeed);
		},
	},
};
</script>
