<template>
    <div class="stdCode">
        <!--主要内容-->
        <div class="stdCodeContent">
            <div class="btnCondition">

                <div class="searchBox">
                    <div class="left">
                        <el-button type="primary" @click="dialogAdd">添 加</el-button>
                    </div>

                    <div class="right">
                        <el-input placeholder="编码" v-model="queryData.code" class="nouveau"></el-input>
                        <el-input placeholder="编码名称" v-model="queryData.codeName" class="nouveau"></el-input>
                        <el-button @click="getData">搜索</el-button>
                    </div>

                </div>


            </div>
            <div class="dataTable">
                <el-table :data="tableData"  v-loading="loadingSon" border>
                    <el-table-column prop="code" label="编码"></el-table-column>
                    <el-table-column prop="codeName" label="编码名称"></el-table-column>
                    <el-table-column prop="isEnabled" label="是否可用" :formatter="formatEnableStatus"></el-table-column>
                    <el-table-column prop="codeRemark" label="备注"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-link type="primary" class="handleBtn" @click="dialogEdit(scope.$index, scope.row)">编辑
                            </el-link>
                            <el-link type="danger" class="handleBtn" @click="deleteBtn(scope.$index, scope.row)">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pageBox">
                <el-pagination :current-page="queryData.pageNum" :total="total" @current-change="changePage"/>
            </div>
        </div>

        <!-- 添加或者编辑 弹窗 -->
        <el-dialog class="dialogBox" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible"
                   :close-on-click-modal="false" :modal-append-to-body="true" append-to-body>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="编码" prop="code">
                    <el-input v-model="form.code" placeholder="请输入1-32个字符"></el-input>
                </el-form-item>
                <el-form-item label="编码名称" prop="codeName">
                    <el-input v-model="form.codeName" placeholder="请输入1-32个字符"></el-input>
                </el-form-item>
                <el-form-item label="是否可用" prop="enableStatus">
                    <el-radio v-model="form.enableStatus" label="1">是</el-radio>
                    <el-radio v-model="form.enableStatus" label="0">否</el-radio>
                </el-form-item>

                <el-form-item label="备注" prop="codeRemark">
                    <el-input v-model="form.codeRemark" placeholder="请输入0-256个字符" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort" :min="0" :max="999"></el-input-number>
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

import {list, getStdcode, saveStdcode, updateStdcode,deleteStdcode} from "@/api/stdCode";
import {deleteRow} from "@/utils/tool";


export default {
    name: "stdCode",
    props: ["codeTypeId"],
    data() {
        return {
            // 遮罩层
            loadingSon: true,
            //数据
            tableData: [],
            //总条数
            total: 0,
            ///列表查询参数
            queryData: {
                code: "",
                codeName: "",
                codeType: "",
                pageNum:1,
                pageSize:10,
            },
            //添加或者修改弹框显示控制参数
            dialogVisible: false,
            //弹框标题
            dialogTitle: "",
            //弹框表单属性
            form: {
                id: "",
                code: "",
                codeName: "",
                codeRemark: "",
                enableStatus: "",
                codeType: "",
                sort: ""
            },
            //表单验证规则
            rules: {
                code: [
                    {required: true, message: "请输入编码", trigger: "blur"},
                    {min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur"}
                ],
                codeName: [
                    {required: true, message: "请输入编码名称", trigger: "blur"},
                    {min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur"}
                ],
                codeRemark: [
                    {min: 0, max: 256, message: "请输入0-256个字符", trigger: "blur"}
                ],
                sort: [
                    {type:"number", min: 0, max: 999, message: "请输入排序0-999之间数字", trigger: "blur"}
                ],
                enableStatus: [
                    {required: true, message: "是否可用不能为空", trigger: "blur"}
                ]
            },
            //弹框添加状态
            addStatus: true
        };
    },
    //初始化
    created() {
        this.queryData.codeType=this.codeTypeId;
        this.getData();
    },
    methods: {

        ///指定页数查询
        changePage(pageNum) {
            this.queryData.pageNum = pageNum;
            this.getData();
        },

        formatEnableStatus: function(row) {
            if (row.enableStatus == 1) {
                return "是";
            } else if (row.enableStatus == 0) {
                return "否";
            } else {
                return "未知";
            }
        },
        // 获取table数据
        getData() {
            this.loadingSon = true;
            list(this.queryData).then((res) => {
                this.tableData = res.data.data.list;
                this.total = parseInt(res.data.data.total);
                this.loadingSon = false;
            });
        },

        // 删除
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?",deleteStdcode, row.id, () => {
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
            this.form.codeType=this.codeTypeId;
            this.form.enableStatus="1";//默认选中
            this.addStatus = true;
            this.dialogVisible = true;
            this.dialogTitle = "添加";

        },

        // 编辑对话框
        dialogEdit(index, row) {
            this.clear();
            getStdcode(row.id).then((res) => {
                this.form = res.data.data;
                if(res.data.data.enableStatus){
                    this.form.enableStatus="1";
                }else{
                    this.form.enableStatus="0";
                }
                this.addStatus = false;
                this.dialogTitle = "编辑";
                this.dialogVisible = true;
            });
        },

        submitForm() {
            const _this = this;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.id = "";
                        saveStdcode(qs.stringify(this.form)).then((res) => {
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
                        updateStdcode(qs.stringify(this.form)).then((res) => {
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
        }
    }
};
</script>

<style lang="less" scoped>
    .stdCodeContent {
        width: 100%;
        background: #fff;
        box-sizing: border-box;
    }
    .stdCode {
        width: 96%;
        margin: 0 auto;

        .stdCodeContent {
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
                width: 100%;
            }

            .btnGroup {
                width: 100%;
            }
        }
    }

    .searchBox {
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        padding: 0px 0 10px 5px;
    }

    .searchBox .right .nouveau {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 100px !important;
    }
</style>
