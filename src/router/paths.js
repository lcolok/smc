/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import AuthLayout from '@/layout/AuthLayout';

import DashboardLayout from '@/layout/DashboardLayout';

import EningeLayout from '@/layout/EningeLayout';

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
		group: 'auth',
		children: [
			{
				path: '/login',
				view: 'Login',
			},
			{
				path: '/register',
				view: 'Register',
			},
			{
				path: '/email_check',
				view: 'Email_Check',
			},
		],
	},
	{
		path: '/e',
		redirect: 'e',
		component: EningeLayout,
		group: 'other',

		children: [
			{
				path: '/e',
				view: 'Eninge',
				meta: {
					title: '1柠1',
				},
			},
			{
				path: '/el',
				view: 'EningeLow',
				meta: {
					title: '1柠1',
				},
			},
		],
	},
];
