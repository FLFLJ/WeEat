import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home/home.js'
import weeatRouter from './weeat/weeat.js'
import myRouter from './my/my.js'
import gameRouter from './game/game.js'
import playgameRouter from './game/playgame.js'
import adminRouter from './admin/admin.js'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  homeRouter,
  weeatRouter,
  gameRouter,
  myRouter,
  playgameRouter,
  adminRouter,
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
