<template>
	<div class="lyric">
		<!-- <audio id="audio" controls preload ref="audio" :src="src"></audio> -->
		<div class="lyric-content" ref="lyric">
			<div class="lyric-item-wrapper">
				<div
					:class="['lyric-item', { active: currentLineIndex === index }]"
					v-for="(item, index) in afterSegment"
					:key="index"
					@click="lyricClick(index)"
				>
					{{ item }}
				</div>
			</div>
			<!-- <div class="play-btn" @click="playClick">{{ playBtnText }}</div> -->
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
	props: {
		src: {
			type: String,
		},
	},
	data() {
		return {
			scroll: null,
			activeIndex: 0,
			playBtnText: '暂停',
		};
	},
	computed: {
		...mapGetters('tts', ['currentLineIndex', 'afterSegment']),
	},
	watch: {
		currentLineIndex(val) {
			// console.log(val);
			this.scrollAction(val);
			this.activeIndex = val;
		},
	},
	methods: {
		scrollAction(val) {
			this.scroll.scrollTo(0, -27 * val + 54, 500);
		},
		lyricScrollInit() {
			this.scroll = new BScroll(this.$refs.lyric);
			this.scrollAction(this.currentLineIndex);
		},
		playClick() {
			if (this.playBtnText === '暂停') {
				this.$refs.audio.pause();
				this.playBtnText = '播放';
			} else {
				this.$refs.audio.play();
				this.playBtnText = '暂停';
			}
		},
		...mapMutations('tts', ['lyricClick']),
	},
	mounted() {
		this.lyricScrollInit();
	},
};
</script>

<style lang="scss" scoped>
.lyric {
	.lyric-content {
		position: relative;
		height: 108px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		user-select: none;
		.lyric-item-wrapper {
			.lyric-item {
				color: #999;
				height: 27px;
				transition: all 0.5s;
				cursor: pointer;
				padding-left: 1em;
				&.active {
					color: #333;
				}
			}
		}
		.play-btn {
			position: absolute;
			right: 10px;
			top: 10px;
			color: #999;
			cursor: pointer;
			font-size: 14px;
			&:hover {
				color: #333;
			}
		}
	}
}
</style>
