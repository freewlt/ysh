<template>
    <div class="resource">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button @click="dialogAdd" type="primary">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="tableData"
                        :key="handleCount"
                        :load="load"
                        :tree-props="{children: 'childrens', hasChildren: 'parentFlag'}"
                        border
                        lazy
                        row-key="id">
                    <template v-for="item in tableHeaders">
                        <el-table-column :align="item.align" :key="item.prop" :label="item.label"
                                         :prop="item.prop"></el-table-column>
                    </template>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-link @click="dialogEdit(scope.$index, scope.row)" class="handleBtn" type="primary">编辑
                            </el-link>
                            <el-link @click="deleteBtn(scope.$index, scope.row)" class="handleBtn" type="danger">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 添加或修改区域对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="dialogBox" v-if="dialogVisible">
            <el-form :model="form" :rules="rules" label-width="80px" ref="form">
                <el-form-item label="区域名称" prop="name">
                    <el-input placeholder="2-20个字符" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级区域" prop="parentId">
                    <area-tree-async :disabledId="disabledId" :placeholder="placeholder"
                                     @dataChange="inputHandle"></area-tree-async>
                </el-form-item>
                <el-form-item label="车牌前缀" prop="carPrefix">
                    <el-input placeholder="2-20个字符" v-model="form.carPrefix"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number :max="999" :min="1" v-model="form.sort"></el-input-number>
                </el-form-item>
                <el-form-item label="区域编码" prop="areaCode">
                    <el-input maxlength="20" placeholder="2-20个字符" v-model="form.areaCode"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button :loading="btnLoading" @click="submitForm" type="primary">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import qs from "qs";
import {asyncArea, deleteArea, getArea, saveArea, updateArea} from "@/api/area";
import {deleteRow} from "@/utils/tool";

import areaTreeAsync from "@/components/area/areaTreeAsync";

export default {
    name: "Area",
    components: {areaTreeAsync},
    data() {
        return {
            // table表头
            tableHeaders: [
                {prop: "name", label: "名称", align: "left"},
                {prop: "fullName", label: "区域全名", align: "left"},
                {prop: "areaCode", label: "区域编码", align: "left"},
                {prop: "createDate", label: "创建时间", align: "center"}
            ],
            // 区域列表数据
            tableData: [],
            handleCount: 0,
            // dialog
            dialogVisible: false,
            dialogTitle: "",
            // 表单参数
            form: {
                id: "",
                name: "",
                parentId: null,
                parentName: "",
                sort: "500",
                areaCode: "",
                carPrefix: ""
            },
            // 表单校验
            rules: {
                name: [
                    {required: true, message: "请输入区域名称", trigger: "blur"},
                    {min: 2, max: 20, message: "请输入名称 2 到 20 个字符", trigger: "blur"}
                ],
                sort: [
                    {required: true, message: "请输入排序", trigger: "change"},
                    {type: "number", min: 0, max: 999, message: "请输入排序 0 - 999之间", trigger: "blur"}
                ]
            },
            // vue-treeselect 显示状态
            addStatus: true,
            // 提交按钮 loading 状态
            btnLoading: false,
            placeholder: "请选择",
            //排除的id
            disabledId: null
        };
    },
    watch: {
        tableData() {
            return ++this.handleCount;
        }
    },
    created() {
        this.getData();
    },
    methods: {

        // 获取table数据
        getData() {
            this.tableData = [];
            asyncArea().then((res) => {
                this.tableData = res.data.data;
            });
        },

        // table 懒加载
        load(tree, treeNode, resolve) {
            let params = {
                parentId: tree.id
            };

            asyncArea(params, {contentLoading: false}).then((res) => {
                resolve(res.data.data);
            });
        },

        // 删除table行操作
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteArea, row.id, () => {
                this.getData();
            });
        },

        // 清空表单数据
        clear() {
            for (let key in this.form) {
                this.form[key] = null;
            }
            this.form.sort = "500";
        },

        // 添加操作对话框
        dialogAdd() {
            this.clear();
            this.disabledId = null;
            this.addStatus = true;
            this.dialogTitle = "添加区域";
            this.dialogVisible = true;
            this.placeholder = "请选择";
        },
        // 接收传值
        inputHandle(selectedId) {
            this.form.parentId = selectedId;
        },

        // 编辑操作对话框
        dialogEdit(index, row) {
            this.clear();
            getArea(row.id).then((res) => {
                for (let key in this.form) {
                    this.form[key] = res.data.data[key];
                }
                if (this.form.parentId == "") {
                    this.form.parentId = null;
                }
                if (this.form.parentName == "") {
                    this.placeholder = "请选择";
                } else {
                    this.placeholder = this.form.parentName;
                }
                this.disabledId = this.form.id;
                this.addStatus = false;
                this.dialogTitle = "编辑区域";
                this.dialogVisible = true;
            });
        },

        // 提交表单
        submitForm() {
            const _this = this;
            _this.btnLoading = true;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        saveArea(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            _this.dialogVisible = false;
                            _this.getData();
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
                        updateArea(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            _this.dialogVisible = false;
                            _this.getData();
                        }).catch(function() {
                            _this.btnLoading = false;
                        });
                    } else {
                        _this.btnLoading = false;
                    }
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .resource {
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
        }
    }
</style>
