import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWoHomePagerld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
