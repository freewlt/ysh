import Vue from 'vue'
import VueRouter from 'vue-router'

const welcome = () => import('@/views/welcome.vue')
const Home = () => import('@/views/home/home')
const User = () => import('@/views/page/user/index')
const Resource = () => import('@/views/page/resource/index')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    name: "首页",
    component: Home,
    children: [
      {
        path: '/',
        component: welcome
      },
      {
        path: '/home/resource',
        name: "资源管理",
        component: Resource
      },
      {
        path: '/home/user',
        name: "用户管理",
        component: User
      }
    ]
  },
  {
      path: '/order',
      component: Home,
      children: [
          {
              path: '/',
              component: User
          },
          {
              path: '/home/user',
              component: User
          }
      ]
  },
]
const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
