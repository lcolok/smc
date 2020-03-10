<template>
	<v-container>
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-layout row wrap>
			<!-- <v-flex md6 sm12> </v-flex> -->
			<v-flex xl8 lg7 md6 sm12>
				<v-card
					outlined
					tile
					class="ma-2 pa-2 grey lighten-5"
					:height="cardHeight"
				>
					<v-col align="center" justify="center">
						<v-textarea
							no-resize
							outlined
							name="input-7-4"
							:label="
								`${$t('Number of characters: ')}${numCharacters}/${limit}`
							"
							:height="cardHeight - 60"
							autofocus
							:rules="counter"
							value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
						></v-textarea>
					</v-col>
				</v-card>
			</v-flex>
			<v-flex xl4 lg5 md6 sm12>
				<v-card
					outlined
					tile
					class="ma-2 pa-2 grey lighten-5"
					ref="leftCard"
					:height="cardHeight"
				>
					<!-- <v-col align="center" justify="center">
						<tts-music-player :file="preview_audio_url"/>
					</v-col> -->
					<!-- <v-subheader>{{ $t('Speaker audition') }}</v-subheader> -->
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-card outlined max-width="78" v-on="on"
								><aplayer :audio="audio" mini
							/></v-card>
						</template>
						<span>{{ $t('Click to listen') }}</span>
					</v-tooltip>

					<v-card>
						volume:{{ volume }} speed:{{ speed }} te:{{ te }} speaker_no:{{
							speaker.speaker_no
						}}
					</v-card>

					<!-- <v-card-text>
						<v-row>
							<v-col class="pr-4">
								<v-slider
									v-model="slider"
									class="align-center"
									:max="max"
									:min="min"
									hide-details
								>
									<template v-slot:append>
										<v-btn
											color="primary"
											x-small
											style="padding: 0px 5px"
											outlined
											>恢复默认</v-btn
										>
									</template>
								</v-slider>
							</v-col>
						</v-row>
					</v-card-text> -->
					<!-- <v-subheader>{{ $t('Reading speed') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Reading speed')"
							v-model="speedIndex"
							:tick-labels="speedArray.map(e => e + '×')"
							:max="speedArray.length - 1"
							step="1"
							ticks="always"
							tick-size="4"
							prepend-icon="mdi-speedometer"
						>
							<template v-slot:append>
								<v-btn
									:color="speedIndex == speedIndexDefault ? 'grey' : 'primary'"
									@click="resetSpeed"
									x-small
									style="padding: 0px 5px"
									outlined
									>恢复默认</v-btn
								>
							</template>
						</v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Music volume') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Music volume')"
							prepend-icon="mdi-music"
							append-icon="mdi-volume-high"
							v-model="music_volume"
							thumb-label
						>
							<template v-slot:append>
								<v-btn
									:color="
										music_volume == music_volumeDefault ? 'grey' : 'primary'
									"
									@click="resetMusicVolume"
									x-small
									style="padding: 0px 5px"
									outlined
									>恢复默认</v-btn
								>
							</template>
						</v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Speaker volume') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Speaker volume')"
							prepend-icon="mdi-microphone"
							v-model="volumeIndex"
							thumb-label
						>
							<template v-slot:append>
								<v-btn
									:color="
										volumeIndex == volumeIndexDefault ? 'grey' : 'primary'
									"
									@click="resetVolume"
									x-small
									style="padding: 0px 5px"
									outlined
									>恢复默认</v-btn
								>
							</template>
						</v-slider>
					</v-card-text>
					<!-- <v-subheader>{{ $t('Speaker tone') }}</v-subheader> -->
					<v-card-text>
						<v-slider
							:label="$t('Speaker tone')"
							prepend-icon="mdi-music-accidental-sharp"
							v-model="te"
							thumb-label
						>
							<template v-slot:append>
								<v-btn
									:color="te == teDefault ? 'grey' : 'primary'"
									@click="resetTe"
									x-small
									style="padding: 0px 5px"
									outlined
									>恢复默认</v-btn
								>
							</template></v-slider
						>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
// import url from 'url';
import _ from 'lodash';

export default {
	methods: {
		resetSpeed() {},
		toHttps(u) {
			const url = new URL(u);
			url.protocol = 'https';
			return url.toString();
		},
		resetVolume() {
			this.volumeIndex = this.volumeIndexDefault;
		},
		resetSpeed() {
			this.speedIndex = this.speedIndexDefault;
		},
		resetTe() {
			this.te = this.teDefault;
		},
		resetMusicVolume() {
			this.music_volume = this.music_volumeDefault;
		},
	},
	computed: {
		preview_audio_url() {
			const url = new URL(this.speaker.audio_url);
			url.protocol = 'https';
			return url.toString();
		},
		audio() {
			return {
				name: this.speaker.speaker_name,
				artist: this.speaker.speaker_name,
				url: this.toHttps(this.speaker.audio_url),
				cover: this.toHttps(this.speaker.img_url) // prettier-ignore
			};
		},
		speed() {
			return [-200, -100, 0, 100, 200][this.speedIndex];
		},
		volume() {
			function linear(t, tMin, tMax, minValue, maxValue) {
				let duration = tMax - tMin;
				let diff = maxValue - minValue;
				return (t / duration) * diff + minValue;
			}
			let volume = linear(this.volumeIndex, 0, 100, -20, 20);
			volume = Math.floor(volume);
			console.log(volume);
			return volume;
		},
	},
	props: {
		speaker: {
			type: Object,
			required: true,
		},
	},
	mounted() {
		this.resetVolume();
		this.resetSpeed();
		this.resetTe();
		this.resetMusicVolume();
	},
	data() {
		return {
			cardHeight: 450,
			counter: [
				value => {
					let handledValue = value;
					[
						/\[0\.5秒\]/g,
						/\[1秒\]/g,
						/\[2秒\]/g,
						/\[=[a-z]{1,6}[1-4]\]/g,
					].forEach(e => {
						handledValue = handledValue.replace(e, '');
					});
					let sum = (this.numCharacters = handledValue.length);
					return sum <= this.limit || this.$t('Word limit exceeded');
				},
			],
			limit: 20000,
			numCharacters: 0,
			speedArray: ['0.6', '0.8', '1.0', '1.2', '1.4'],
			speedIndexDefault: 2,
			speedIndex: null,
			music_volume: null,
			music_volumeDefault: 20,
			volumeIndex: null,
			volumeIndexDefault: 50,
			te: null,
			teDefault: 50,
		};
	},
};
</script>
