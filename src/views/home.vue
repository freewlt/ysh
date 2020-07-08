<template>
    <el-container class="home">
        <aside-box @dataChange="handleBreadFirst"></aside-box>
        <div class="main">
            <div class="mainBg">
                <bread-crumb-box :breadList="breadList" :breadFirst="breadFirst"></bread-crumb-box>
                <router-view></router-view>
            </div>
        </div>
        <div class="loading" v-if="this.$store.state.contentLoading.loading">
            <shade-box></shade-box>
        </div>
    </el-container>
</template>

<script>

import AsideBox from "@/components/common/nav/aside";
import BreadCrumbBox from "@/components/common/breadCrumb/breadCrumb";
import ShadeBox from "@/components/common/loading/shadeBox";

export default {
    name: "home",
    components: { ShadeBox, BreadCrumbBox, AsideBox },
    provide() {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            breadList: [],
            breadFirst: {},
            isRouterAlive: true, //控制视图是否显示的变量
        };
    },
    created() {
        this.breadNav();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": ["breadNav","handleBreadFirst"],
    },
    methods: {
        // 面包屑导航获取
        breadNav() {
            this.breadList = this.$route.matched;
            console.log(this.$route);
        },
        handleBreadFirst(item){
            this.breadFirst = item;
        },
        reload() {
            this.isRouterAlive = false;            //先关闭，
            this.$nextTick(function() {
                this.isRouterAlive = true;         //再打开
            });
        }
    }
};
</script>

<style lang="less" scoped="">
    .home {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .main {
            position: absolute;
            left: 210px;
            top: 64px;
            width: calc(100% - 220px);
            height: calc(100% - 64px);
            margin: 0 auto;
            background: #fff;
            box-sizing: border-box;
            overflow-y: auto;

            .mainBg{
                position: relative;
                height: 100%;
            }
        }

        .loading {
            position: absolute;
            left: 210px;
            top: 64px;
            width: calc(100% - 210px);
            height: calc(100% - 66px);
            z-index: 9999;
        }
    }
</style>
