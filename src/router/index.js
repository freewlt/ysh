import Vue from 'vue'
import VueRouter from 'vue-router'

const Welcome = () => import('@/views/welcome.vue')
const Home = () => import('@/views/home/home')
const User = () => import('@/views/page/user/index')
const Resource = () => import('@/views/page/resource/index')
const Role = () => import('@/views/page/permission/index')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        meta: {title: '首页'},
        children: [
            {
                path: '',
                component: Welcome,
            },
            {
                path: 'resource',
                component: Resource,
                meta: {title: '资源管理'}
            },
            {
                path: 'permission',
                component: Role,
                meta: {title: '角色管理'}
            }
        ]
    },
    {
        path: '/order',
        component: Home,
        meta: {title: '用户管理'},
        children: [
            {
                path: '',
                component: Welcome
            },
            {
                path: 'user',
                component: User,
                meta: {title: '用户管理'}
            },
            {
                path: 'resource',
                component: Resource,
                meta: {title: '资源'}
            }
        ]
    },
]
const router = new VueRouter({
    routes,
    // mode: 'history'
})

export default router
