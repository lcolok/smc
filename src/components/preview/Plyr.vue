<template>
	<div>
		<vue-plyr ref="plyr">
			<video
				poster="poster.png"
				src="https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4"
			>
				<source
					src="https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4"
					type="video/mp4"
					size="720"
				/>
				<source
					src="https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4"
					type="video/mp4"
					size="1080"
				/>
				<track
					kind="captions"
					label="English"
					srclang="en"
					src="captions-en.vtt"
					default
				/>
			</video>
		</vue-plyr>
	</div>
</template>
<script>
export default {
	data: () => ({
		source: {
			src:
				'https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4',
			type: 'video/mp4',
			size: 720,
		},
	}),
	mounted() {
		console.log(this.player);
	},
	computed: {
		player() {
			let player = this.$refs.plyr.player;
			player.source = {
				type: 'video',
				title: 'Example title',

				poster:
					'https://attachments-cdn.shimo.im/EQmY7CGHF9E5iJ8J/%E7%94%B5%E4%BF%A15G_0426_%E9%85%8D%E9%9F%B3%E6%95%88.mp4?vframe/png/offset/87.822126/w/500',
			};
			return player;
		},
	},
};
</script>
