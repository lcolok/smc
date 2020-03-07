<template>
	<v-row class="fill-height" align="center" justify="center">
		<!-- <h3 class="title">Selected {{ speaker.speaker_no }}</h3> -->
		<tts-music-player :file="speaker.audio_url" />
	</v-row>
</template>

<script>
export default {
	props: {
		speaker: {
			type: Object,
			required: true,
		},
	},
};
</script>
