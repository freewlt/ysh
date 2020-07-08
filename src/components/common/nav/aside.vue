<template>
  <div class="asideBox">
    <div class="headBox">
      <div class="logoBox">
        <img
          class="logo"
          src="../../../assets/img/logo.png"
          title="汽车易生活"
        />
      </div>
      <div class="center">
        <el-menu
          :default-active="$route.path.split('/').slice(0,2).join('/')"
          class="navMenu"
          mode="horizontal"
        >
          <el-menu-item
            :index="item.path"
            :key="item.name"
            v-for="item in navMenuList"
          >
            <router-link :to="{path:item.path}">{{item.name}}</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <i class="el-icon-edit"></i>
        <i class="notices el-icon-message-solid"></i>
        <el-dropdown @command="handleCommand" class="dropDown">
          <span class="el-dropdown-link">
            <i class="iconfont icon-yonghu el-icon-user-solid"></i>用户
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="require"
              ><i class="iconfont header-icon icon-xiugaimima"></i>修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout"
              ><i class="iconfont icon-zhuxiao header-icon"></i>注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="navBtn">
      <el-menu :default-active="$route.path">
        <template v-for="item in list">
          <router-link
            :key="item.name"
            :to="{ path: item.url }"
            v-if="item.children"
          >
            <el-submenu :index="item.url" @click="menuClick(item.name)">
              <template slot="title">
                <!--<img :src="item.name === selectedMenuId ? item.mediumBg : item.medium">-->
                <i class="icon el-icon-edit"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="subItem.name"
                :key="subItem.name"
                v-for="subItem in item.children"
              >
                <router-link :to="{ path: subItem.url }">
                  {{ subItem.name }}
                </router-link>
              </el-menu-item>
            </el-submenu>
          </router-link>
          <router-link :key="item.name" :to="{ path: item.url }" v-else>
            <el-menu-item :index="item.url" @click="menuClick(item.name)">
              <template slot="title">
                <!--<img :src="item.name === selectedMenuId ? item.mediumBg : item.medium">-->
                <i class="icon el-icon-edit"></i>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </div>
    <!-- 添加或修改区域对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="dialogBox"
      v-if="dialogVisible"
    >
      <el-form :model="form" :rules="rules" label-width="80px" ref="form">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            placeholder="请输入旧密码"
            type="password"
            v-model="form.oldPassword"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            placeholder="请输入新密码,6-20位大小写字母、数字"
            type="password"
            v-model="form.newPassword"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            placeholder="请确认密码"
            type="password"
            v-model="form.confirmPassword"
          />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button :loading="btnLoading" @click="submitForm" type="primary"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import { updatePassword } from "@/api/user";

import { loginOut } from "@/api/login";

