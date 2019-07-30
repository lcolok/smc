import { logout } from '@/utils/user';

export default {
	profileMenu: [
		{ to: '/user-profile', icon: 'mdi-account-settings', text: 'My profile' },
		{ icon: 'mdi-settings', text: 'Settings' },
		{ icon: 'mdi-calendar-multiselect', text: 'Activity' },
		{ icon: 'mdi-help-circle', text: 'Support' },
		{
			icon: 'mdi-exit-run',
			text: 'Logout',
			divider: true,
			action: evt => {
				// console.log(evt);
				logout(evt);
			},
		},
	],
};
