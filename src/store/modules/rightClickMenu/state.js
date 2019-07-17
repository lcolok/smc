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
			action: ({ $event, details, $copyText, $store }) => {
				// console.log({ $event, details, $copyText });
				console.log($store._vm.$copyText);
				$copyText(details.shortURL).then(
					function(e) {
						// alert('Copied');
						console.log(e);
					},
					function(e) {
						alert('Can not copy');
						console.log(e);
					},
				);

				// dispatch('doCopy', {
				// 	copyContent: 'hahahah',
				// });
				// clearTimeout(app.clipboardTimer);
				// app.bottomSheetToolbar[0].icon = 'mdi-clipboard-check';
				// app.clipboardTimer = setTimeout(() => {
				// 	app.bottomSheetToolbar[0].icon = 'mdi-clipboard-text';
				// }, 1000);
				// // console.log(result);
			},
		},
		{
			icon: 'mdi-download',
			text: '直接下载',
			showInSheet: true,
			action: e => {
				if (e.attributes) {
					var url = e.attributes.expandedURL
						? e.attributes.expandedURL
						: e.attributes.uploaderURL;
					app.downloadStraightly(url);
					return;
				}
				console.error('下载失败');
				// app.downloadStraightly(app.currentVideo.attributes.url);
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
			action: (renameOjbect, event) => {
				app.originalName = renameOjbect.attributes.name;
				app.renameOjbect = renameOjbect;
				console.log(event);
				app.renameInput = renameOjbect.get('name');
				app.renameDialog = true;
				setTimeout(() => {
					app.$refs.renameInput.focus();
				}, 0);
			},
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
