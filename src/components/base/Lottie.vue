<template>
	<div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web';
export default {
	props: {
		options: {
			type: Object,
			required: true,
		},
		height: Number,
		width: Number,
	},
	data() {
		return {
			style: {
				width: this.width ? `${this.width}px` : '100%',
				height: this.height ? `${this.height}px` : '100%',
				overflow: 'hidden',
				margin: '0 auto',
			},
		};
	},
	mounted() {
		let vm = this;
		vm.anim = lottie.loadAnimation({
			container: vm.$refs.lavContainer,
			renderer: 'svg',
			loop: vm.options.loop !== false,
			autoplay: vm.options.autoplay !== false,
			animationData: vm.options.animationData,
			rendererSettings: vm.options.rendererSettings,
		});
		vm.anim.setSpeed(vm.options.animationSpeed || 1);

		vm.$emit('animCreated', vm.anim);
	},
};
</script>
