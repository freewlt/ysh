<template>
    <div class="roles">
        <!--搜索条件-->
        <div class="queryCriteria">
            <el-form :inline="true" :model="query" class="queryItem">
                <el-form-item label="角色名称:">
                    <el-input maxlength="20" placeholder="角色名称" v-model="query.roleName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="queryData" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <div class="btnCondition">
                <el-button @click="dialogAdd" type="primary">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table :data="tableData" border v-loading="loading">
                    <el-table-column label="角色名称" prop="roleName"/>
                    <el-table-column label="角色编码" prop="roleCode"/>
                    <el-table-column :formatter="enableStatusFormatter" align="center" label="启用状态"
                                     prop="enableStatus"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-link @click="dialogStatus(scope.row)" class="handleBtn" type="info"
                                     v-if="scope.row.enableStatus">禁用
                            </el-link>
                            <el-link @click="dialogStatus(scope.row)" class="handleBtn" type="success" v-else>启用
                            </el-link>
                            <el-link @click="dialogEdit(scope.row)" class="handleBtn" type="primary">编辑</el-link>
                            <el-link @click="deleteBtn(scope.$index, scope.row)" class="handleBtn" type="danger">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pageBox">
                <el-pagination :current-page="query.pageNum" :total="total" @current-change="changePage"/>
            </div>
            <!-- 添加或修改角色配置对话框 -->
            <el-dialog :title="dialogTitle"
                       :visible.sync="dialogVisible"
                       class="dialogBox" v-if="dialogVisible">
                <el-form :model="form" :rules="rules" label-width="80px" ref="form">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input placeholder="请输入角色名称，2-20个字符" v-model="form.roleName"/>
                    </el-form-item>
                    <el-form-item label="角色编码" prop="roleCode">
                        <el-input placeholder="请输入角色编码，2-20个字符" v-model="form.roleCode"/>
                    </el-form-item>
                    <el-form-item label="启用状态">
                        <el-switch v-model="form.enableStatus"/>
                    </el-form-item>
                    <el-form-item label="菜单权限" prop="permissionIds">
                        <permission-tree :checked-id="form.permissionIds" :limit="6" :multiple="true"
                                         @dataChange="permissionDataChange">
                        </permission-tree>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input placeholder="请输入备注内容" type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer" slot="footer">
                    <el-button :loading="btnLoading" @click="submitForm" type="primary">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import {deleteRole, disabledRole, getRole, list, saveRole, updateRole} from "@/api/role";
import {deleteRow} from "@/utils/tool";
import {stdCodes} from "@/api/stdCode";

import PermissionTree from "@/components/permission/permissionTree";

export default {
    name: "role",
    components: {PermissionTree},			// 引用的组件
    data() {
        return {
            // 遮罩层
            loading: true,
            //角色列表数据
            tableData: [],
            //总条数
            total: 0,
            //查询参数
            query: {
                pageNum: 1,
                roleName: "",
            },
            //dialog
            dialogVisible: false,
            dialogTitle: "",
            // 表单参数
            form: {
                id: undefined,
                roleName: undefined,
                roleCode: undefined,
                enableStatus: "0",
                permissionIds: [],
                remark: undefined
            },
            // 表单校验
            rules: {
                roleName: [
                    {required: true, message: "角色名称不能为空", trigger: "blur"},
                    {min: 2, max: 20, message: "请输入名称 2 到 20 个字符", trigger: "blur"}
                ],
                roleCode: [
                    {required: true, message: "角色编码不能为空", trigger: "blur"},
                    {min: 2, max: 20, message: "请输入编码 2 到 20 个字符", trigger: "blur"}
                ]
            },
            addStatus: true,
            btnLoading: false,
            stdCodeTypes: {
                enableStatus: {
                    name: "ENABLE_STATUS",
                    items: {}
                },
            }
        };
    },
    created() {
        this.getData();
        stdCodes(this.stdCodeTypes);
    },
    methods: {
        //查询列表数据
        getData() {
            this.loading = true;
            list(this.query).then((res) => {
                this.tableData = res.data.data.list;
                this.total = parseInt(res.data.data.total);
                this.loading = false;
            });
        },
        queryData() {
            this.query.pageNum = 1;
            this.getData();
        },
        enableStatusFormatter(row) {
            return this.stdCodeTypes.enableStatus.items[row.enableStatus];
        },
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.getData();
        },
        //新增按钮操作
        dialogAdd() {
            this.clear();
            this.addStatus = true;
            this.dialogTitle = "添加角色";
            this.dialogVisible = true;
        },
        //更新按钮操作
        dialogEdit(row) {
            this.clear();
            getRole(row.id).then((res) => {
                this.form = res.data.data;
                this.addStatus = false;
                this.dialogTitle = "编辑角色";
                this.dialogVisible = true;
            });
        },
        //删除操作
        deleteBtn(index, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteRole, row.id, () => {
                this.getData();
            });
        },
        //提交操作
        submitForm() {
            const _this = this;
            _this.btnLoading = true;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        saveRole(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(function() {
                            _this.btnLoading = false;
                        });
                    } else {
                        _this.btnLoading = false;
                    }
                });
            } else {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        updateRole(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(function() {
                            _this.btnLoading = false;
                        });
                    } else {
                        _this.btnLoading = false;
                    }
                });
            }
        },
        // 角色状态启用禁用
        dialogStatus(row) {
            const _this = this;
            let text = row.enableStatus === true ? "禁用" : "启用";
            this.$confirm("确认要" + text + "此角色吗?", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                disabledRole(row.id).then((res) => {
                    _this.$message({
                        message: res.data.message,
                        type: "success"
                    });
                    this.getData();
                });
            });
        },
        // 接收传值
        permissionDataChange(val) {
            this.form.permissionIds = val;
        },
        // 清空表单数据
        clear() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        }
    }
};
</script>


<style lang="less" scoped>
    .roles {
        min-width: 1090px;

        .content {

            .handleBtn {
                padding: 0 2px;

                &:after {
                    border: none !important;
                }
            }
        }
    }
</style>
