import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoPage from '@/components/TodoPage'
import Calender from '@/components/Calender'
import TodoPageApp from '@/components/TodoPage/TodoApp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/App',
      name: 'TodoPage2',
      component: TodoPageApp
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
