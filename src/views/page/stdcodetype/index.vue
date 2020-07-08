<template>
    <div class="stdCodeType">
        <!--搜索条件-->
        <div class="queryCriteria">
            <el-form :inline="true" :model="query" class="queryItem">
                <el-form-item label="编码类型:">
                    <el-input placeholder="编码类型" v-model="query.codeType"></el-input>
                </el-form-item>
                <el-form-item label="类型名称:">
                    <el-input placeholder="类型名称" v-model="query.codeTypeName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getData">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table :data="tableData" v-loading="loading" border>
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
                    </template>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-link type="primary" class="handleBtn" @click="dialogEdit(scope.$index, scope.row)">编辑
                            </el-link>
                            <el-link type="primary" class="handleBtn"
                                     @click="dialogStdCodeList(scope.$index, scope.row)">编码列表
                            </el-link>
                            <el-link type="danger" class="handleBtn" @click="deleteBtn(scope.$index, scope.row)">删除
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

        <div v-if="stdCodeListDialogFormVisible">
            <el-dialog title="编码列表" :visible.sync="stdCodeListDialogFormVisible" :modal-append-to-body="false">
                <StdCode :codeTypeId="codeTypeId"></StdCode>
            </el-dialog>
        </div>

        <!-- 添加或者编辑 弹窗 -->
        <el-dialog class="dialogBox" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="编码类型" prop="codeType">
                    <el-input v-model="form.codeType" placeholder="请输入1-32个字符"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="codeTypeName">
                    <el-input v-model="form.codeTypeName" placeholder="请输入1-32个字符"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" prop="codeTypeRemark">
                    <el-input v-model="form.codeTypeRemark" placeholder="请输入0-512个字符" type="textarea"></el-input>
                </el-form-item>


            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button type="primary" @click="submitForm">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import qs from "qs";
import {list, deleteStdcodeType, getStdcodeType, saveStdcodeType, updateStdcodeType} from "@/api/stdCodeType";

import {deleteRow} from "@/utils/tool";

import StdCode from "@/views/page/stdcode/index";

export default {
    name: "stdCodeType",
    components: {StdCode},
    data() {
        return {
            // 遮罩层
            loading: true,
            //数据列
            tableHeaders: [
                {prop: "codeType", label: "编码类型"},
                {prop: "codeTypeName", label: "类型名称"},
                {prop: "codeTypeRemark", label: "类型描述"},
                {prop: "modifyDate", label: "修改时间"},
                {prop: "createDate", label: "创建时间"}
            ],
            //数据
            tableData: [],
            //总条数
            total: 0,
            ///列表查询参数
            query: {
                codeType: "",
                codeTypeName: "",
                pageNum: 1,
                pageSize: 10
            },
            //添加或者修改弹框显示控制参数
            dialogVisible: false,
            //弹框标题
            dialogTitle: "",
            //弹框表单属性
            form: {
                id: "",
                codeType: "",
                codeTypeName: "",
                codeTypeRemark: ""
            },
            //表单验证规则
            rules: {
                codeType: [
                    {required: true, message: "请输入编码类型", trigger: "blur"},
                    {min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur"}
                ],
                codeTypeRemark: [
                    {min: 0, max: 512, message: "请输入0-512个字符", trigger: "blur"}
                ],
                codeTypeName: [
                    {required: true, message: "请输入类型名称", trigger: "blur"},
                    {min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur"}
                ]
            },
            //弹框添加状态
            addStatus: true,
            //编码弹框参数
            codeTypeId: "",
            stdCodeListDialogFormVisible: false,
        };
    },
    //初始化
    created() {
        this.getData();
    },
    methods: {

        ///指定页数查询
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.getData();
        },

        // 获取table数据
        getData() {

            this.loading = true;
            list(this.query).then((res) => {
                this.tableData = res.data.data.list;
                this.total = parseInt(res.data.data.total);
                this.loading = false;
            });
        },

        // 删除
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteStdcodeType, row.id, () => {
                this.getData();
            });
        },
        ///清空表单
        clear() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },

        // 添加对话框
        dialogAdd() {
            this.clear();
            this.addStatus = true;
            this.dialogVisible = true;
            this.dialogTitle = "添加";

        },

        // 编辑对话框
        dialogEdit(index, row) {
            this.clear();
            getStdcodeType(row.id).then((res) => {
                this.form = res.data.data;
                this.addStatus = false;
                this.dialogTitle = "编辑";
                this.dialogVisible = true;
            });
        },
        //保存
        submitForm() {
            const _this = this;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.id = "";
                        saveStdcodeType(qs.stringify(this.form)).then((res) => {
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
                        updateStdcodeType(qs.stringify(this.form)).then((res) => {
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
        //编码列表
        dialogStdCodeList(index, row) {
            this.codeTypeId = row.id;
            this.stdCodeListDialogFormVisible = true;
        }

    }
};
</script>

<style lang="less" scoped>
    .stdCodeType {
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
