<template>
	<v-layout row>
		<material-right-click-menu v-bind="[$attrs, $props]" />

		<v-flex>
			<v-hover v-slot:default="{ hover }">
				<v-card hover @contextmenu="rightClick({ index, $event })">
					<!-- <v-expand-transition> -->
					<v-fade-transition>
						<v-img
							v-if="picPath"
							:src="picPath"
							:height="picHeight"
							@error="picPath = unknown_bg_src"
							@load="loaded"
							@click="hover || leftClick({ $event, $attrs, $props, typeName })"
						>
							<div class=" caption font-weight-800 white--text">
								<v-expand-transition>
									<div
										v-if="$vuetify.breakpoint.mdAndUp && hover"
										class="d-flex transition-fast-in-fast-out black v-card--reveal "
										style="height: 100%;"
									>
										<base-control-bar v-bind="[$props]" />
										<base-file-details v-bind="[$props]" />
									</div>
									<div v-else-if="!$vuetify.breakpoint.mdAndUp">
										<base-file-details v-bind="[$props]" />
									</div>
								</v-expand-transition>
							</div>

							<lottie-loading v-if="lottieLoading" />
							<div :class="!rawPreview || 'fill-height bottom-gradient'">
								<v-img
									v-if="abovePicPath"
									:src="abovePicPath"
									:style="aboveStyle"
									class="above_pic"
									@error="abovePicPath = unknown_text_src"
								></v-img>
							</div>
						</v-img>
					</v-fade-transition>
					<!-- </v-expand-transition> -->

					<v-card-text
						primary-title
						@click="hover || leftClick({ $event, $attrs, $props, typeName })"
					>
						<span class="text--primary">
							<span>{{ title }}</span
							><br />
							<!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
						</span>
						<span>{{ subTitle }}</span
						><br />
					</v-card-text>

					<v-card-actions v-if="$vuetify.breakpoint.smAndDown">
						<!-- <v-btn text color="primary">Share</v-btn>
						<v-btn color="primary">Explore</v-btn> -->
						<v-spacer></v-spacer>
						<v-btn icon @click="rightClick({ index, $event })">
							<v-icon color="primary">mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-hover>
		</v-flex>
	</v-layout>
</template>

<script>
import Card from './Card';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	data: () => ({
		// show: false,

		lottieLoading: true,
		abovePicPath: '',
		picPath: '',
		picHeight: 200,
		unknown_bg_src: require('@/assets/img/placeholder/file_cover_bg_unknown@2x.png'),
		unknown_text_src: require('@/assets/img/placeholder/file_cover_name_unknown@2x.png'),
		rawPreview: false,
		// type:'',
		// icon:'',
	}),
	inheritAttrs: false,
	computed: {
		...mapState('search', [
			'fileDescription',
			'unknownDescription',
			'suffixList',
			'placeholderList',
			'descriptionList',
		]),
		...mapGetters('search', []),
		thisDescriptionList() {
			return this.descriptionList[this.suffix] || this.unknownDescription;
		},
		typeName() {
			return this.thisDescriptionList.typeName;
		},

		thisPlaceholderList() {
			return (
				this.placeholderList[this.suffix] || { name: 'unknown', width: 230 } //如果该后缀能不够匹配对应的placeholder类型,就会赋值默认的unknown图
			);
		},
		placeholderName() {
			return this.thisPlaceholderList.name;
		},
		aboveStyle() {
			let width = this.thisPlaceholderList.width;
			return `width: ${width}px;`;
		},
	},
	created() {
		this.updatePic();
	},
	methods: {
		...mapActions('rightClickMenu', ['rightClick']),
		...mapActions('preview', ['leftClick']),
		loaded() {
			this.lottieLoading = false;
		},
		updatePic: async function() {
			// console.log(this.suffixList);
			this.abovePicPath = '';
			this.picPath = '';

			let srcURL = this.attachmentURL;

			if (
				srcURL.match(
					/(attachments-cdn\.shimo\.im)\/([a-z0-9]{16,})\/([\S]+)\?/i, //去掉参数部分
				)
			) {
				srcURL = srcURL.split('?')[0];
			}

			switch (this.typeName) {
				case '视频':
					this.rawPreview = true;
					await this.$http.get(srcURL + '?avinfo').then(resp => {
						let height = resp.data.streams[0].height;
						let width = resp.data.streams[0].width;
						let ratio = width / height;
						let fixedWidth = this.picHeight * ratio;
						// console.log({ height, width, ratio, fixedWidth });
						let offset = this.offset || resp.data.format.duration * 0.618; //默认的截图位置是视频片段的黄金分割位置,如果有指定的offset时间，则采用offset的时间
						this.picPath = srcURL + `?vframe/png/offset/${offset}/w/500`;
					});
					break;
				case '图片':
					this.rawPreview = true;
					this.picPath = srcURL + '?imageslim';
					break;
				default:
					let cover_name = this.placeholderName;

					this.abovePicPath = require(`@/assets/img/placeholder/file_cover_name_${cover_name}@2x.png`);
					this.picPath = require(`@/assets/img/placeholder/file_cover_bg_${cover_name}@2x.png`);
					break;
			}
		},
	},

	props: {
		...Card.props,
		/* icon: {
			type: String,
			required: true,
		}, */
		subIcon: {
			type: String,
			default: undefined,
		},
		subIconColor: {
			type: String,
			default: undefined,
		},
		subTextColor: {
			type: String,
			default: undefined,
		},
		subText: {
			type: String,
			default: undefined,
		},
		title: {
			type: String,
			default: undefined,
		},
		subTitle: {
			type: String,
			default: undefined,
		},
		value: {
			type: String,
			default: undefined,
		},
		smallValue: {
			type: String,
			default: undefined,
		},
		attachmentURL: {
			type: String,
			default: undefined,
		},
		uploaderURL: {
			type: String,
			default: undefined,
		},
		duration: {
			type: Number,
			default: undefined,
		},
		offset: {
			type: Number,
			default: undefined,
		},
		suffix: {
			type: String,
			default: undefined,
		},
		size: {
			type: Number,
			default: undefined,
		},
		index: {
			type: Number,
			default: undefined,
		},
	},
};
</script>

<style lang="scss" scoped>
.above_pic {
	margin-top: 80px;
	margin-left: auto;
	margin-right: auto;
}
.show-btns {
	color: rgba(255, 255, 255, 1) !important;
}
.v-card--reveal {
	align-items: center;
	bottom: 0;
	justify-content: center;
	opacity: 0.5;
	position: absolute;
	width: 100%;
	z-index: 1;
}

.bottom-gradient {
	background-image: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.4) 0%,
		transparent 25%
	);
}

.repeating-gradient {
	background-image: repeating-linear-gradient(
		-45deg,
		rgba(255, 0, 0, 0.25),
		rgba(255, 0, 0, 0.25) 5px,
		rgba(0, 0, 255, 0.25) 5px,
		rgba(0, 0, 255, 0.25) 10px
	);
}

.v-card--material-results {
	display: flex;
	flex-wrap: wrap;
	position: relative;

	.v-result {
		display: inline-block;
		flex: 0 1;
		margin-top: 0;
		margin-left: 0;
		margin-right: auto;
		margin-bottom: 0 !important;
		max-width: auto;
		padding: 0 16px 0;
	}

	.v-card {
		border-radius: 4px;
		flex: 0 1 auto;
	}

	.v-card__text {
		display: inline-block;
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
	}

	.v-card__actions {
		flex: 1 0 100%;
	}
}
</style>
