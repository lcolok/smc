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

export default {
	name: 'app',

	data() {
		return {
			defaultOptions: {
				animationData: animationData.default,
				animationSpeed: 3,
			},
		};
	},
	methods: {
		initAnim: function(anim) {
			this.anim = anim;
			this.anim.goToAndStop(250, false);
		},

		staticFrame: function() {
			this.anim.goToAndStop(0, false);
		},

		uploading: function() {
			this.anim.goToAndPlay(0, false);
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
