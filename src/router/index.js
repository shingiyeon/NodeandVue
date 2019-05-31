import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoPage from '@/components/TodoPage'
import Calendar from '@/components/Calendar'
import TodoPageApp from '@/components/TodoPage/TodoApp'
import CalendarApp from '@/components/CalendarPage/CalendarApp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/TodoApp',
      name: 'TodoPage2',
      component: TodoPageApp
    },
    {
      path: '/CalendarApp',
      name: 'Calendar2',
      component: CalendarApp
    },
    {
      path: '/',
      name: 'TodoPage',
      component: TodoPage
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
