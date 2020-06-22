<template>
    <div class="navLf">
            <el-menu class="el-menu-vertical-demo">
                <template v-for="item in list">
                    <router-link :to="{path:item.url}" v-if="item.children" :key="item.name">
                        <el-submenu :index="item.name" @click="menuClick(item.name)">
                            <template slot="title">
                                <!--<img :src="item.name === selectedMenuId ? item.mediumBg : item.medium">-->
                                <i class="icon el-icon-edit"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="subItem in item.children" :index="subItem.name" :key="subItem.name">
                                <router-link :to="{path:subItem.url}">
                                    {{subItem.name}}
              </router-link>
                            </el-menu-item>
                        </el-submenu>
                    </router-link>
                    <router-link :to="{path:item.url}" :key="item.name" v-else>
                        <el-menu-item :index="item.name" @click="menuClick(item.name)">
                            <template slot="title">
                                <!--<img :src="item.name === selectedMenuId ? item.mediumBg : item.medium">-->
                                <i class="icon el-icon-edit"></i>
                                <span>{{item.name}}</span>
                            </template>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-menu>
        </div>
</template>
<script>
    export default {
        name: 'navLf',
        data () {
            return {
                selectedMenuId: '',
            }
        },
        props: {
            list: {}
        },
        methods: {
            menuClick (name) {
                this.selectedMenuId = name
            }
        }
    }
</script>

<style lang="less" scoped="">
    .navLf {
            width: 200px;
            height: calc(100% - 64px);
            overflow-y: auto;
            ul {
                height: 100%;
                li{
                    background: #fff;
                }
                // 图片
                .iconfont {
                    vertical-align: middle;
                    margin-right: 5px;
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                }
                // icon图标
                .icon{
                    width: 24px;
                    margin-right: 5px;
                    font-size: 20px;
                }
            }
            .is-opened .is-active .router-link-active {
                color: #409EFF;
            }
            .el-menu-item{
                height: 46px;
                line-height: 46px;
            }
            .el-menu-item.is-active {
                background: rgba(224, 246, 254, 1);
                border-right: 3px solid rgba(0, 153, 255, 1);
            }
            .titleAside {
                display: block;
                height: 100%;
                padding: 0 20px;
            }
            .el-submenu {
                background: #fff;
            }
        }
</style>
