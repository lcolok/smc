<template>
	<v-container>
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-layout row wrap>
			<!-- <v-flex md6 sm12> </v-flex> -->
			<v-flex md6 sm12>
				<v-card
					outlined
					tile
					class="ma-2 pa-2 grey lighten-5"
					ref="leftCard"
					:height="cardHeight"
				>
					<v-col align="center" justify="center">
						<tts-music-player :file="preview_audio_url"
					/></v-col>
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
							v-model="speed"
							:tick-labels="speedArray.map(e => e + '×')"
							:max="speedArray.length - 1"
							step="1"
							ticks="always"
							tick-size="4"
							prepend-icon="mdi-speedometer"
						>
							<template v-slot:append>
								<v-btn color="primary" x-small style="padding: 0px 5px" outlined
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
								<v-btn color="primary" x-small style="padding: 0px 5px" outlined
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
							v-model="volume"
							thumb-label
						>
							<template v-slot:append>
								<v-btn color="primary" x-small style="padding: 0px 5px" outlined
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
								<v-btn color="primary" x-small style="padding: 0px 5px" outlined
									>恢复默认</v-btn
								>
							</template></v-slider
						>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex md6 sm12>
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
		</v-layout>
	</v-container>
</template>

<script>
// import url from 'url';

export default {
	methods: {
		resetSpeed() {},
	},
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
			cardHeight: 450,
			counter: [
				v => {
					let sum = (this.numCharacters = v.length);
					return sum <= this.limit || this.$t('Word limit exceeded');
				},
			],
			limit: 200,
			numCharacters: 0,
			speed: 2,
			music_volume: 20,
			volume: 50,
			te: 50,
			speedArray: ['0.6', '0.8', '1.0', '1.2', '1.4'],
		};
	},
};
</script>
