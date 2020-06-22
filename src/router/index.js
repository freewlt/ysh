import Vue from 'vue'
import VueRouter from 'vue-router'

const Welcome = () => import('@/views/welcome.vue')
const Home = () => import('@/views/home/home')
const User = () => import('@/views/page/user/index')
const Resource = () => import('@/views/page/resource/index')
const Order = () => import('@/views/order/index')

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    redirect: '/home', 
  },
  {
    path: '/home',
    name: "首页",
    component: Home,
    children: [
      {
        path: '',
        component: Welcome,
      },
      {
        path: 'resource',
        name: "资源管理",
        component: Resource,
        meta: { title: '资源管理' }
      },
      {
        path: 'user',
        name: "用户管理",
        component: User,
        meta: { title: '用户管理' }
      }
    ]
  },
  {
      path: '/order',
      name: "订单",
      component: Order,
      children: [
          {
              path: '',
              component: Welcome
          },
          {
              path: 'user',
              component: User,
              meta: { title: '用户管理' }
          }
      ]
  },
]
const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
