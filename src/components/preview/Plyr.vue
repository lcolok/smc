<template>
	<div>
		<vue-plyr ref="plyr" :options="options">
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
      ></div>-->
		</vue-plyr>
		<v-btn @click="capture" color="primary">截图</v-btn>
	</div>
</template>
<script>
export default {
	data: () => ({
		options: {
			title: 'Example Title',
			loadSprite: true,

			i18n: {
				restart: 'Restart',
				rewind: 'Rewind {seektime}s',
				play: 'Play',
				pause: 'Pause',
				fastForward: 'Forward {seektime}s',
				seek: 'Seek',
				seekLabel: '{currentTime} of {duration}',
				played: 'Played',
				buffered: 'Buffered',
				currentTime: 'Current time',
				duration: 'Duration',
				volume: 'Volume',
				mute: 'Mute',
				unmute: 'Unmute',
				enableCaptions: 'Enable captions',
				disableCaptions: 'Disable captions',
				download: 'Download',
				enterFullscreen: 'Enter fullscreen',
				exitFullscreen: 'Exit fullscreen',
				frameTitle: 'Player for {title}',
				captions: '字幕',
				settings: '设定',
				menuBack: 'Go back to previous menu',
				speed: 'Speed',
				normal: 'Normal',
				quality: '质量',
				loop: 'Loop',
				start: 'Start',
				end: 'End',
				all: 'All',
				reset: 'Reset',
				disabled: 'Disabled',
				enabled: 'Enabled',
				advertisement: 'Ad',
				qualityBadge: {
					2160: '4K',
					1440: 'HD',
					1080: 'HD',
					720: 'HD',
					576: 'SD',
					480: 'SD',
				},
			},
		},
	}),
	mounted() {},
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
