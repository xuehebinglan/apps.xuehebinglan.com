import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DrinkWater from '@/components/DrinkWater'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: '雪河冰兰的apps首页'
      }
    },
    {
      path: '/drink-water',
      name: 'DrinkWater',
      component: DrinkWater,
      meta: {
        title: '喝水吧'
      }
    }
  ]
})
