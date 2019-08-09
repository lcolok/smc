/* eslint-disable no-console */
import { cutHTTP } from '@/utils/handle';
import AV from 'leancloud-storage';
import * as _ from 'lodash';
export default {
	MenuX: 500,
	MenuY: 500,
	showMenu: false,
	showMenuIndex: undefined,
	listItems: [
		{
			icon: 'mdi-clipboard-text',
			text: 'Share',
			showInSheet: true,
			name: 'copyBTN',
			action: async function({
				$event,
				$attrs,
				$copyText,
				$store,
				attachmentURL,
				title,
				suffix,
			}) {
				let selfMakeAttachmentURL = attachmentURL.replace(
					/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
					'https://dn-shimo-attachment.qbox.me/',
				);
				console.log(attachmentURL);
				console.log(selfMakeAttachmentURL);
				let descriptionList = $store.state.search.descriptionList;
				let shortURL = await AV.Cloud.run('shortenURL', {
					origURL: selfMakeAttachmentURL,
				});
				let emoji = _.has(descriptionList, suffix)
					? descriptionList[suffix].emoji
					: '❓';

				let copyContent = `${emoji} ${name || title} | ${cutHTTP(shortURL)}`;
				$copyText(copyContent)
					.then(e => {
						// alert('Copied');
						console.log(e);
					})
					.catch(e => {
						alert(`不能复制:${e}`);
						console.log(e);
					});
			},
		},
		{
			icon: 'mdi-download',
			text: 'Download',
			showInSheet: true,
			action: ({ $event, $attrs, $copyText, $store }) => {
				console.log($attrs);
				let downloadURL = `${$attrs.attachmentURL}?attname=${encodeURIComponent(
					$attrs.title,
				)}.${$attrs.suffix}&download`;
				console.log(downloadURL);
				window.location.href = downloadURL;
			},
		},
		/*      {
           icon: 'mdi-cloud-upload', text: '上传专用', showInSheet: true, action: () => {
        
           }
         },
        */

		{
			icon: 'mdi-rename-box',
			text: 'Rename',
			showInSheet: true,
			action: ({ $event, $attrs, $copyText, $store }) => {
				console.log($attrs);

				async function renameContent(currentVideo) {
					if (app.renameInput !== app.originalName) {
						let renameObject = AV.Object.createWithoutData(
							'ShimoBed',
							$attrs.objectId,
						);
						renameObject.set('name', app.renameInput);
						renameObject
							.save()
							.then(function(renameObject) {
								currentVideo.attributes.name = app.renameInput; //刷新在屏幕上显示的名称
								app.$message.success(
									`「${app.originalName}」已重命名为「${app.renameInput}」`,
								);
								// 成功保存之后，执行其他逻辑.
							})
							.catch(err => {
								app.$message.error(`发生错误:${err}`);
							});
						return;
					}
					console.log('名字没有更改');
				}
			},
		},
		{
			icon: 'mdi-comment-plus',
			text: 'Remarks',
			action: () => {},
		},
		{
			icon: 'mdi-link-box-variant-outline',
			text: 'Short URL',
			name: 'copyShortURL',
			action: ({ $event, $attrs, $copyText, $store }) => {
				console.log($attrs);
				$copyText($attrs.shortURL)
					.then(e => {
						// alert('Copied');
						console.log(e);
					})
					.catch(e => {
						alert('Can not copy');
						console.log(e);
					});
			},
		},
		{
			icon: 'mdi-link-variant',
			text: 'Long URL',
			name: 'copyLongURL',
			action: ({ $event, $attrs, $copyText, $store }) => {
				$copyText($attrs.attachmentURL)
					.then(e => {
						// alert('Copied');
						console.log(e);
					})
					.catch(e => {
						alert('Can not copy');
						console.log(e);
					});
			},
		},
		/*       {
            icon: 'mdi-egg-easter', text: '获取ID', name: 'getID', action: () => {
        
            }
          }, */
		{
			icon: 'mdi-delete',
			text: 'Delete',
			subheader: '敏感操作',
			action: ({ $event, $copyText, $store, $props, $attrs }) => {
				console.log({ $event, $copyText, $store, $props, $attrs });

				$store.state.dialog.tab = 'DeleteComfirm';
				$store.state.dialog.object = $attrs;
				$store.state.dialog.dialogModel = true;
			},
		},
	],
};
