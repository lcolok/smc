<template>
	<v-card outlined tile class="ma-2 pa-2 grey lighten-5">
		<aplayer :audio="audio" mini />
		<text-highlight :queries="queries">{{ content }}</text-highlight>
		<v-slider
			v-model="currentProgress"
			thumb-label
			:min="0"
			:max="sliderMax"
		></v-slider>
	</v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TextHighlight from 'vue-text-highlight';
export default {
	components: {
		TextHighlight,
	},
	mounted() {},
	computed: {
		audio() {
			return {
				name: this.speaker.speaker_name,
				artist: this.speaker.speaker_name,
				url: this.toHttps(this.speaker.audio_url),
				cover: this.toHttps(this.speaker.img_url) // prettier-ignore
			};
		},
		...mapState('tts', ['content']),
		...mapGetters('tts', ['afterSegment', 'sliderMax', 'queries']),
		// lyric() {
		// 	const obj = {};
		// 	this.afterSegment.map((e, index) => {
		// 		obj[index] = e;
		// 	});
		// 	console.log(obj);
		// 	return obj;
		// },
		currentProgress: {
			get() {
				return this.$store.state.tts.currentProgress;
			},
			set(val) {
				this.$store.state.tts.currentProgress = val;
			},
		},
	},

	methods: {
		toHttps(u) {
			const url = new URL(u);
			url.protocol = 'https';
			return url.toString();
		},
	},
	props: {
		speaker: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		// queries: ['birds', 'scatt'],
		// description: 'Tropical birds scattered as Drake veered the Jeep',
	}),
};
</script>
