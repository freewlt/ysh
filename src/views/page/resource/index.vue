<template>
    <div class="resource">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="tableData"
                        row-key="id"
                        :key="handleCount"
                        border
                        lazy
                        :load="load"
                        :tree-props="{children: 'childrens', hasChildren: 'parentFlag'}">
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"
                                         :align="item.align"></el-table-column>
                    </template>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" class="handleBtn" @click="dialogEdit(scope.$index, scope.row)">编辑
                            </el-link>
                            <el-link type="danger" class="handleBtn" @click="deleteBtn(scope.$index, scope.row)">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 添加或修改资源配置对话框 -->
        <el-dialog class="dialogBox" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" maxlength="20" placeholder="2-20个字符"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentId">
                    <resource-tree-async v-if="addStatus" :checked-id="form.parentId"
                                         @dataChange="inputHandle"></resource-tree-async>
                    <resource-tree v-else :checked-id="form.parentId" @dataChange="inputHandle"
                                   :excluedId="form.id" :multiple="false"></resource-tree>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort" :min="1" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label="url" prop="url" class="formItemWidth">
                    <el-input v-model="form.url"  maxlength="20" placeholder="2-20个字符"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="submitForm" type="primary" :loading="btnLoading">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import qs from "qs";
import { asyncResource, deleteResource, getResource, saveResource, updateResource } from "@/api/resource";

import { deleteRow } from "@/utils/tool";

import resourceTreeAsync from "@/components/resource/resourceTreeAsync";
import resourceTree from "@/components/resource/resourceTree";

export default {
    name: "resource",
    components: { resourceTree, resourceTreeAsync },
    data() {
        return {
            // table表头
            tableHeaders: [
                { prop: "name", label: "名称", align: "left" },
                { prop: "url", label: "url", align: "left" },
                { prop: "createDate", label: "创建时间", align: "center" }
            ],
            // 资源列表数据
            tableData: [],
            // dialog
            dialogVisible: false,
            dialogTitle: "",
            // 表单参数
            form: {
                id: "",
                name: "",
                parentId: null,
                sort: "500",
                url: ""
            },
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { min: 2, max: 20, message: "请输入名称 2 到 20 个字符", trigger: "blur" }
                ],
                sort: [
                    { required: true, message: "请输入排序", trigger: "change" },
                    { type: "number", min: 0, max: 999, message: "请输入排序 0 - 999之间", trigger: "blur" }
                ],
                url: [],
                parentId: []
            },
            // vue-treeselect 显示状态
            addStatus: true,
            handleCount: 0,
            // 提交按钮 loading 状态
            btnLoading: false
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
            asyncResource().then((res) => {
                this.tableData = res.data.data;
            });
        },

        // table 懒加载
        load(tree, treeNode, resolve) {
            let params = {
                parentId: tree.id
            };

            asyncResource(params,{contentLoading: false}).then((res) => {
                resolve(res.data.data);
            });
        },

        // 删除table行操作
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deleteResource, row.id, () => {
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
            this.addStatus = true;
            this.dialogTitle = "添加";
            this.dialogVisible = true;
        },
        // 接收传值
        inputHandle(selectedId) {
            this.form.parentId = selectedId;
        },

        // 编辑操作对话框
        dialogEdit(index, row) {
            this.clear();
            getResource(row.id).then((res) => {
                for (let key in this.form) {
                    this.form[key] = res.data.data[key];
                }
                if (this.form.parentId == "") {
                    this.form.parentId = null;
                }
                this.addStatus = false;
                this.dialogTitle = "编辑";
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
                        saveResource(qs.stringify(this.form)).then((res) => {
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
                        updateResource(qs.stringify(this.form)).then((res) => {
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
