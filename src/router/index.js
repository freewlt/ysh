import Vue from "vue";
import VueRouter from "vue-router";

// const Welcome = () => import("@/views/welcome.vue");
const Login = () => import("@/views/login");
const Home = () => import("@/views/home");
const Resource = () => import("@/views/page/resource/index");
const Permission = () => import("@/views/page/permission/index");
const Role = () => import("@/views/page/role/index");
const StdcodeType = () => import("@/views/page/stdcodetype/index");
const Merchant = () => import("@/views/page/merchant/index");
const User = () => import("@/views/page/user/index");
const Area = () => import("@/views/page/area/index");
const MemberType = () => import("@/views/page/membertype/index");

const Oil = () => import("@/views/page/oil/index");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/home",
        redirect: "/home/resource",
        component: Home,
        meta: {title: "首页"},
        children: [
            {
                path: "resource",
                component: Resource,
                meta: {title: "资源管理"}
            },
            {
                path: "permission",
                component: Permission,
                meta: {title: "权限管理"}
            },
            {
                path: "role",
                component: Role,
                meta: {title: "角色管理"}
            },
            {
                path: "stdCodeType",
                component: StdcodeType,
                meta: {title: "标准编码"}
            },
            {
                path: "oil",
                component: Oil,
                meta: {title: "油品管理"}
            },
            {
                path:"merchant",
                component:Merchant,
                meta: {title:"商户管理"}
            },{
                path:"area",
                component:Area,
                meta: {title:"区域管理"}
            },{
                path:"memberType",
                component:MemberType,
                meta: {title:"会员类型"}
            }
        ]
    },
    {
        path: "/order",
        redirect: "/order/resource",
        component: Home,
        meta: {title: "用户管理"},
        children: [
            {
                path: "user",
                component: User,
                meta: {title: "用户列表"}
            },
            {
                path: "resource",
                component: Resource,
                meta: {title: "资源"}
            }
        ]
    },
];
const router = new VueRouter({
    routes,
    // mode: 'history'
});


export default router;
