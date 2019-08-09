<template>
	<div>
		<v-list dense two-line>
			<!-- <v-list-tile ripple>
				<v-list-tile-content>
					<v-list-tile-title class="font-weight-bold subheading"
						>{{ attrs.name }}
					</v-list-tile-title>

					<v-list-tile-sub-title class="caption font-weight-regular text--gray">
						{{ attrs.name_trans }}
					</v-list-tile-sub-title>
					<v-list-tile-sub-title class="caption font-weight-light">
						{{ prettyBytes(attrs.size) }}</v-list-tile-sub-title
					>
					<v-divider></v-divider>
				</v-list-tile-content>

				<v-list-tile-action>
					<v-btn icon text :ripple="false">
						<v-icon :style="style" color="grey darken-2" small
							>fas fa-caret-down</v-icon
						>
					</v-btn>
				</v-list-tile-action>
			</v-list-tile> -->

			<!-- <v-list-tile>
				<v-toolbar text class="transparent">
					<v-layout align-center v-bind="layoutAttributes" row fill-height />

					<div
						class="text-xs-center"
						v-for="rightClickMenuItem in bottomSheetToolbar"
						v-show="
							rightClickMenuItem.showInSheet ||
								$vuetify.breakpoint.name !== 'xs'
						"
						:key="bottomSheetToolbar.text"
					>
						<v-btn
							text
							fab
							@click="rightClickMenuItem.action(currentVideo, $event)"
							:id="rightClickMenuItem.text"
							:name="rightClickMenuItem.name"
						>
							<v-flex class="caption">
								<v-layout align-center justify-center column fill-height />
								<v-icon size="20">{{ rightClickMenuItem.icon }}</v-icon
								>{{ rightClickMenuItem.text }}
							</v-flex>
						</v-btn>
					</div>

					<div class="text-xs-center">
						<v-bottom-sheet v-model="moreBottomSheet" bottom left offset-y>
							<v-btn
								slot="activator"
								text
								fab
								@click="moreBTN.action($event)"
								:id="moreBTN.text"
								v-show="$vuetify.breakpoint.name == 'xs'"
							>
								<v-flex class="caption">
									<v-layout align-center justify-center column fill-height />
									<v-icon size="20">{{ moreBTN.icon }}</v-icon
									>{{ moreBTN.text }}
								</v-flex>
							</v-btn>

							<v-list>
								<template
									v-for="(menuItem, i) in bottomSheetToolbar"
									v-if="!menuItem.showInSheet"
								>
									<v-subheader v-if="menuItem.subheader" class="caption">{{
										menuItem.subheader
									}}</v-subheader>
									<v-divider v-if="menuItem.subheader" class="mx-3"></v-divider>
									<v-list-tile
										:name="menuItem.name"
										:id="menuItem.name"
										:objectID="currentVideo.id"
										:key="i"
										@click="
											menuItem.action(currentVideo, $event);
											moreBottomSheet = false;
										"
									>
										<v-list-tile-avatar>
											<v-icon>{{ menuItem.icon }}</v-icon>
										</v-list-tile-avatar>
										<v-list-tile-title>
											{{ menuItem.text }}
										</v-list-tile-title>
									</v-list-tile>
								</template>
							</v-list>
						</v-bottom-sheet>
					</div>
				</v-toolbar>
			</v-list-tile>

			<v-divider></v-divider>

			<v-expand-transition>


				<v-card text v-if="infoPanel" class="scrollContainer">
					<v-flex xs12>
						<v-layout
							v-scroll:#scroll-target=""
							ma-4
							column
							align-start
							justify-start
						/>
						<v-flex>
							创建时间:
							<v-card class="shadowChip" color="orange lighten-4">
								<v-flex mx-2>
									{{
										`${currentVideo.createdAt.toLocaleDateString()} ${currentVideo.createdAt.toLocaleTimeString()}`
									}}
								</v-flex>
							</v-card>
						</v-flex>

						<v-flex>
							修改时间:
							<v-card class="shadowChip" color="orange lighten-4">
								<v-flex mx-2>
									{{
										`${currentVideo.updatedAt.toLocaleDateString()} ${currentVideo.updatedAt.toLocaleTimeString()}`
									}}
								</v-flex>
							</v-card>
						</v-flex>

						<v-flex>
							文件后缀:
							<v-card class="shadowChip" color="orange lighten-4">
								<v-flex mx-2>{{ attrs.suffix }} </v-flex>
							</v-card>
						</v-flex>
						<v-flex>
							文件体积:
							<v-card class="shadowChip" color="primary lighten-4">
								<v-flex mx-2
									>{{ prettyBytes(attrs.size) }}
								</v-flex>
							</v-card>
						</v-flex>
					</v-flex>
				</v-card>
			</v-expand-transition>

			<v-fade-transition>
				<v-divider v-if="infoPanel"></v-divider>
			</v-fade-transition> -->
		</v-list>
	</div>
</template>

<script>
import prettyBytes from 'pretty-bytes';

export default {
	props: {
		attrs: {
			type: Object,
			required: true,
		},
	},
	methods: {
		prettyBytes,
		style() {
			return { transform: 'rotate(' + this.arrowDegree / 360 + 'turn)' };
		},
	},
};
</script>

<style lang="scss" scoped></style>
