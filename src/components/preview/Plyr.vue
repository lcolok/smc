<template>
	<div>
		<vue-plyr ref="plyr">
			<video
				crossorigin="anonymous"
				poster="https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4?vframe/png/offset/60"
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
			<!-- <div
				crossorigin="anonymous"
				data-plyr-provider="youtube"
				data-plyr-embed-id="bTqVqk7FSmY"
			></div> -->
		</vue-plyr>
		<v-btn @click="capture" color="primary">截图</v-btn>
	</div>
</template>
<script>
export default {
	data: () => ({}),
	mounted() {
		console.log(
			(this.player.source =
				'https://attachments-cdn.shimo.im/g6f6Crx4CdgQhJyY/电信项目第二期-教你用VoLTE.mp4'),
		);
	},
	computed: {
		player() {
			let player = this.$refs.plyr.player;
			return player;
		},
	},
	methods: {
		capture() {
			// let player = this.player;
			// const width = player.media.videoWidth;
			// const height = player.media.videoHeight;
			// const canvas = Object.assign(document.createElement('canvas'), {
			// 	width,
			// 	height,
			// });
			// canvas.getContext('2d').drawImage(player.media, 0, 0, width, height);
			// // Set as poster (will show if you run `player.stop()` for example)

			// let img = canvas.toDataURL('image/png');

			const canvas = document.createElement('canvas');
			canvas.width = this.player.media.videoWidth;
			canvas.height = this.player.media.videoHeight;
			canvas
				.getContext('2d')
				.drawImage(this.player.media, 0, 0, canvas.width, canvas.height);

			let dataURL;
			canvas.toBlob(blob => {
				dataURL = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = dataURL;
				link.download = 'DPlayer.png';
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(dataURL);
			});
		},
	},
};
</script>
