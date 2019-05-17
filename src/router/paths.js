/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import AuthLayout from '@/layout/AuthLayout'

import DashboardLayout from '@/layout/DashboardLayout'


export default [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        // Relative to /src/views
        view: 'Dashboard',
        meta: {
        },
      },
      {
        path: '/user-profile',
        name: 'User Profile',
        view: 'UserProfile'
      },
      {
        path: '/table-list',
        name: 'Table List',
        view: 'TableList'
      },
      {
        path: '/typography',
        view: 'Typography'
      },
      {
        path: '/icons',
        view: 'Icons'
      },
      {
        path: '/maps',
        view: 'Maps'
      },
      {
        path: '/notifications',
        view: 'Notifications'
      },
      {
        path: '/upgrade',
        name: 'Upgrade to PRO',
        view: 'Upgrade'
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        view: 'Login',
      }
    ]
  }
]
