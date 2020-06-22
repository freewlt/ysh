<template>
    <el-container class="order">
        <aside-box :list="list"></aside-box>
        <div class="main">
            <router-view/>
        </div>
    </el-container>
</template>

<script>
    import AsideBox from '@/components/common/nav/aside'

    export default {
        name: 'order',
        components: {AsideBox},
        data () {
            return {
                list: [
                    {
                        'id': '12030099176030208',
                        'createDate': '2016-05-16 15:27:42',
                        'modifyDate': '2016-07-21 18:31:47',
                        'flag': true,
                        'orders': '2',
                        'name': '用户管理',
                        'parentId': '12029684246118400',
                        'remark': '角色管理',
                        'url': '/home/user',
                        'type': '1',
                        'large': '',
                        'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g5cpl4uk114qhg012b8kk75.png',
                        'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g5k97ifp15uoahj139u6p67.png',
                        'thumbnail': '',
                        'isParent': true,
                        'parentName': '',
                        'icon': 'iconfont el-icon-location'
                    },
                    {
                        'id': '31539903175065600',
                        'createDate': '2016-07-09 11:32:42',
                        'modifyDate': '2016-07-22 16:10:46',
                        'flag': true,
                        'orders': '9',
                        'name': '系统设置',
                        'parentId': '12029684246118400',
                        'remark': '',
                        'url': '/admin/setting/editPointSetting.jhtml',
                        'type': '1',
                        'large': '',
                        'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjprk1hi8m9q1ma37o31t9v5.png',
                        'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjshnbncp05ej51osu1l8q7.png',
                        'thumbnail': '',
                        'isParent': true,
                        'parentName': '',
                        'icon': 'iconfont el-icon-location'
                    }
                ]
            }
        },
        created(){
            console.log(this.list)
        }
    }
</script>

<style lang="less" scoped="">
    .order{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .main{
            position: absolute;
            left: 210px;
            top: 64px;
            width: calc(100% - 220px);
            height: calc(100% - 64px);
            margin: 0 auto;
            box-sizing: border-box;
        }
    }
</style>
