import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home/home.js'
import weeatRouter from './weeat/weeat.js'
import myRouter from './my/my.js'

Vue.use(VueRouter)

const routes = [
  homeRouter,
  weeatRouter,
  myRouter,
  {
    path:'/',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
