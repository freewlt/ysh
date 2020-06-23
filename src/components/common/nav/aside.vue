<template>
  <div class="asideBox">
    <div class="headBox">
      <div class="logoBox">
        <img class="logo" src="../../../assets/img/login/logo.png" title="汽车易生活">
      </div>
      <div class="center">
        <el-menu class="navMenu" mode="horizontal" :default-active="$route.path" @select="handleSelect">
          <el-menu-item v-for="item in navMenuList" :key="item.name" :index="item.id">
            <router-link :to="{path:item.path}">{{item.name}}</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right"><i class="el-icon-edit"></i>
        <i class="notices el-icon-message-solid"></i>
        <el-dropdown class="dropDown" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="iconfont icon-yonghu el-icon-user-solid"></i>用户
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="require"><i class="iconfont header-icon icon-xiugaimima"></i>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout"><i class="iconfont icon-zhuxiao header-icon"></i>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="navBtn">
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
    <div class="breadBox">
      <bread-crumb-box :breadList="breadList"></bread-crumb-box>
    </div>
  </div>
</template>

<script>
import BreadCrumbBox from "../breadCrumb/breadCrumb";

export default {
  name: 'asideBox',
  components: {BreadCrumbBox},
  data () {
    return {
      breadList: [],
      selectedMenuId: '',
      navMenuList: [
          {'id': '1','name': '首页',path:'/home'},
          {'id': '2','name': '用户管理',path:'/order'}
      ],
      listHome: [
          {
              'id': '12029857621868544',
              'createDate': '2016-05-16 15:26:44',
              'modifyDate': '2016-07-21 18:40:24',
              'flag': true,
              'orders': '1',
              'name': '资源管理',
              'parentId': '12029684246118400',
              'remark': '用户管理',
              'url': '/home/resource',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g3g9kvum632101s10ig4ee5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g3m821vu12m3o0k2eq17397.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '12030099176030208',
              'createDate': '2016-05-16 15:27:42',
              'modifyDate': '2016-07-21 18:31:47',
              'flag': true,
              'orders': '2',
              'name': '用户',
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
              'id': '12030299793784832',
              'createDate': '2016-05-16 15:28:30',
              'modifyDate': '2016-07-25 18:50:11',
              'flag': true,
              'orders': '3',
              'name': '菜单管理',
              'parentId': '12029684246118400',
              'remark': '权限管理',
              'url': '/admin/menu/tree.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g6lt714c5fmc16hu4nh16hh5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6g6p4l1i281nd4msr96422m7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '13099012202692608',
              'createDate': '2016-05-19 14:15:11',
              'modifyDate': '2016-07-20 14:55:49',
              'flag': true,
              'orders': '4',
              'name': '区域管理',
              'parentId': '12029684246118400',
              'remark': '区域管理',
              'url': '/admin/area/tree.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/05/19/p1aj3qe898u3t1vpti1v70dhf5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/05/19/p1aj3qei269j76hmovv8210iu7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '13499244367314944',
              'createDate': '2016-05-20 16:45:33',
              'modifyDate': '2018-01-18 09:46:45',
              'flag': true,
              'orders': '5',
              'name': '机构管理',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '/admin/areaProxy/tree.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f3lu9bnv17131hftvkev6a5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f405oko81mh21m9dvoos4e7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '15587894823485440',
              'createDate': '2016-05-26 11:05:06',
              'modifyDate': '2018-01-18 09:48:10',
              'flag': true,
              'orders': '6',
              'name': '电子卡分级',
              'parentId': '12029684246118400',
              'remark': '电子卡分级',
              'url': '/admin/member/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f77aar8ies8ignhshmaa5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f7abtjt5138b19i214im2dt7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '132365441262682112',
              'createDate': '2017-04-13 16:57:23',
              'modifyDate': '2018-01-18 09:47:32',
              'flag': true,
              'orders': '7',
              'name': '充值规则',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '/admin/rechargeRule/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f625m1rn4v151cgc12a86bo5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43f65smg0hai41e9m1ms93mh7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '12669476390567936',
              'createDate': '2016-05-18 09:48:21',
              'modifyDate': '2016-07-21 18:39:17',
              'flag': true,
              'orders': '8',
              'name': '标准编码',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '/admin/stdCodeType/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjabr1nkb2h71muo1b3lqur5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjcjnhf7d3u118ummq1kbk7.png',
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
          },
          {
              'id': '232655505460297728',
              'createDate': '2018-01-15 10:54:18',
              'modifyDate': '2018-01-15 10:54:50',
              'flag': true,
              'orders': '10',
              'name': '油站支付配置',
              'parentId': '12029684246118400',
              'remark': '油站支付配置',
              'url': '/admin/orgPaymerchant/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/15/p1c3rrp8vr135113fbj5ksmtt55.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/15/p1c3rrporu1ihn1hvktc1jb42j47.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '200082929748017152',
              'createDate': '2017-10-17 13:42:31',
              'modifyDate': '2017-10-17 13:42:31',
              'flag': true,
              'orders': '11',
              'name': '支付商户配置',
              'parentId': '12029684246118400',
              'remark': '支付商户配置',
              'url': '/admin/payMerchant/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2017/10/17/p1bskdk75lfr0eun15m5mnl1hnu5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2017/10/17/p1bskdlhm41m2ihaq1o8slie1rb17.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          },
          {
              'id': '37430594438692864',
              'createDate': '2016-07-25 17:40:12',
              'modifyDate': '2016-07-25 18:52:33',
              'flag': true,
              'orders': '12',
              'name': '代理权限设置',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqrn2d1laq1urfndt6cp7ht5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqrt87i6s94duq2c70l647.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location',
              'children': [
                  {
                      'id': '13',
                      'name': '油站人员管理'
                  },
                  {
                      'id': '14',
                      'name': ' 油站角色管理'
                  },
                  {
                      'id': '15',
                      'name': ' 油站菜单管理'
                  },
                  {
                      'id': '16',
                      'name': ' 自动油站角色'
                  }
              ]
          },
          {
              'id': '37448952089411584',
              'createDate': '2016-07-25 18:53:09',
              'modifyDate': '2016-07-25 18:53:09',
              'flag': true,
              'orders': '13',
              'name': '公司权限设置',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqv9fq18m81fja8fb17l1jdq5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqvc2ei0ftsp58a1as2pq27.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location',
              'children': [
                  {
                      'id': '1',
                      'name': '公司人员管理'
                  },
                  {
                      'id': '2',
                      'name': ' 公司角色管理'
                  },
                  {
                      'id': '3',
                      'name': ' 公司菜单管理'
                  }
              ]
          },
          {
              'id': '37449063930527744',
              'createDate': '2016-07-25 18:53:35',
              'modifyDate': '2016-07-25 18:53:35',
              'flag': true,
              'orders': '14',
              'name': '油站权限设置',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogr08k7im0tmkn7qfh01bq75.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogr0acvqihdji1rke1nb41fpl7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location',
              'children': [
                  {
                      'id': '4',
                      'name': '油站人员管理'
                  },
                  {
                      'id': '5',
                      'name': ' 油站角色管理'
                  },
                  {
                      'id': '6',
                      'name': ' 油站菜单管理'
                  },
                  {
                      'id': '7',
                      'name': ' 自动油站角色'
                  },
                  {
                      'id': '8',
                      'name': ' 自动油站菜单'
                  },
                  {
                      'id': '9',
                      'name': ' MIS油站角色'
                  },
                  {
                      'id': '10',
                      'name': ' MIS油站菜单'
                  }
              ]
          },
          {
              'id': '70659339181883392',
              'createDate': '2016-10-25 10:19:22',
              'modifyDate': '2016-10-25 10:20:53',
              'flag': true,
              'orders': '33',
              'name': '洗车房权限设置',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '',
              'type': '15',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqrn2d1laq1urfndt6cp7ht5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/25/p1aogqvc2ei0ftsp58a1as2pq27.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location',
              'children': [
                  {
                      'id': '70659339181883352',
                      'name': '洗车房人员管理'
                  },
                  {
                      'id': '11',
                      'name': ' 洗车房角色管理'
                  },
                  {
                      'id': '12',
                      'name': ' 洗车房菜单管理'
                  }
              ]
          },
          {
              'id': '170748268668518400',
              'createDate': '2017-07-28 14:57:02',
              'modifyDate': '2018-01-18 10:28:35',
              'flag': true,
              'orders': '16',
              'name': '定时任务管理',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '/admin/timingTask/list.jhtml',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43hh6em1l1d1pgp1j38jco1aio5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2018/01/18/p1c43hha4g1bv4rbl1sslobd1lv77.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': ''
          }
      ],
      listOr: [
          {
              'id': '130208',
              'createDate': '2016-05-16 15:27:42',
              'modifyDate': '2016-07-21 18:31:47',
              'flag': true,
              'orders': '2',
              'name': '用户管理',
              'parentId': '12029684246118400',
              'remark': '角色管理',
              'url': '/order/user',
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
              'id': '3153',
              'createDate': '2016-07-09 11:32:42',
              'modifyDate': '2016-07-22 16:10:46',
              'flag': true,
              'orders': '9',
              'name': '系统设置',
              'parentId': '12029684246118400',
              'remark': '',
              'url': '/order/resource',
              'type': '1',
              'large': '',
              'medium': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjprk1hi8m9q1ma37o31t9v5.png',
              'mediumBg': 'http://192.168.0.8:8083/image/upload/image/menu/2016/07/21/p1ao6gjshnbncp05ej51osu1l8q7.png',
              'thumbnail': '',
              'isParent': true,
              'parentName': '',
              'icon': 'iconfont el-icon-location'
          }
      ],
      list: []
    }
  },
  created () {
      this.breadNav();
      this.list = this.listHome
  },
  watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "breadNav"
  },
  methods: {
    // 面包屑导航获取
    breadNav () {
        this.breadList = this.$route.matched;
    },
    handleCommand (c) {
      switch (c) {
        case 'require':
          alert(1)
          break
        case 'logout':
          alert(2)
      }
    },

    // 一级菜单点击
    handleSelect (key) {
        if(key == 1){
            this.list = this.listHome
        }
         if(key == 2) {
            this.list = this.listOr
        }
    },

    // 二级菜单点击
    menuClick (name) {
      this.selectedMenuId = name
    }
  }
}
</script>

