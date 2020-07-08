<template>
    <div class="memberType">
        <div class="content">
            <!--添加按钮-->
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <!--列表数据-->
            <div class="dataTable">
                <el-table :data="tableData" border v-loading="loading">
                    <el-table-column label="编号" prop="code"/>
                    <el-table-column label="会员名称" prop="name"/>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-link class="handleBtn" type="primary" @click="dialogEdit(scope.row)">编辑</el-link>
                            <el-link class="handleBtn" type="danger" @click="deleteBtn(scope.$index, scope.row)">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pageBox">
                <el-pagination :current-page="query.pageNum" :total="total" @current-change="changePage"/>
            </div>

            <!-- 添加或修改会员类型对话框 -->
            <el-dialog :title="dialogTitle"
                       :visible.sync="dialogVisible"
                       class="dialogBox" v-if="dialogVisible">
                <el-form :model="form" label-width="80px" ref="form" :rules="rules">
                    <el-form-item label="编号" prop="code">
                        <el-input placeholder="请输入会员类型编号，1-4个字符" v-model="form.code"/>
                    </el-form-item>
                    <el-form-item label="会员名称" prop="name">
                        <el-input placeholder="请输入会员类型名称，2-20个字符" v-model="form.name"/>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer" slot="footer">
                    <el-button :loading="btnLoading" type="primary" @click="submitForm">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import {
    deleteOne,
    getOne,
    list,
    save,
    update
} from "@/api/memberType";
import {deleteRow} from "@/utils/tool";

export default {
    name: "memberType",
    data() {
        return {
            //遮罩层
            loading: true,
            //列表数据
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
                id: "",
                code: "",
                name: ""
            },
            addStatus: true,
            btnLoading: false,
            //表单校验
            rules: {
                code: [
                    {required: true, message: "会员类型编号识不能为空", trigger: "blur"},
                    {min: 1, max: 4, message: "请输入名称 1 到 4 个字符", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "会员类型名称不能为空", trigger: "blur"},
                    {min: 2, max: 20, message: "请输入会员类型名称 2 到 20 个字符", trigger: "blur"},
                ]
            }
        };
    },
    created() {
        this.getData();
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
        //分页查询
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.getData();
        },
        //新增按钮操作
        dialogAdd() {
            this.clear();
            this.addStatus = true;
            this.dialogTitle = "添加会员类型";
            this.dialogVisible = true;
        },
        // 清空表单数据
        clear() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },
        //编辑按钮操作
        dialogEdit(row) {
            this.clear();
            getOne(row.id).then((res) => {
                this.form.id = res.data.data.id;
                this.form.code = res.data.data.code;
                this.form.name = res.data.data.name;
                this.addStatus = false;
                this.dialogTitle = "编辑会员类型";
                this.dialogVisible = true;
            });
        },
        //提交操作
        submitForm() {
            const _this = this;
            _this.btnLoading = true;
            if (this.addStatus) { //新建保存
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        save(qs.stringify(this.form)).then((res) => {
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
            } else { //修改更新
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        update(qs.stringify(this.form)).then((res) => {
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
        //删除操作
        deleteBtn(index, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteOne, row.id, () => {
                this.getData();
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .memberType {
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