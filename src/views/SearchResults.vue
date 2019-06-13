<template>
  <v-container fill-height fluid grid-list-md>
    <v-layout wrap>
      <v-flex v-for="(item,index) in items" :key="index" sm6 xs12 md6 lg3>
        <material-stats-card v-bind="item"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	data() {
		return {
			items: [
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
				},{
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
			],
		};
	},
	methods: {
		complete(index) {
			this.list[index] = !this.list[index];
		},
	},
};
</script>
