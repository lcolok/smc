<template>
	<v-container>
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-layout row wrap>
			<!-- <v-flex md6 sm12> </v-flex> -->
			<v-flex xl8 lg7 md6 sm12>
				<tts-textarea />
				<tts-test-and-pay :speaker="speaker" />
			</v-flex>
			<v-flex xl4 lg5 md6 sm12>
				<tts-settings :speaker="speaker" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	// computed: {
	// 	currentSpeaker: {
	// 		set(val) {
	// 			this.$store.state.tts.currentSpeaker = val;
	// 		},
	// 		get() {
	// 			return this.$store.state.tts.currentSpeaker;
	// 		},
	// 	},
	// },
	props: {
		speaker: {
			type: Object,
			required: true,
		},
	},
	watch: {
		speaker(val) {
			this.$store.state.tts.currentSpeaker = val;
		},
	},
	mounted() {
		this.$store.state.tts.currentSpeaker = this.speaker;
	},
	data: () => ({ cardHeight: 450 }),
};
</script>
