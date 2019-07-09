/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import AuthLayout from '@/layout/AuthLayout';

import DashboardLayout from '@/layout/DashboardLayout';

export default [
	{
		path: '/',
		redirect: 'dashboard',
		component: DashboardLayout,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/search_results',
				view: 'SearchResults',
				name: 'SearchResults',
			},
			{
				path: '/dashboard',
				// Relative to /src/views
				view: 'Dashboard',
				meta: {},
			},
			{
				path: '/user-profile',
				name: 'User Profile',
				view: 'UserProfile',
			},
			{
				path: '/table-list',
				name: 'Table List',
				view: 'TableList',
			},
			{
				path: '/typography',
				view: 'Typography',
			},
			{
				path: '/icons',
				view: 'Icons',
			},
			{
				path: '/maps',
				view: 'Maps',
			},
			{
				path: '/notifications',
				view: 'Notifications',
			},
			{
				path: '/upgrade',
				name: 'Upgrade to PRO',
				view: 'Upgrade',
			},
		],
	},
	{
		path: '/',
		redirect: 'login',
		component: AuthLayout,
		children: [
			{
				path: '/login',
				view: 'user/Login',
			},
			{
				path: '/register',
				view: 'user/Register',
			},
			{
				path: '/email_check',
				view: 'user/Email_Check',
			},
		],
	},
	{
		path: '/e',
		redirect: 'eninge',
		component: AuthLayout,
		children: [
			{
				path: '/eninge',
				view: 'other/Eninge',
			},
		],
	},
];
