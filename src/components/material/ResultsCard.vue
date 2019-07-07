<template>
	<v-layout row>
		<v-flex>
			<v-card hover>
				<v-expand-transition>
					<v-img
						v-if="picPath"
						:src="picPath"
						:height="picHeight"
						@error="picPath = unknown_bg_src"
					>
						<v-container>
							<!--               <v-flex>
                <div>
                  <div>
                    <v-icon color="white">mdi-library-video</v-icon>
                  </div>
                  <span class="caption white--text">视频</span>
                </div>
              </v-flex>-->
							<v-flex class="caption white--text" style="position:absolute;">
								<v-layout align-center justify-start row fill-height>
									<v-icon size="18" color="white">{{ icon }}</v-icon>
									<v-flex>{{ typeName }}</v-flex>
								</v-layout>
							</v-flex>
						</v-container>

						<v-img
							:src="abovePicPath"
							:style="aboveStyle"
							@error="abovePicPath = unknown_text_src"
						></v-img>
					</v-img>
				</v-expand-transition>

				<v-card-title primary-title>
					<div>
						<div class="headline">{{ title }}</div>
						<span class="grey--text">{{ subTitle }}</span>
					</div>
				</v-card-title>

				<v-card-actions>
					<v-btn flat color="primary">Share</v-btn>
					<v-btn color="primary">Explore</v-btn>
					<v-spacer></v-spacer>
					<v-btn icon @click="show = !show" flat color="primary">
						<v-icon>
							{{
								show ? 'mdi-arrow-up-drop-circle' : 'mdi-arrow-down-drop-circle'
							}}
						</v-icon>
					</v-btn>
				</v-card-actions>

				<v-expand-transition>
					<v-card-text v-show="show">
						I'm a thing. But, like most politicians, he promised more than he
						could deliver. You won't have time for sleeping, soldier, not with
						all the bed making you'll be doing. Then we'll go with that data
						file! Hey, you add a one and two zeros to that or we walk! You're
						going to do his laundry? I've got to find a way to escape.
					</v-card-text>
				</v-expand-transition>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import Card from './Card';
import { mapState, mapGetters } from 'vuex';

export default {
	data: () => ({
		show: false,
		abovePicPath: '',
		picPath: '',
		picHeight: 200,
		unknown_bg_src: require('@/assets/img/placeholder/file_cover_bg_unknown@2x.png'),
		unknown_text_src: require('@/assets/img/placeholder/file_cover_name_unknown@2x.png'),
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
		icon() {
			return this.thisDescriptionList.icon;
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
			return `width: ${width}px;margin-top:35px; margin-left: auto; margin-right: auto;`;
		},
	},
	created: async function() {
		// console.log(this.suffixList);
		let srcURL = this.attachmentsURL || this.uploaderURL;
		switch (this.typeName) {
			case '视频':
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
				this.picPath = srcURL + '?imageslim';
				break;
			default:
				let cover_name = this.placeholderName;

				this.abovePicPath = require(`@/assets/img/placeholder/file_cover_name_${cover_name}@2x.png`);
				this.picPath = require(`@/assets/img/placeholder/file_cover_bg_${cover_name}@2x.png`);
				break;
		}
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
		attachmentsURL: {
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
	},
};
</script>

<style lang="scss">
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
