import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('@/pages/login/login.vue'),
      meta: {
        title: '小鹿活动'
      }
    },
    {
      path: '/activitylist',
      name: 'activitylist',
      component: () => import ('@/pages/activityList/activityList.vue'),
      meta: {
        title: '小鹿活动'
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import ('@/pages/intro/intro.vue'),
      meta: {
        title: '小鹿活动'
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import ('@/pages/apply.vue'),
      meta: {
        title: '小鹿活动'
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import ('@/pages/result/result.vue'),
      meta: {
        title: '小鹿活动'
      }
    }
  ]
})
