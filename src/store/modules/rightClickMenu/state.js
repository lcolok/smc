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
			action: ({ $event, details: d, $copyText, $store }) => {
				//$store._vm.$copyText 也能读取到 copyText
				let copyContent = '';
				let descriptionList = $store.state.search.descriptionList;

				let emoji = _.has(descriptionList, d.suffix)
					? descriptionList[d.suffix].emoji
					: '❓';

				copyContent = `${emoji} ${d.name} | ${cutHTTP(d.shortURL)}`;

				console.log(copyContent);

				$copyText(copyContent)
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
			icon: 'mdi-download',
			text: 'Download',
			showInSheet: true,
			action: ({ $event, details: d, $copyText, $store }) => {
				console.log(d);
				let downloadURL = `${d.attachmentURL}?attname=${encodeURIComponent(
					d.title,
				)}.${d.suffix}&download`;
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
			action: ({ $event, details: d, $copyText, $store }) => {
				console.log(d);

				async function renameContent(currentVideo) {
					if (app.renameInput !== app.originalName) {
						let renameObject = AV.Object.createWithoutData(
							'ShimoBed',
							d.objectId,
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
			action: ({ $event, details: d, $copyText, $store }) => {
				$copyText(d.shortURL)
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
			action: ({ $event, details: d, $copyText, $store }) => {
				$copyText(d.attachmentURL)
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
			action: deleteOjbect => {
				app.deleteOjbect = deleteOjbect;
				app.deleteConfirmDialog = true;
			},
		},
	],
};
