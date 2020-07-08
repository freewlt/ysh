<template>
    <div class="oil">
    <div class="content">
        <div class="btnCondition">
            <el-button @click="dialogAdd" type="primary">添 加</el-button>
        </div>
        <div class="dataTable">
            <el-table :data="tableData" v-loading="loading" border>
                <el-table-column label="油品名称" prop="name"/>
                <el-table-column label="油品类型" prop="oilType" :formatter="typeFormatter"/>
                <el-table-column label="税码" prop="taxCode" align="center" />
                <el-table-column label="是否启用" prop="showStatus" align="center">
                    <template slot-scope="scope">
                        <el-switch @change="handleStatusChange(scope.row)" v-model="scope.row.showStatus">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link @click="dialogEdit(scope.row.id)" class="handleBtn" type="primary">编辑</el-link>
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

        <!--         添加或修改角色配置对话框 -->
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogVisible"
                   class="dialogBox" v-if="dialogVisible">
            <el-form :model="form" :rules="rules" label-width="80px" ref="form">
                <el-form-item label="油品名称" prop="name">
                    <el-input placeholder="请输入油品名称，2-20个字符" v-model="form.name" maxlength="20"/>
                </el-form-item>
                <el-form-item label="油品类型" >
                    <el-radio-group v-model="form.oilType">
                        <el-radio :label="1">汽油</el-radio>
                        <el-radio :label="2">柴油</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="税码" prop="taxCode" >
                    <el-input placeholder="请输入税码，2-20个字符" v-model="form.taxCode" maxlength="20"/>
                </el-form-item>
                <el-form-item label="是否展示">
                    <el-switch v-model="form.showStatus"></el-switch>
                </el-form-item>

            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="submitForm" type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
    </div>
</template>

<script>
import {deleteOil, getOil, list, saveOil, updateOil} from "@/api/oil";
import {deleteRow} from "@/utils/tool";
import qs from "qs";
import {stdCodes} from "@/api/stdCode";

export default {
    name: "oil",
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
                pageNum: 1
            },
            //dialog
            dialogVisible: false,
            dialogTitle: "",
            // 表单参数
            form: {
                id: undefined,
                name: undefined,
                oilType: 1,
                taxCode: "",
                showStatus: "1"
            },
            // 表单校验
            rules: {
                name: [
                    {required: true, message: "油品名称不能为空", trigger: "blur"},
                    {min: 2, max: 20, message: "请输入名称 2 到 20 个字符", trigger: "blur"}
                ],
                taxCode: [
                    {required: true, message: "税码不能为空", trigger: "blur"}
                ]
            },
            addStatus: true,
            stdCodeTypes: {
                oilType: {
                    name: "OIL_TYPE",
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
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.getData();
        },
        //新增按钮操作
        dialogAdd() {
            this.clear();
            this.form.oilType = 1;
            this.form.showStatus = true;
            this.addStatus = true;
            this.dialogVisible = true;
            this.dialogTitle = "添加角色";
        },
        // 更新按钮操作
        dialogEdit(roleId) {
            // this.clear();
            this.addStatus = false;
            getOil(roleId).then((res) => {
                this.form.id = res.data.data.id;
                this.form.name = res.data.data.name;
                this.form.taxCode = res.data.data.taxCode;
                this.form.showStatus = res.data.data.showStatus;
                this.form.oilType = 1;
                this.dialogVisible = true;
                this.dialogTitle = "编辑角色";
            });
        },
        //标准编码解析
        typeFormatter(row) {
            return this.stdCodeTypes.oilType.items[row.oilType];
        },
        //删除操作
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteOil, row.id, () => {
                this.getData();
            });
        },
        // //提交操作
        submitForm() {
            const _this = this;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        saveOil(qs.stringify(this.form)).then((res) => {
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        });
                    }
                });
            } else {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        updateOil(qs.stringify(this.form)).then((res) => {
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        });
                    }
                });
            }
        },
        // 角色状态修改
        handleStatusChange(row) {
            const _this = this;
            let text = row.showStatus === true ? "启用" : "停用";
            this.$confirm("确认要" + text + "此角色吗?", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                _this.$message({
                    message: "操作页面效果成功，刷新数据恢复！",
                    type: "success"
                });
            }).catch(() => {
                row.showStatus = row.showStatus !== true;
            });
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
    .oil {
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