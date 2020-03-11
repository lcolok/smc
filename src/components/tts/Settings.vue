<template>
	<v-card
		outlined
		tile
		class="ma-2 pa-2 grey lighten-5"
		ref="leftCard"
		:height="cardHeight"
	>
		<v-col align="center" justify="center">
			<!-- <tts-music-player
				:file="
					'http://pyg-proxy.xfyousheng.com:17063/synth?uid=cfbee381-a0af-48fa-bc9c-e0dc11721967&ts=1583938434&sign=0250e97f8a48e1187b9adbd705f6553e&vid=65090&f=v2&cc=0000&sid=C56F52292EEC7B902436E1196A4F9E1C&volume=0&speed=0&content=%5Bte50%5D1.%20%E4%B8%8B%E5%8D%95%E4%BB%98%E8%B4%B9%E5%90%8E%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4%E9%9F%B3%E9%A2%91%E6%B0%B4%E5%8D%B0%EF%BC%8C%E4%BA%AB%E5%8F%97%E7%BA%AF%E5%87%80%E9%9F%B3%E9%A2%91&listen=0'
				"
			/> -->
		</v-col>
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
				v-model="speedSlider"
				:tick-labels="speedArray.map(e => e + '×')"
				:max="speedArray.length - 1"
				step="1"
				ticks="always"
				tick-size="4"
				prepend-icon="mdi-speedometer"
			>
				<template v-slot:append>
					<v-btn
						:color="speedSlider == speedSliderDefault ? 'grey' : 'primary'"
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
						:color="music_volume == music_volumeDefault ? 'grey' : 'primary'"
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
				v-model="volumeSlider"
				thumb-label
			>
				<template v-slot:append>
					<v-btn
						:color="volumeSlider == volumeSliderDefault ? 'grey' : 'primary'"
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
</template>

<script>
// import url from 'url';
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
	methods: {
		toHttps(u) {
			const url = new URL(u);
			url.protocol = 'https';
			return url.toString();
		},
		resetVolume() {
			this.$store.state.tts.volumeSlider = this.volumeSliderDefault;
		},
		resetSpeed() {
			this.$store.state.tts.speedSlider = this.speedSliderDefault;
		},
		resetTe() {
			this.$store.state.tts.te = this.teDefault;
		},
		resetMusicVolume() {
			this.$store.state.tts.music_volume = this.music_volumeDefault;
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

		...mapGetters('tts', ['volume', 'speed']),
		music_volume: {
			set(val) {
				this.$store.state.tts.music_volume = val;
			},
			get() {
				return this.$store.state.tts.music_volume;
			},
		},
		speedSlider: {
			set(val) {
				this.$store.state.tts.speedSlider = val;
			},
			get() {
				return this.$store.state.tts.speedSlider;
			},
		},
		volumeSlider: {
			set(val) {
				this.$store.state.tts.volumeSlider = val;
			},
			get() {
				return this.$store.state.tts.volumeSlider;
			},
		},
		te: {
			set(val) {
				this.$store.state.tts.te = val;
			},
			get() {
				return this.$store.state.tts.te;
			},
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

			speedArray: ['0.6', '0.8', '1.0', '1.2', '1.4'],
			speedSliderDefault: 2,

			music_volumeDefault: 20,
			volumeSliderDefault: 50,
			teDefault: 50,
		};
	},
};
</script>
