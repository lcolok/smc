<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-expand-transition>
          <v-img v-if="picPath" :src="picPath" :height="picHeight"></v-img>
        </v-expand-transition>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{title}}</div>
            <span class="grey--text">{{subTitle}}</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="primary">Share</v-btn>
          <v-btn color="primary">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show" flat color="primary">
            <v-icon>{{ show ? 'mdi-arrow-up-drop-circle' : 'mdi-arrow-down-drop-circle' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card-text
            v-show="show"
          >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </v-expand-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Card from './Card';

export default {
	data: () => ({
		show: false,
		picPath: '',
		picHeight:200
	}),
	inheritAttrs: false,

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
	computed: {},
	created: async function() {
		if (this.suffix.match(/mp4/i)) {
			await this.$http.get(this.attachmentsURL + '?avinfo').then(resp => {
				let height = resp.data.streams[0].height;
				let width = resp.data.streams[0].width;
				let ratio = width/height;
				let fixedWidth = this.picHeight*ratio;
				console.log({height,width,ratio,fixedWidth});
				let offset = this.offset || resp.data.format.duration * 0.618; //默认的截图位置是视频片段的黄金分割位置,如果有指定的offset时间，则采用offset的时间
				this.picPath = this.attachmentsURL + `?vframe/png/offset/${offset}/w/500`;
			});
		} else if (this.attachmentsURL.match(/jpg|png/i)) {
			this.picPath = this.attachmentsURL + '?imageslim';
		}
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
