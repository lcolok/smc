/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
// import AuthLayout from '@/layout/AuthLayout';

// import DashboardLayout from '@/layout/DashboardLayout';

// import EningeLayout from '@/layout/EningeLayout';

export default [
	{
		path: '/',
		redirect: 'home',
		component: require('@/layout/DashboardLayout').default, //使用懒加载
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/home',
				view: 'Home',
				name: 'Home',
				meta: {
					title: 'Home',
				},
			},
			{
				path: '/search_results',
				view: 'SearchResults',
				name: 'Search Results',
				meta: {
					title: 'Search Results',
				},
			},
			{
				path: '/tts',
				view: 'TTS',
				name: 'TTS',
				meta: {
					title: 'TTS',
				},
			},
			{
				path: '/upload_page',
				view: 'UploadPage',
				name: 'Upload Page',
				meta: {
					title: 'Upload Page',
				},
			},
			{
				path: '/dashboard',
				// Relative to /src/views
				view: 'Dashboard',
				meta: {
					title: 'Dashboard',
				},
			},
			{
				path: '/management',
				// Relative to /src/views
				view: 'Management',
				meta: {
					title: 'User Management',
				},
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
		component: require('@/layout/AuthLayout').default,
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
		component: require('@/layout/EningeLayout').default,
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
	{
		path: '/init_bark',
		redirect: 'init_bark',
		component: require('@/layout/DashboardLayout').default,
		group: 'bark',
		children: [
			{
				path: '/init_bark',
				view: 'InitBark',
				meta: {
					title: 'Bark初始化',
				},
			},
		],
	},
	{
		path: '/',

		component: require('@/layout/PlayLayout').default,
		group: 'play',
		meta: {
			requiresAuth: false,
		},
		children: [
			{
				path: '/v',
				view: 'Video',

				meta: {
					title: 'SMC Video',
				},
			},
		],
	},
];
