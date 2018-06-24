// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import { Button, Input, InputNumber, Dialog, Loading, Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(InputNumber)
// Vue.use(Input)
// Vue.use(Dialog)
// Vue.use(Loading)
// Vue.use(Message)
// Vue.use(MessageBox)

// Vue.use(axios)

Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
