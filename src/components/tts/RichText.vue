<template>
	<div class="editor">
		<editor-content class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import txtsegment from '../../../api/xunfei/txtsegment';
import hash from 'object-hash';
import TextHighlight from 'vue-text-highlight';
import Icon from './components/Icon';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
	Blockquote,
	CodeBlock,
	HardBreak,
	Heading,
	HorizontalRule,
	OrderedList,
	BulletList,
	ListItem,
	TodoItem,
	TodoList,
	Bold,
	Code,
	Italic,
	Link,
	Strike,
	Underline,
	History,
	Focus,
} from 'tiptap-extensions';
import { mapMutations, mapState } from 'vuex';
export default {
	components: {
		EditorContent,
		EditorMenuBar,
		Icon,
		TextHighlight,
	},
	data() {
		return {
			editor: new Editor({
				extensions: [
					// new Blockquote(),
					// new BulletList(),
					// new CodeBlock(),
					// new HardBreak(),
					// new Heading({ levels: [1, 2, 3] }),
					// new HorizontalRule(),
					// new ListItem(),
					// new OrderedList(),
					// new TodoItem(),
					// new TodoList(),
					// new Link(),
					// new Bold(),
					// new Code(),
					// new Italic(),
					// new Strike(),
					// new Underline(),
					new History(),
					new Focus({
						className: 'has-focus',
						// nested: true,
					}),
				],
				autoFocus: true,
				content: `
科大讯飞股份有限公司（IFLYTEK CO.,LTD.），前身安徽中科大讯飞信息科技有限公司，公司总部在合肥，成立于1999年12月30日，2014年4月18日变更为科大讯飞股份有限公司 [1-2]  ，专业从事智能语音及语言技术研究、软件及芯片产品开发、语音信息服务及电子政务系统集成 [3]  。拥有灵犀语音助手 [4-5]  ，讯飞输入法 [6]  等优秀产品。
科大讯飞信息科技股份有限公司现任董事长兼总裁为刘庆峰先生。科大讯飞信息科技股份有限公司是一家专业从事智能语音及语音技术研究、软件及芯片产品开发、语音信息服务的国家级骨干软件企业，主要股东包括：中国移动、中科大资产经营有限公司、上海广信、联想投资、盈富泰克等。语音技术实现了人机语音交互，使人与机器之间沟通变得像人与人沟通一样简单。语音技术主要包括语音合成和语音识别两项关键技术。让机器说话，用的是语音合成技术；让机器听懂人说话，用的是语音识别技术。此外，语音技术还包括语音编码、音色转换、口语评测、语音消噪和增强等技术，有着广阔应用空间。2017年6月，入选《麻省理工科技评论》2017 年度全球 50 大最聪明公司”榜单。 [7]  2017年11月9日，科大讯飞年度发布会在北京召开。从教育到医疗，从客服到智能家居，再到移动手机端和车载环境，在2017年的年度发布会上，科大讯飞一口气发布了多个领域里10款以上的人工智能产品。 [8]
        `,
				onUpdate: ({ state, getHTML, getJSON, transaction }) => {
					let json = getJSON();
					if (hash.MD5(json) == this.segmentMD5) return;

					function getPlainText(i) {
						let arr = [];
						main(arr, i);
						return arr.join('');
						function main(arr, i) {
							if (i.type == 'text') {
								arr.push(i.text);
							} else if (i.type == 'paragraph' || i.type == 'doc') {
								if (!i.content) return;
								i.content.forEach(j => {
									main(arr, j);
								});
							}
						}
					}

					const plainText = getPlainText(json);
					const segment = txtsegment(plainText);

					function arrayToProsemirror(arr) {
						let content = [];
						arr.forEach(text => {
							content.push({
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text,
									},
								],
							});
						});
						return {
							type: 'doc',
							content,
						};
					}
					const newJSON = arrayToProsemirror(segment);

					this.setSegmentMD5(hash.MD5(newJSON));

					const { selection } = this.editor;
					const { from, to } = selection;
					const text = state.doc.textBetween(from, to, ' ');
					const diff = state.selection.anchor - this.anchor;
					console.log(diff);
					this.setAnchor(state.selection.anchor);
					this.editor.setContent(newJSON);
					let fix;
					if (diff == -2) {
						fix = 2;
					} else if (diff == 2) {
						fix = -2;
					} else {
						fix = 0;
					}
					this.editor.setSelection(this.anchor + fix, this.anchor + fix);
					this.editor.focus();
				},
				onTransaction: ({ state }) => {
					// this.setAnchor(state.selection.anchor);
					console.log(state.selection.anchor);
				},
				editorProps: {
					handlePaste: val => {
						// console.log(val);
						// console.log(`Some new content was added from the user's clipboard`);
					},
					handleClickOn: (view, pos, node, nodePos, event, direct) => {
						// console.log(pos);
						// console.log(nodePos);
						// console.log('按了这个');
					},
				},
			}),

			json: 'Update content to see changes',
			html: 'Update content to see changes',
		};
	},
	computed: {
		...mapState('tts', ['segmentMD5', 'anchor']),
	},
	methods: {
		...mapMutations('tts', ['setSegmentMD5', 'setAnchor']),
	},
	beforeDestroy() {
		this.editor.destroy();
	},
};
</script>

<style lang="scss">
// @import '~variables';

$color-black: #1e1e1e;
.has-focus {
	border-radius: 3px;
	box-shadow: 0 0 0 3px #3ea4ffe6;
}
</style>
