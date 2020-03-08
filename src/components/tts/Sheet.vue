<template>
	<v-container>
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-layout row wrap>
			<!-- <v-flex md6 sm12> </v-flex> -->
			<v-flex md6 sm12>
				<v-card outlined tile class="ma-2 pa-2 grey lighten-5">
					<v-col align="center" justify="center">
						<tts-music-player :file="preview_audio_url"
					/></v-col>

					<!-- <v-subheader>{{ $t('Reading speed') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Reading speed')"
							v-model="speed"
							:tick-labels="speedArray.map(e => e + '×')"
							:max="speedArray.length - 1"
							step="1"
							ticks="always"
							tick-size="4"
							prepend-icon="mdi-tortoise"
							append-icon="mdi-rabbit"
							dense
						></v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Music volume') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Music volume')"
							prepend-icon="mdi-volume-low"
							append-icon="mdi-volume-high"
							v-model="music_volume"
							thumb-label
						></v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Speaker volume') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Speaker volume')"
							prepend-icon="mdi-volume-low"
							append-icon="mdi-volume-high"
							v-model="volume"
							thumb-label
						></v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Speaker tone') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Speaker tone')"
							prepend-icon="mdi-arrow-down-circle-outline"
							append-icon="mdi-arrow-up-circle-outline"
							v-model="te"
							thumb-label
						></v-slider>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex md6 sm12>
				<v-card outlined tile class="ma-2 pa-2 grey lighten-5">
					<v-col align="center" justify="center">
						<v-textarea
							outlined
							name="input-7-4"
							label="Outlined textarea"
							value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
						></v-textarea>
					</v-col>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
// import url from 'url';

export default {
	computed: {
		preview_audio_url() {
			const url = new URL(this.speaker.audio_url);
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
	data() {
		return {
			speed: 2,
			music_volume: 20,
			volume: 50,
			te: 50,
			speedArray: ['0.6', '0.8', '1.0', '1.2', '1.4'],
		};
	},
};
</script>
