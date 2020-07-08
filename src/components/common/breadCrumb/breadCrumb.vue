<template>
    <div class="breadCrumbBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: breadNew.path }">{{breadNew.name}}</el-breadcrumb-item>
            <el-breadcrumb-item class="breakLink" v-for="item in breadList" :key="item.path">
                <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "breadCrumbBox",
    props: ["breadList","breadFirst"],
    data() {
        return {
            breadNew: {
                name: "首页",
                path: "/home"
            }
        };
    },
    created(){
        if(this.breadFirst){
            this.breadNew = this.breadFirst;
        }
    }
};
</script>

<style lang="less" scoped>
    .breadCrumbBox {
        position: relative;
        width: 100%;
        padding: 20px 20px 30px;
        background: #fff;

        .el-breadcrumb__item {
            cursor: pointer !important;

            a {
                cursor: pointer !important;
            }
        }

        &:after{
            content: "";
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 10px;
            background: #fafafa;
        }
        .el-breadcrumb__item:first-child{
            display: none;
        }
    }
</style>
