<template>
	<v-card>
		<v-tabs background-color="white" color="deep-purple accent-4" left>
			<v-tab v-for="item in speakersList" :key="item.tab">
				{{ item.tab }}
			</v-tab>

			<v-tab-item v-for="item in speakersList" :key="item.tab">
				<v-container fluid>
					<v-row>
						<!-- <v-sheet class="mx-auto" elevation="8" max-width="800"> -->
						<v-col>
							<v-slide-group
								v-model="model"
								class="pa-4"
								show-arrows
								center-active
							>
								<v-slide-item
									v-for="n in item.list"
									:key="n.speaker_no"
									v-slot:default="{ active, toggle }"
								>
									<v-hover v-slot:default="{ hover }">
										<v-card
											:elevation="hover ? 12 : 2"
											class="ma-4"
											height="250"
											width="250"
											@click="toggle"
										>
											<v-img
												:lazy-src="
													`https://attachments-cdn.shimo.im/nnMHaMAvXkoolrY1/default.jpg?imageView2/4/w/50/h/50`
												"
												:src="n.img_url"
												class="white--text align-end"
												gradient="0deg, rgba(0,0,0,0.5634628851540616) 0%, rgba(0,0,0,0.2553396358543417) 10%, rgba(0,0,0,0) 25%, rgba(255,255,255,0) 100%"
											>
												<v-card-title v-text="n.speaker_name"></v-card-title>
												<v-expand-transition>
													<div
														v-if="active"
														class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
														style="height: 100%;"
													>
														选中
													</div>
												</v-expand-transition>
											</v-img>

											<v-row
												class="fill-height"
												align="center"
												justify="center"
											>
												<v-scale-transition>
													<v-icon
														v-if="active"
														color="white"
														size="48"
														v-text="'mdi-close-circle-outline'"
													></v-icon>
												</v-scale-transition>
											</v-row>
										</v-card>
									</v-hover>
								</v-slide-item>
							</v-slide-group>

							<v-expand-transition>
								<v-sheet
									v-if="model != null"
									color="grey lighten-4"
									height="200"
									tile
								>
									<tts-sheet :speaker="item.list[model]" />
								</v-sheet>
							</v-expand-transition>
						</v-col>
						<!-- </v-sheet> -->
						<!-- <v-col v-for="i in 12" :key="i" cols="4" md="2">
							<v-img
								:src="
									`https://picsum.photos/500/300?image=${i * (n + 1) * 5 + 10}`
								"
								:lazy-src="
									`https://picsum.photos/10/6?image=${i * (n + 1) * 5 + 10}`
								"
								aspect-ratio="1"
							></v-img>
						</v-col> -->
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<style scoped>
.v-card--reveal {
	align-items: center;
	bottom: 0;
	justify-content: center;
	opacity: 0.5;
	position: absolute;
	width: 100%;
}

.v-card {
	transition: opacity 0.4s ease-in-out;
}

.show-btns {
	color: rgba(255, 255, 255, 1) !important;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	methods: {
		...mapActions('tts', ['getSpeakerList']),
	},
	mounted() {
		this.getSpeakerList({ vm: this });
	},
	computed: {
		...mapGetters('tts', ['speakersList']),
	},
	data: () => ({
		model: null,
	}),
};
</script>
