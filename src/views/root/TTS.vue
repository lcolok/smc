<template>
	<v-card>
		<v-tabs background-color="white" :color="color" left>
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
											:elevation="hover ? 8 : 0"
											style="transition: box-shadow 0.2s ease-in-out;"
											class="ma-2"
											@click="toggle"
											max-width="150"
											min-height="150"
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
														:class="
															`d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text lighten-0`
														"
														:style="`height: 100%;background-color:${color}`"
													>
														<v-icon
															x-large
															color="white"
															style="position: absolute;bottom:10px;right:10px"
														>
															<!-- mdi-check-circle-outline -->
															mdi-check-circle
														</v-icon>
													</div>
												</v-expand-transition>
											</v-img>
											<!-- 
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
											</v-row> -->
										</v-card>
									</v-hover>
								</v-slide-item>
							</v-slide-group>

							<v-expand-transition>
								<v-sheet v-if="model != null" tile>
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
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
	methods: {
		...mapActions('tts', ['getSpeakerList']),
	},
	mounted() {
		this.getSpeakerList({ vm: this });
	},
	computed: {
		...mapGetters('tts', ['speakersList']),
		...mapState('app', ['color']),
	},
	data: () => ({
		model: null,
	}),
};
</script>
