import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoPage from '@/components/TodoPage'
import Calender from '@/components/Calender'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoPage',
      component: TodoPage
    },
    {
      path: '/Calender',
      name: 'Calender',
      component: Calender
    }
  ]
})
