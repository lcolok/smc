import Vue from 'vue'
import Router from 'vue-router'
import AV from './plugins/leancloud'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router);

Vue.prototype.$AV = AV;

// if (process.env.NODE_ENV == "development") { AV._setServerURLs('http://localhost:' + require('../api/config/api.config.js').server.devPort) }//如果是处于开发状态的话,设置本地服务器端口(必须先进行 lean up 操作)

// const routes = []

// importPages(require.context('./vue', false, /\.vue$/))
// function importPages(r) {

//   var arr = r.keys();

//   arr.forEach(key => {
//     var meta = r(key).default.meta;
//     // console.log(r(key).default);

//     var filePath = (key.split('.'))[1];
//     // var path = (key.toLowerCase().split('.'))[1];
//     // var title = (key.split('.'))[1].split('/')[1];

//     routes.push({
//       path: (meta.staticPath || filePath).toLowerCase(),//如果有静态路径则用静态路径
//       component: () => import(/* webpackChunkName: "login" */"./vue" + filePath),
//       meta: meta
//     })

//     routes
//       .sort((a, b) => {//按照自定义的优先级来排序
//         // console.log(a.meta.order);
//         if ((a.meta.order || -1) < (b.meta.order || -1)) {
//           return -1
//         } else {
//           return 0
//         }
//       })
//       .sort((a, b) => {//置底404页面
//         if (a.path == '*') {
//           return -1
//         } else {
//           return 1
//         }
//       })
//       .sort((a, b) => {//置顶首页
//         if (b.path == '/') {
//           return 1
//         } else {
//           return -1
//         }
//       })
//   });
// }

// const router = new Router({
//   routes: routes
// })

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
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
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "Icons" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "UserProfile" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "Maps" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "Tables" */ './views/Tables.vue')
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
          name: 'login',
          component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import(/* webpackChunkName: "Logout" */ './views/Logout.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "Register" */ './views/Register.vue')
        },
        {
          path: '/email_check',
          name: 'EmailCheck',
          component: () => import(/* webpackChunkName: "EmailCheck" */ './views/EmailCheck.vue')
        }
      ]
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue'),
    }
  ]
})



router.beforeEach((to, from, next) => {//to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  document.title = to.meta.title || "Vue Argon Dashboard - Free Dashboard for Vue.js & Bootstrap 4";//给出指定的标题名称

  if (to.path === '/login') { next() }  // 如果即将进入登录路由，则直接放行

  else {     //进入的不是登录路由

    if (to.matched.some(record => { return record.meta.requiresAuth })) {
      // 此路由需要鉴权，请检查是否登录
      // 如果没有登录，重定向到登录页面。
      // console.log('需要鉴权');
      if (!AV.User.current()) {
        console.log('还没登录');
        next({
          path: '/login',
          query: { redirect: to.fullPath }//留下原来要到达的路径信息，等用户登录好之后，再进行跳转
        })
      } else {
        // console.log('已经登录了');
        if (!AV.User.current().attributes.emailVerified) {
          console.log('邮箱还没激活');
          next({
            path: '/email_check',
            query: {
              redirect: to.fullPath //留下原来要到达的路径信息，等用户登录好之后，再进行跳转
            }
          })

        } else {
          next()
        }
      }
    } else {
      next() // 确保一定要调用 next()
    }


  }  //如果不需要登录验证，或者已经登录成功，则直接放行

})

export default router