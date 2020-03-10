<template>
	<v-card outlined tile class="ma-2 pa-2 grey lighten-5" :height="cardHeight">
		<v-col align="center" justify="center">
			<v-textarea
				no-resize
				outlined
				name="input-7-4"
				:label="`${$t('Number of characters: ')}${totalWord}/${limit}`"
				:height="cardHeight - 60"
				autofocus
				:rules="counter"
				v-model="content"
			></v-textarea>
		</v-col>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	created() {
		this.content = `科大讯飞股份有限公司（IFLYTEK CO.,LTD.），前身安徽中科大讯飞信息科技有限公司，公司总部在合肥，成立于1999年12月30日，2014年4月18日变更为科大讯飞股份有限公司 [1-2]  ，专业从事智能语音及语言技术研究、软件及芯片产品开发、语音信息服务及电子政务系统集成 [3]  。拥有灵犀语音助手 [4-5]  ，讯飞输入法 [6]  等优秀产品。
科大讯飞信息科技股份有限公司现任董事长兼总裁为刘庆峰先生。科大讯飞信息科技股份有限公司是一家专业从事智能语音及语音技术研究、软件及芯片产品开发、语音信息服务的国家级骨干软件企业，主要股东包括：中国移动、中科大资产经营有限公司、上海广信、联想投资、盈富泰克等。语音技术实现了人机语音交互，使人与机器之间沟通变得像人与人沟通一样简单。语音技术主要包括语音合成和语音识别两项关键技术。让机器说话，用的是语音合成技术；让机器听懂人说话，用的是语音识别技术。此外，语音技术还包括语音编码、音色转换、口语评测、语音消噪和增强等技术，有着广阔应用空间。2017年6月，入选《麻省理工科技评论》2017 年度全球 50 大最聪明公司”榜单。 [7]  2017年11月9日，科大讯飞年度发布会在北京召开。从教育到医疗，从客服到智能家居，再到移动手机端和车载环境，在2017年的年度发布会上，科大讯飞一口气发布了多个领域里10款以上的人工智能产品。 [8]`;
	},
	computed: {
		...mapGetters('tts', ['totalWord']),
		content: {
			set(val) {
				this.$store.state.tts.content = val;
			},
			get() {
				return this.$store.state.tts.content;
			},
		},
	},
	data: () => ({
		cardHeight: 450,
		counter: [
			value => this.totalWord <= this.limit || this.$t('Word limit exceeded'),
		],
		limit: 20000,
	}),
};
</script>
