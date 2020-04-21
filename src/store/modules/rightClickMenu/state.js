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
			action: ({ $copyText, $store, attachmentURL, title, suffix, $attrs }) => {
				let shortURL = $attrs.shortURL;
				if (shortURL) {
					copy(shortURL);
					return;
				}

				let selfMakeAttachmentURL = attachmentURL;
				// .replace(
				// 	/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
				// 	'https://dn-shimo-attachment.qbox.me/',
				// );
				AV.Cloud.run('shortenURL', {
					origURL: selfMakeAttachmentURL,
				}).then(shortURL => {
					copy(shortURL);
				});

				function ckeckBrowerVersion(macHandle, winHandle) {
					let version = navigator.userAgent.toLowerCase();
					let mac = version.indexOf('mac');
					let os = version.indexOf('os');

					if (mac > 0 && os > 0) {
						// 苹果系统下执行的操作
						console.log(version);
						return macHandle;
					} else {
						// windows系统下执行的操作
						return winHandle;
					}
				}

				function copy(shortURL) {
					let descriptionList = $store.state.search.descriptionList;

					let emoji = _.has(descriptionList, suffix)
						? descriptionList[suffix].emoji
						: '❓';

					let copyContent = ckeckBrowerVersion(
						`${emoji} ${title} | ${cutHTTP(shortURL)}`,
						`${title} | ${cutHTTP(shortURL)}`,
					);
					$copyText(copyContent)
						.then(e => {
							// alert('Copied');
							console.log(e);
						})
						.catch(e => {
							alert(JSON.stringify(e));
							console.log(e);
						});
				}
			},
		},
		{
			icon: 'mdi-download',
			text: 'Download',
			showInSheet: true,
			action: ({ attachmentURL, title, suffix }) => {
				let downloadURL = `${attachmentURL}?attname=${encodeURIComponent(
					title,
				)}.${suffix}&download`;
				console.log(downloadURL);
				window.location.href = downloadURL;
			},
		},
		{
			icon: 'mdi-rename-box',
			text: 'Rename',
			showInSheet: true,
			action: ({ $attrs }) => {
				console.log($attrs);
				let origName = $attrs.name;
				let renameInput =
					window.prompt('Enter new filename', origName) || origName;

				if (renameInput !== origName) {
					const renameObject = AV.Object.createWithoutData(
						'newShimoBed',
						$attrs.objectId,
					);

					AV.Cloud.run('googleTranslateByPost', {
						orig: renameInput.toLowerCase(),
					}).then(name_trans => {
						renameObject.set('name_trans', name_trans);
						renameObject
							.save()
							.then(function(renameObject) {
								// 成功保存之后，执行其他逻辑.
								console.log(`翻译成功:${name_trans}`);
							})
							.catch(err => {
								console.error(`发生错误:${err}`);
							});
					});

					renameObject.set('name', renameInput);
					renameObject
						.save()
						.then(function(renameObject) {
							// 成功保存之后，执行其他逻辑.
							console.log(`「${origName}」已重命名为「${renameInput}」`);
						})
						.catch(err => {
							console.error(`发生错误:${err}`);
						});
					return;
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
			action: ({ $attrs, $copyText }) => {
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
			action: ({ $copyText, attachmentURL }) => {
				let selfMakeAttachmentURL = attachmentURL;
				// .replace(
				// 	/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
				// 	'https://dn-shimo-attachment.qbox.me/',
				// );
				$copyText(selfMakeAttachmentURL)
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
