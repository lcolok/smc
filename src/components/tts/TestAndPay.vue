<template>
	<v-card outlined tile class="ma-2 pa-2 grey lighten-5">
		<aplayer :audio="audio" mini ref="aplayer" loop="none" />
		<!-- <text-highlight :queries="queries">{{ content }}</text-highlight> -->
		<tts-lyric />
		<v-btn color="primary" @click="test">试听</v-btn>
		<v-slider v-model="currentProgress" :min="0" :max="sliderMax"></v-slider>
	</v-card>
</template>

<script>
import AV from 'leancloud-storage';

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
				url: this.currentPlayUrl,
				cover: this.toHttps(this.speaker.img_url) // prettier-ignore
			};
		},
		...mapState('tts', ['content', 'te', 'currentSpeaker']),
		...mapGetters('tts', [
			'afterSegment',
			'sliderMax',
			'queries',
			'currentSentence',
		]),
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
		currentPlayUrl: {
			get() {
				return this.$store.state.tts.currentPlayUrl;
			},
			set(val) {
				this.state.tts.currentPlayUrl = val;
			},
		},
	},
	// watch: {
	// 	currentPlayUrl(val) {
	// 		this.$refs.aplayer.play();
	// 	},
	// },

	methods: {
		toHttps(u) {
			const url = new URL(u);
			url.protocol = 'https';
			return url.toString();
		},
		test() {
			// console.log(this.currentSentence);
			// console.log(this.currentSpeaker.speaker_no);
			// console.log(this.te);
			const payload = {
				te: this.te,
				text: this.currentSentence,
				vid: this.currentSpeaker.speaker_no,
			};
			console.log(payload);
			AV.Cloud.run('playTemp', payload).then(resp => {
				this.$store.state.tts.currentPlayUrl =
					'http://localhost:3000/tts/temp?n=' + resp;
				setTimeout(() => {
					this.$refs.aplayer.play();
				}, 0);
			});
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
