// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// some pulgin require...
import { DatetimePicker} from 'mint-ui';
import localforage from './localforage/localforage'
import dataCrypt from './dataCrypt/dataCrypt'
import './assets/common.css'
import 'mint-ui/lib/style.css'
Vue.component(DatetimePicker.name, DatetimePicker); 

localforage.getItem('userInfo', (err, value) => {
  if (!err && value) {
    const data = JSON.parse(dataCrypt.dataDecrypt(value))
    if (data.student_data) {
      store.commit('saveStudentData', data.student_data)
    }
      store.commit('saveUserData', data.user_data)
      store.commit('saveBindingId', data.is_banding_student)
  } else {
    console.log(err)
  }
})

localforage.getItem('applyInfo',(err,value) => {
  if (!err && value) {
    store.commit('saveApplyInfo',value)
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
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
