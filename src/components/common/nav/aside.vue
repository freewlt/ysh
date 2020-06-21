<template>
  <div class="asideBox">
    <div class="headBox">
      <div class="logoBox">
        <img class="logo" src="../../../assets/img/login/logo.png" title="汽车易生活">
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
          <router-link :to="{path:item.path}" v-if="item.children" :key="item.name">
            <el-submenu :index="item.name" @click="menuClick(item.name)">
              <template slot="title">
                <!--<img :src="item.name === selectedMenuId ? item.mediumBg : item.medium">-->
                <i class="icon el-icon-edit"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :index="subItem.name" :key="subItem.name">
                <router-link :to="{path:subItem.path}">
                  {{subItem.name}}
              </router-link>
              </el-menu-item>
            </el-submenu>
          </router-link>
          <router-link :to="{path:item.path}" :key="item.name" v-else>
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
  </div>
</template>

<script>

export default {
  name: 'asideBox',
  data () {
    return {
      selectedMenuId: ''
    }
  },
  props: {
    list: {}
  },
  methods: {
    handleCommand (c) {
      switch (c) {
        case 'require':
          alert(1)
          break
        case 'logout':
          alert(2)
      }
    },
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
      height: 64px;
      overflow: hidden;
      background-color: rgba(0, 24, 46, 1);
      box-sizing: border-box;
      font-size: 0;
      .logoBox{
        display: inline-block;
        vertical-align: middle;
        width:50%;
      }
      .logo {
        display: inline-block;
        vertical-align: middle;
      }
      .right{
        display: inline-block;
        vertical-align: middle;
        width:50%;
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
  }
</style>
