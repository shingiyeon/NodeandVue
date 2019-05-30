import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoPage from '@/components/TodoPage'
import Calender from '@/components/Calender'
import TodoPageApp from '@/components/TodoPage/TodoApp'
import CalenderApp from '@/components/CalenderPage/CalenderApp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/TodoApp',
      name: 'TodoPage2',
      component: TodoPageApp
    },
    {
      path: '/CalenderApp',
      name: 'Calender2',
      component: CalenderApp
    },
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
