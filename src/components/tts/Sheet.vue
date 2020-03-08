<template>
	<v-container class="grey lighten-5">
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-row>
			<v-col cols="12" xs="12" sm="6" md="6" lg="4">
				<tts-music-player :file="preview_audio_url" />
			</v-col>
			<v-col cols="12" lg="4" md="6" xs="12" sm="12">
				<v-card outlined tile>
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
			</v-col>
		</v-row>

		<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
		<v-row>
			<v-col v-for="n in 3" :key="n" cols="6" md="4">
				<v-card class="pa-2" outlined tile>
					.col-6 .col-md-4
				</v-card>
			</v-col>
		</v-row>

		<!-- Columns are always 50% wide, on mobile and desktop -->
		<v-row>
			<v-col v-for="n in 2" :key="n" cols="6">
				<v-card class="pa-2" outlined tile>
					.col-6
				</v-card>
			</v-col>
		</v-row>
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