<style lang="less" scoped="">
  .asideBox{
    width: 100%;
    .headBox {
      width: 100%;
      /*min-width: 1300px;*/
      height: 64px;
      overflow: hidden;
      background-color: rgba(0, 24, 46, 1);
      box-sizing: border-box;
      font-size: 0;
      .logoBox{
        display: inline-block;
        vertical-align: middle;
        width:30%;
        .logo {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .center{
        display: inline-block;
        vertical-align: middle;
        width:50%;
        .navMenu{
          background: transparent;
          border: none;
          a{
            width: 100%;
            height: 100%;
            display: block;
          }
          li:hover{
            color: #409EFF;
            background: transparent;
          }
        }
      }
      .right{
        display: inline-block;
        vertical-align: middle;
        width:20%;
        text-align: right;
        .notices{
          display: inline-block;
          vertical-align: middle;
          color: #fff;
          font-size: 15px;
        }
        .dropDown {
          display: inline-block;
          vertical-align: middle;
          color: #fff;
          .el-dropdown-link {
            display: inline-block;
            line-height: 64px;
            padding: 0 15px;
            cursor: pointer;
            i{
              padding-right: 5px;
            }
          }
        }
      }
    }
    .navBtn {
        display: inline-block;
        vertical-align: top;
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
    .breadBox{
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 220px);
      margin: 0 10px;
    }
  }
</style>
