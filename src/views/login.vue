<template>
    <div class="loginBox">
        <div class="bg">
            <img src="../assets/img/login/logo.png" class="logoPic" title="易生活后台管理系统"/>
        </div>
        <el-form class="login" :model="form" :rules="rules" ref="form">
            <h4 class="title">账号密码登录</h4>
            <el-form-item prop="username">
              <el-input prefix-icon ="el-icon-user" v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon ="el-icon-unlock" v-model="form.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="记住账号" name="type" v-model="checked"></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" class="btnGroup" :loading="btnLoading">登录</el-button>
            </el-form-item>
            <el-form-item class="wordTip">
                还没有账号？请联系管理员
            </el-form-item>
        </el-form>
        <p class="copyRight">© 2019 北京汽车易生活网络科技有限公司 ICP 证 19864 号京公网安备 11010802010984 号经营许可证</p>
    </div>
</template>

<script>
import qs from "qs";

import { getStore, setStore, removeStore } from "@/utils/localStorage";
import { login } from "@/api/login";
import { getUserInfo } from "@/api/user";


export default {
    name: "login",
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入6-8位密码"));
            } else {
                let password = /^[A-Za-z0-9]{6,8}$/;
                if (!password.exec(this.form.password)) {
                    callback(new Error("密码格式不对"));
                }
                callback();
            }
        };

        return {
            form: {
                username: "admin",
                password: "123456",
            },
            rules: {
                username: [
                    {required: true, message: "请输入账号", trigger: "blur"},
                    { min: 2, max: 20, message: "长度在 2 - 20 个字符", trigger: "blur"}
                ],
                password: [
                    { required: true, validator: validatePass, trigger: "blur" }
                ]
            },
            checked: false,
            // 提交按钮 loading 状态
            btnLoading: false
        };
    },
    mounted(){
        this.loadAccount();
    },
    methods: {
        loadAccount(){
            let accountInfo = getStore("username");
            if(Boolean(accountInfo) == false){
                return false;
            } else{
                this.form.username = accountInfo;
            }
        },
        getRequest() {
            const _this = this;
            let loginForm = {
                username: this.form.username,
                password: this.form.password,
                grant_type: "password",
                scope: "app"
            };
            login(qs.stringify(loginForm)).then((res) => {
                _this.btnLoading = false;
                setStore("token", res.data.data);
                // this.getUserInfo();
            }).catch(function() {
                _this.btnLoading = false;
            });
        },
        getUserInfo(){
            getUserInfo().then((res) => {
                console.log(res,"loginUSERinof");
                this.$router.push("/");
            });
        },
        submitForm() {
            const _this = this;
            _this.btnLoading = true;
            this.$refs.form.validate((valid) => {
                if(valid) {
                    this.getUserInfo();
                    if(this.checked == true){
                        setStore("username", this.form.username);
                        _this.getRequest();
                    }else{
                        removeStore("username");
                        _this.getRequest();
                    }
                } else {
                    _this.btnLoading = false;
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        }
    }
};
</script>

<style lang="less">
.loginBox{
    width: 100%;
    height: 100%;
    min-width: 1300px;
    min-height: 400px;
    overflow: auto;

    .bg{
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        min-width: 1300px;
        height: 61%;
        background:linear-gradient(270deg,rgba(0,189,247,1) 0%,rgba(0,136,237,1) 100%);
        z-index: -1;
        
        &:after{
            content: '';
            display: block;
            width: 100%;
            height: 79%;
            margin: 0 auto;
            background: url('../assets/img/login/bg.png') no-repeat center center;
        }
        
        .logoPic{
            padding: 66px 0 0 88px;
        }
    }

    .login{
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // margin-left: -305px;
        // margin-top: -184px;
        width: 610px;
        padding: 20px 100px;
        background: #fff;
        box-sizing: border-box;
        margin: 16% 0 0 34%;
        z-index: 99;

        .title{
            padding: 20px 0;
            font-size: 26px;
            font-weight: 400;
            color: #515A6E;
        }
        
         .el-input__inner {
            height: 54px;
            line-height: 54px;
            color: #808695;
            font-size: 16px;
        }
        
        .el-input__icon{
            font-size: 20px;
            padding-top: 5px;
        }

        .btnGroup{
            width: 100%;
            padding: 14px 15px;
            font-size: 20px;
        }

        .wordTip{
            text-align: center;
            color: #808695;
            font-size:16px;
        }
    }

    .copyRight{
        position: absolute;
        bottom: 2%;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #808695;
    }
}
</style>