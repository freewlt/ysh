import Vue from 'vue'
import VueRouter from 'vue-router'

// const welcome = () => import('@/views/welcome.vue')
const Home = () => import('@/views/home/home')
// const User = () => import('@/views/page/user/index')
// const Resource = () => import('@/views/page/resource/index')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  // {
  //   path: '/home',
  //   component: Home,
  //   children: [
  //     // {
  //     //   path: '/',
  //     //   component: welcome
  //     // },
  //     // {
  //     //   path: '/user',
  //     //   component: User
  //     // },
  //     // {
  //     //   path: '/resource',
  //     //   component: Resource
  //     // }
  //   ]
  // },
  // {
  //   path: '/home/:name',
  //   component: Home
  // }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
