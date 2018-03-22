// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// some pulgin require...
import { DatetimePicker, InfiniteScroll,Loadmore,Indicator,Spinner } from 'mint-ui';
import localforage from './localforage/localforage';
import dataCrypt from './dataCrypt/dataCrypt';
import initIdentity from '@/init/init';
import './assets/common.css' ;

Vue.component(DatetimePicker.name, DatetimePicker); 
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);
Vue.use(InfiniteScroll);

initIdentity()

router.beforeEach( async (to,form,next) => {
   let islogin = await localforage.getItem('isLogin')
   store.commit('isLogin', true)
  if (to.name === 'login' && islogin) {
    next('/activitylist')
  } else {
    next()
  }
})
router.beforeEach( async (to,form,next) => {
  let islogin = await localforage.getItem('isLogin')
  if (to.name !== 'login' && !islogin) {
    next('/login')
  } else {
    next()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