export default {
  name: "asideBox",
  data() {
    const validatorPassword = (rule, value, callback) => {
      let regex = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/);
      if (!regex.test(value)) {
        callback(new Error("6-20位大小写字母、数字"));
      } else if (this.form.oldPassword == value) {
        callback(new Error("新旧密码一致"));
      } else {
        callback();
      }
    };
    const equalToPassword = (rule, value, callback) => {
      if (this.form.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      selectedMenuId: "",
      navMenuList: [
        {
          id: "1",
          name: "首页",
          path: "/home",
          children: [
            {
              id: "12029857621868544",
              name: "资源管理",
              parentId: "12029600",
              url: "/home/resource",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868544",
              name: "权限管理",
              parentId: "120200",
              url: "/home/permission",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868544",
              name: "角色管理",
              parentId: "1202968424610",
              url: "/home/role",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868501",
              name: "标准编码",
              parentId: "1684246118400",
              url: "/home/stdCodeType",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868544",
              name: "商户管理",
              parentId: "120296400",
              url: "/home/merchant",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868544",
              name: "区域管理",
              parentId: "18400",
              url: "/home/area",
              icon: "iconfont el-icon-location",
            },
            {
              id: "120429857621868544",
              name: "会员类型",
              parentId: "12246118400",
              url: "/home/memberType",
              icon: "iconfont el-icon-location",
            },
            {
              id: "37430594438692864",
              name: "示例一",
              parentId: "100",
              url: "",
              icon: "iconfont el-icon-location",
              children: [
                {
                  id: "13",
                  name: "示例一一",
                },
                {
                  id: "14",
                  name: " 示例一二",
                },
                {
                  id: "15",
                  name: " 示例一仨",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "用户管理",
          path: "/order",
          children: [
            {
              id: "130208",
              name: "用户管理",
              parentId: "1218400",
              url: "/order/user",
              icon: "iconfont el-icon-location",
            },
            {
              id: "3153",
              name: "系统设置",
              parentId: "12018400",
              url: "/order/resource",
              icon: "iconfont el-icon-location",
            },
          ],
        },
      ],
      list: [],
      breadFirst: {},
      dialogTitle: "修改密码",
      dialogVisible: false,
      btnLoading: false,
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "6-20位大小写字母、数字",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, validator: validatorPassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
      key: 0,
    };
  },
  created() {
    console.log(this);
    this.getList();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": ["getList"],
},
  methods: {
    getList() {
        // 获取一级菜单的path;
        const path1 = this.$route.path.split("/").slice(0,2).join("/");
        this.list = this.navMenuList.find((it) => {
            return it.path == path1;
        }).children;
        console.log("菜单",this.list);
    },
    // 提交表单
    submitForm() {
      const _this = this;
      _this.btnLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          updatePassword(
            qs.stringify({
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword,
            })
          )
            .then((res) => {
              _this.btnLoading = false;
              _this.$message({
                message: res.data.message,
                type: "success",
              });
              _this.dialogVisible = false;
            })
            .catch(function() {
              _this.btnLoading = false;
            });
        }
      });
    },
    handleCommand(c) {
      switch (c) {
        case "require":
          this.dialogVisible = true;
          break;
        case "logout":
          loginOut().then(() => {
            this.$router.push("/login");
          });
      }
    },

    // 一级菜单点击
    // handleSelect(key) {
    //   if (key == "/home") {
    //     this.key = 0;
    //     this.getList();
    //     this.$router.push("/home");
    //   }
    //   if (key == "/order") {
    //     this.key = 0;
    //     // this.list = this.navMenuList[this.key].children;
    //     this.$router.push("/order");
    //   }
    // },
    // 获取一级当前选项内容
    handleClick(item) {
      this.breadFirst = item;
    },

    // 二级菜单点击
    menuClick(name) {
      this.selectedMenuId = name;
      this.handleClick();
      this.$emit("dataChange", this.breadFirst);
    },
  },
};
</script>

<style lang="less" scoped="">
.asideBox {
  width: 100%;
  /*min-width: 1300px;*/
  background: #f5f5f5;

  .headBox {
    width: 100%;
    height: 64px;
    overflow: hidden;
    background-color: rgba(0, 24, 46, 1);
    box-sizing: border-box;
    font-size: 0;

    .logoBox {
      display: inline-block;
      vertical-align: middle;
      width: 30%;

      .logo {
        display: inline-block;
        vertical-align: middle;
        padding-left: 20px;
      }
    }

    .center {
      display: inline-block;
      vertical-align: middle;
      width: 50%;

      .navMenu {
        background: none;
        border: none;

        li {
          border: none;
          background: none;
          color: #fff;
        }
      }
      .el-menu--horizontal > .el-menu-item.is-active {
        color: #409eff !important;
      }
    }

    .right {
      display: inline-block;
      vertical-align: middle;
      width: 20%;
      text-align: right;

      .notices {
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

          i {
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

      li {
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
      .icon {
        width: 24px;
        margin-right: 5px;
        font-size: 20px;
      }
    }

    .is-opened .is-active .router-link-active {
      color: #409eff;
    }

    .el-menu-item {
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

.el-dropdown-menu {
  z-index: 99999 !important;
}
</style>
