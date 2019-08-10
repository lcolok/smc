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
			action: ({ $copyText, $store, attachmentURL, title, suffix }) => {
				let descriptionList = $store.state.search.descriptionList;
				let selfMakeAttachmentURL = attachmentURL.replace(
					/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
					'https://dn-shimo-attachment.qbox.me/',
				);
				AV.Cloud.run('shortenURL', {
					origURL: selfMakeAttachmentURL,
				}).then(shortURL => {
					let emoji = _.has(descriptionList, suffix)
						? descriptionList[suffix].emoji
						: '❓';

					let copyContent = `${emoji} ${title} | ${cutHTTP(shortURL)}`;
					$copyText(copyContent)
						.then(e => {
							// alert('Copied');
							console.log(e);
						})
						.catch(e => {
							alert(JSON.stringify(e));
							console.log(e);
						});
				});
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
				let selfMakeAttachmentURL = attachmentURL.replace(
					/http(s?):\/\/(attachments-cdn\.shimo\.im)\//i,
					'https://dn-shimo-attachment.qbox.me/',
				);
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
