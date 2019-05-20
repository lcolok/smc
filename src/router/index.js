/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import AV from '@/plugins/lc_client_init'
// Routes
import paths from './paths'


Vue.prototype.$AV = AV;

function childrenRoute() {
  let child = arguments[0];

  child.name = child.name || child.view;
  child.component = (resovle) => import(
/* webpackChunkName: "[request]" */ `@/views/${child.view}.vue`
  ).then(resovle);
  
  return child
}

function parentRoute() {
  let parent = arguments[0];
  parent.children = parent.children.map(child => childrenRoute(child));
  return parent
}

Vue.use(Router)

// console.log(paths.map(path => parentRoute(path)));

// Create a new router
const router = new Router({
  mode: 'history',
  routes:
    paths.map(path => parentRoute(path))
      .concat(
        [
          { path: '*', redirect: '/dashboard' }//此处后期应该改为not found
        ]
      ),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

// // Bootstrap Analytics
// // Set in .env
// // https://github.com/MatteoGabriele/vue-analytics
// if (process.env.GOOGLE_ANALYTICS) {
//   Vue.use(VueAnalytics, {
//     id: process.env.GOOGLE_ANALYTICS,
//     router,
//     autoTracking: {
//       page: process.env.NODE_ENV !== 'development'
//     }
//   })
// }

router.beforeEach((to, from, next) => {//to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  document.title = to.meta.title || "Vue Argon Dashboard - Free Dashboard for Vue.js & Bootstrap 4";//给出指定的标题名称
  // console.log(to.meta);
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
