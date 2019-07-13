<template>
	<div id="file-pond">
		<file-pond
			name="test"
			ref="pond"
			:label-idle="
				`${$t(
					'Drag & Drop your files or',
				)} <span class='filepond--label-action'> ${$t('Browse')} </span>`
			"
			allow-multiple="true"
			v-bind="[$attrs, config, i18n, setOptions, serverOptions]"
			@init="handleFilePondInit"
			@processfile="$props.uploadedCallBack"
		/>
	</div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
import AV from 'leancloud-storage';
import * as qiniu from 'qiniu-js';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import { log } from 'util';

// Create component
const FilePond = vueFilePond(
	FilePondPluginFileValidateType,
	FilePondPluginImagePreview,
	FilePondPluginFileRename,
);

// console.log(FilePond);

export default {
	name: 'app',
	props: {
		uploadedCallBack: {
			//定义一个外来方法
			type: Function, //参数类型：函数
			required: true, //是否必填：是
		},
	},
	data: function() {
		return {
			config: {
				dropOnPage: true,
			},
			serverOptions: {
				server: {
					process: async (
						fieldName,
						file,
						metadata,
						load,
						error,
						progress,
						abort,
					) => {
						// console.log(file);

						let QJ = await AV.Cloud.run('getQiniuJSON', {
							fileNameArr: [file.name],
						});

						console.log(QJ);

						let observer = {
							next(res) {
								let e = res.total;
								// console.log(e);
								progress(true, e.loaded, e.size);
							},
							error(err) {
								console.error(err);
								error(err);
							},
							complete(res) {
								console.log(res);
								if (res.code == 0) {
									//原石墨床上传后的登记处理
									// let json = res;
									// // console.log(json);
									// let filename = file.name;

									// let arr = filename.split('.');
									// let suffix = arr.pop();
									// let realName = arr.join('.');

									// json.data.suffix = suffix;
									// json.data.name = realName;

									// AV.Cloud.run('updateShimo', json);

									//完成后应调用load方法，并传递返回的服务器文件id
									//该服务器文件id随后在恢复或恢复文件时使用
									//这样，您的服务器就知道返回哪个文件，而无需向客户端公开该信息

									file.qiniu = res;
									load(res); //完成后，应该用文件对象或blob调用load方法 load方法接受字符串(id)或对象
								}
							},
						};

						let putExtra = {
							fname: '', //fname: string，文件原文件名
							params: {}, //params: object，用来放置自定义变量
							mimeType: null, //mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里：["image/png", "image/jpeg", "image/gif"]
						};

						let config = {
							// useCdnDomain: true,//表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。（感觉开启了之后，上传的速度更慢了）
							concurrentRequestLimit: 9, //分片上传的并发请求量，number，默认为3；因为浏览器本身也会限制最大并发量，所以最大并发量与浏览器有关。
						};

						let observable = qiniu.upload(
							file,
							QJ[0].key,
							QJ[0].token,
							putExtra,
							config,
						);
						let subscription = observable.subscribe(observer); // 上传开始
						// or
						//   let subscription = observable.subscribe(next, error, complete); // 这样传参形式也可以

						return {
							abort: () => {
								// 如果用户点击了取消按钮，则进入该功能
								subscription.unsubscribe(); // 上传取消

								//让filepond知道请求已被取消
								abort();
							},
						};
					},
				},
			},
			setOptions: {
				fileRenameFunction: file => {
					function rename(origName) {
						return window.prompt('Enter new filename', origName) || origName;
					}

					function fileNameCheck(name) {
						console.log(name);
						if (!name.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/gi)) {
							return name;
						} else {
							return fileNameCheck(rename(name));
						}
					}

					return new Promise(resolve => {
						resolve(fileNameCheck(file.name));
					});
				},
			},
			i18n: {
				//以下为本地化
				labelIdle:
					'拖放文件于此或者<span class="filepond--label-action"> 浏览本地 </span>',
				labelFileTypeNotAllowed: '文件类型不符合',
				fileValidateTypeLabelExpectedTypes:
					'除了 {allButLastType} 或者 {lastType}',
				labelInvalidField: '字段包含无效文件',
				labelFileWaitingForSize: '正在计算大小',
				labelFileSizeNotAvailable: '未知大小',
				labelFileLoading: '载入中',
				labelFileLoadError: '加载出错',
				labelFileProcessing: '上传中',
				labelFileProcessingComplete: '上传完成',
				labelFileProcessingAborted: '上传已取消',
				labelFileProcessingError: '上传时出错',
				labelFileProcessingRevertError: '还原时出错',
				labelFileRemoveError: '删除时出错',
				labelTapToCancel: '点击取消',
				labelTapToRetry: '点击重试',
				labelTapToUndo: '点击撤回',
				labelButtonRemoveItem: '移除',
				labelButtonAbortItemLoad: '中止',
				labelButtonRetryItemLoad: '重试',
				labelButtonAbortItemProcessing: '取消',
				labelButtonUndoItemProcessing: '撤回',
				labelButtonRetryItemProcessing: '重试',
				labelButtonProcessItem: '上传',
			},
		};
	},
	methods: {
		handleFilePondInit: function() {
			console.log('FilePond has initialized');

			// FilePond instance methods are available on `this.$refs.pond`
		},
	},
	components: {
		FilePond,
	},
};
</script>
