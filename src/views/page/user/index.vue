<template>
    <div class="user">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table :data="tableData" row-key="id" border>
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
                    </template>
                    <el-table-column prop="enableStatus" label="是否可用" align="center" :formatter="enableStatusFormatter">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="warning" class="handleBtn" @click="disableUser(scope.row)">
                                {{scope.row.enableStatus?"禁用":"启用"}}
                            </el-link>
                            <el-link type="primary" class="handleBtn" @click="dialogEdit(scope.row)">编辑
                            </el-link>
                            <el-link type="warning" class="handleBtn" @click="resetPassword(scope.row.id)">重置密码
                            </el-link>
                            <el-link type="danger" class="handleBtn" @click="deleteBtn(scope.row)">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pageBox">
                <el-pagination :current-page="query.pageNum" :total="total" @current-change="changePage"/>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog class="dialogBox" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible"
                   :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm"
                     size="small">
                <el-form-item label="登录账号" prop="username">
                    <el-input v-model="form.username" placeholder="请输入登录账号,2-20个字符" minlength="2"
                              maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="nickName">
                    <el-input v-model="form.nickName" placeholder="请输入昵称,2-20个字符" minlength="2"
                              maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入11位手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱,6-36个字符" maxlength="36"/>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-show="addStatus">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" maxlength="20"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword" v-show="addStatus">
                    <el-input type="password" v-model="form.checkPassword" placeholder="请输入确认密码" maxlength="20"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enableStatus" style="width:100%">
                    <el-switch v-model="form.enableStatus"></el-switch>
                </el-form-item>
                <el-form-item label="角色" prop="roleIds" style="width:100%">
                    <el-checkbox-group v-model="roleIds">
                        <el-checkbox v-for="item in roles" :label="item.id" :key="item.id">{{item.roleName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="submitForm" type="primary" :loading="loading">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import {deleteRow} from "@/utils/tool";
import {stdCodes} from "@/api/stdCode";
import {
    chekeUsername,
    disableUser,
    rePassword,
    chekeMobile,
    listUser,
    getRoles,
    saveUser,
    getUser,
    updateUser,
    delUser
} from "@/api/user";

export default {
    name: "user",
    data() {
        const validateName = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入用户名"));
            } else if (value.length < 2 || value.length > 20) {
                callback(new Error("用户名要求2-20个字符"));
            } else {
                let params = {username: value};
                if (!this.addStatus) {
                    params.id = this.form.id;
                }
                chekeUsername(params).then((res) => {
                    if (res.data.result != "SUCCESS") {
                        callback(new Error("用户名校验失败！"));
                    } else if (!res.data.data) {
                        callback(new Error("该用户名已存在！"));
                    } else {
                        callback();
                    }
                });
            }
        };
        const validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入电话号码"));
            } else if (!this.isvalidPhone(value)) {
                callback(new Error("请输入正确的11位手机号码"));
            } else {
                let params = {mobile: value};
                if (!this.addStatus) {
                    params.id = this.form.id;
                }
                chekeMobile(params).then((res) => {
                    if (res.data.result != "SUCCESS") {
                        callback(new Error("手机号校验失败！"));
                    } else if (!res.data.data) {
                        callback(new Error("该手机号已存在！"));
                    } else {
                        callback();
                    }
                });
            }
        };
        const validatePass = (rule, value, callback) => {
            if (!this.addStatus) {
                callback();
                return;
            }
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 3) {
                callback(new Error("密码至少三位"));
            } else {
                if (this.form.checkPassword !== "") {
                    this.$refs.form.validateField("checkPassword");
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (!this.addStatus) {
                callback();
                return;
            }
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value.length < 3) {
                callback(new Error("密码至少三位"));
            } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            tableHeaders: [
                {prop: "username", label: "名称"},
                {prop: "email", label: "登陆账号"},
                {prop: "mobile", label: "手机号"}
            ],
            tableData: [],
            dialogVisible: false,
            dialogTitle: "",
            addStatus: true,
            roles: [],
            roleIds: [],
            total: 0,
            query: {
                pageNum: 1
            },
            stdCodeTypes: {
                enableStatus: {
                    name: "ENABLE_STATUS",
                    items: {}
                },
            },
            form: {
                id: "",
                username: "",
                nickName: "",
                email: "",
                password: "",
                checkPassword: "",
                mobile: "",
                enableStatus: true
            },
            rules: {
                username: [
                    {required: true, validator: validateName, trigger: "blur"}
                ],
                nickName: [
                    {required: true, message: "请输入名称", trigger: "blur"},
                    {min: 2, max: 20, message: "长度在 2 - 20 个字符", trigger: "blur"}
                ],
                password: [
                    {required: true, validator: validatePass, trigger: "blur"}
                ],
                checkPassword: [
                    {required: true, validator: validatePass2, trigger: "blur"}
                ],
                email: [
                    {required: false, message: "请输入邮箱地址", trigger: "blur"},
                    {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"},
                    {min: 6, max: 36, message: "长度在 3 - 36 个字符", trigger: "blur"}
                ],
                mobile: [
                    {required: true, validator: validPhone, trigger: "blur"}
                ],
                enableStatus: [
                    {required: true, message: "状态不能为空", trigger: "blur"}
                ]
            }
        };
    },
    created() {
        this.getData();
        this.getRoles();
        stdCodes(this.stdCodeTypes);
    },
    methods: {
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.getData();
        },
        enableStatusFormatter(row) {
            return this.stdCodeTypes.enableStatus.items[row.enableStatus];
        },
        disableUser(data) {
            this.$confirm("确定" + (data.enableStatus ? "禁用" : "启用") + "该用户吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                disableUser({id: data.id, enableStatus: !data.enableStatus}).then((res) => {
                    if (res.data.result == "SUCCESS") {
                        this.$message({
                            message: data.enableStatus ? "禁用成功" : "启用成功",
                            type: "success"
                        });
                        this.getData();
                    }
                });
            });
        },
        getData() {
            this.tableData = [];
            listUser(this.query).then((res) => {
                this.tableData = res.data.data.list;
                this.total = parseInt(res.data.data.total);
            });
        },
        getRoles() {
            getRoles().then((res) => {
                this.roles = res.data.data;
            });
        },
        dialogAdd() {
            this.resetForm();
            this.addStatus = true;
            this.dialogTitle = "添加";
            this.dialogVisible = true;
        },
        dialogEdit(row) {
            this.resetForm();
            getUser(row.id).then((res) => {
                if (res.data.result == "SUCCESS") {
                    this.addStatus = false;
                    this.dialogTitle = "编辑";
                    let user = res.data.data;
                    this.form = {
                        id: user.id,
                        username: user.username,
                        nickName: user.nickName,
                        email: user.email,
                        mobile: user.mobile,
                        enableStatus: user.enableStatus
                    };
                    this.$nextTick(() => {
                        this.roleIds = user.roleIds;
                        this.getRoles();
                    });
                    this.dialogVisible = true;
                }
            });
        },
        isvalidPhone(str) {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            return reg.test(str);
        },
        deleteBtn(row) {
            deleteRow("此操作将永久删除记录, 是否继续?", delUser, row.id, () => {
                this.getData();
            });
        },
        resetForm() {
            this.roleIds = [];
            this.form = {
                id: "",
                username: "",
                nickName: "",
                email: "",
                password: "",
                checkPassword: "",
                mobile: "",
                enableStatus: true
            };
        },
        resetPassword(data) {
            this.$confirm("此操作将 重置密码为123456, 是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                rePassword(data).then(res => {
                    if (res.data.result == "SUCCESS") {
                        this.$message({
                            message: "重置密码成功",
                            type: "success"
                        });
                    }
                }).catch(() => {
                    this.$message({
                        message: "重置密码失败",
                        type: "error"
                    });
                });
            });
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.roleIds.length === 0) {
                        this.$message({
                            message: "请至少选择一个角色",
                            type: "warning"
                        });
                        return false;
                    }
                    this.form.roleIds = this.roleIds;
                    this.loading = true;
                    if (this.addStatus) {
                        saveUser(qs.stringify(this.form)).then(() => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.resetForm();
                            this.$refs["form"].resetFields();
                            this.loading = false;
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(() => {
                            this.loading = false;
                        });
                    } else {
                        updateUser(qs.stringify(this.form)).then(() => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.resetForm();
                            this.$refs["form"].resetFields();
                            this.loading = false;
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(() => {
                            this.loading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .user {
        min-width: 1090px;

        .content {
            height: 100%;

            .handleBtn {
                padding: 0 2px;

                &:after {
                    border: none !important;
                }
            }
        }
    }

    .dialogBox {
        .el-form {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;

            .el-form-item {
                width: 50%;
            }

            .btnGroup {
                width: 100%;
            }
        }
    }
</style>
