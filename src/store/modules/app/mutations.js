import { set, toggle } from '@/utils/vuex';

export default {
	setDrawer: set('drawer'),
	setImage: set('image'),
	setColor: set('color'),
	toggleDrawer: toggle('drawer'),
	search111() {
		this.$store.state.search.results = [
			{
				color: 'green',
				icon: 'mdi-store',
				title: '黑人牙膏 【雙重薄荷牙膏 - 醒神嚟喇！】故事版本 张继聪',
				value:
					'「體味測謊機」量體味! 香體劑有用嗎? 流汗不等於減肥! 破解汗的迷思!',
				'sub-icon': 'mdi-calendar',
				'sub-text': 'Last 24 Hours',
			},
			{
				color: 'orange',
				icon: 'mdi-content-copy',
				title: 'Used Space',
				value: '49/50',
				'small-value': 'GB',
				'sub-icon': 'mdi-alert',
				'sub-icon-color': 'error',
				'sub-text': 'Get More Space...',
				'sub-text-color': 'text-primary',
			},
			{
				color: 'red',
				icon: 'mdi-information-outline',
				title: 'Fixed Issues',
				value: '75',
				'sub-icon': 'mdi-tag',
				'sub-text': 'Tracked from Github',
			},
			{
				color: 'info',
				icon: 'mdi-twitter',
				title: 'Followers',
				value: '+245',
				'sub-icon': 'mdi-update',
				'sub-text': 'Just Updated',
			},
			{
				color: 'green',
				icon: 'mdi-store',
				title: 'Revenue',
				value: '$34,245',
				'sub-icon': 'mdi-calendar',
				'sub-text': 'Last 24 Hours',
			},
			{
				color: 'orange',
				icon: 'mdi-content-copy',
				title: 'Used Space',
				value: '49/50',
				'small-value': 'GB',
				'sub-icon': 'mdi-alert',
				'sub-icon-color': 'error',
				'sub-text': 'Get More Space...',
				'sub-text-color': 'text-primary',
			},
			{
				color: 'red',
				icon: 'mdi-information-outline',
				title: 'Fixed Issues',
				value: '75',
				'sub-icon': 'mdi-tag',
				'sub-text': 'Tracked from Github',
			},
			{
				color: 'info',
				icon: 'mdi-twitter',
				title: 'Followers',
				value: '+245',
				'sub-icon': 'mdi-update',
				'sub-text': 'Just Updated',
			},
		];
	},
};
