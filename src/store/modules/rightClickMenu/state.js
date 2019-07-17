import { cutHTTP } from '@/utils/handle';

export default {
	MenuX: 500,
	MenuY: 500,
	showMenu: false,
	showMenuIndex: undefined,
	listItems: [
		{
			icon: 'mdi-clipboard-text',
			text: '复制短链',
			showInSheet: true,
			name: 'copyBTN',
			action: ({ $event, details: d, $copyText, $store }) => {
				//$store._vm.$copyText 也能读取到 copyText
				let copyContent = '';
				let descriptionList = $store.state.search.descriptionList;
				let emoji = descriptionList[d.suffix].emoji;

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
			text: '直接下载',
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
			text: '重命名',
			showInSheet: true,
			action: ({ $event, details: d, $copyText, $store }) => {},
		},
		{
			icon: 'mdi-comment-plus',
			text: '备注',
			action: () => {},
		},
		{
			icon: 'mdi-link-box-variant-outline',
			text: '纯短链',
			name: 'copyShortURL',
			action: () => {},
		},
		{
			icon: 'mdi-link-variant',
			text: '纯长链',
			name: 'copyLongURL',
			action: () => {},
		},
		/*       {
            icon: 'mdi-egg-easter', text: '获取ID', name: 'getID', action: () => {
        
            }
          }, */
		{
			icon: 'mdi-delete',
			text: '删除该项',
			subheader: '敏感操作',
			action: deleteOjbect => {
				app.deleteOjbect = deleteOjbect;
				app.deleteConfirmDialog = true;
			},
		},
	],
};
