<template>
    <div class="resource" ref="resource">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogTableAdd('添加')">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="treeSelData"
                        row-key="id"
                        border
                        lazy
                        :load="load"
                        :tree-props="{children: 'childrens', hasChildren: 'parentFlag'}">
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
                    </template>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <i class="handleBtn" @click="editBtn(scope.$index, scope.row, '编辑')">编辑</i>
                            <i class="handleBtn" @click="deleteBtn(scope.$index, scope.row)">删除</i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--弹窗资源编辑-->
        <resource-dialog-edit ref="elDialogEdit"></resource-dialog-edit>
        <!--弹窗资源新建-->
        <resource-dialog-add ref="elDialogAdd" :dialogTableTitle="dialogAddTitle"></resource-dialog-add>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {deleteResource, asyncResource} from "@/api/resource";
    import {deleteList} from "@/utils/tool";

    import ResourceDialogAdd from "./add";
    import ResourceDialogEdit from "./edit";

    export default {
        name: "resource",
        components: {ResourceDialogEdit, ResourceDialogAdd},
        data () {
            return {
                tableHeaders: [
                    {prop: "name", label: "名称"},
                    {prop: "url", label: "url"},
                    {prop: "createDate", label: "创建时间"}
                ],
                dialogEditTitle: "",
                dialogAddTitle: "",
            };
        },
        created () {
            this.getData();
        },
        computed: {
            ...mapState({
                treeSelData: (state) => state.resource.treeSelData
            })
        },
        methods: {
            // 获取table数据
            getData () {
                this.$store.dispatch("getTreeSelData");
            },
            // 添加对话框
            dialogTableAdd(e) {
                this.$refs.elDialogAdd.dialogAddVisible = true;
                this.dialogAddTitle = e;
                this.$refs.elDialogAdd.addBtn();
            },
            // 编辑对话框
            editBtn(index, row, title) {
                this.$refs.elDialogEdit.dialogEditVisible = true;
                this.$refs.elDialogEdit.editBtn(row.id, title);
            },
            // 删除
            deleteBtn (index, row) {
                deleteList(deleteResource, row.id);
                this.getData();
            },
            load (tree, treeNode, resolve) {
                let params = {
                    parentId: tree.id
                };
                asyncResource(params).then((res) => {
                    resolve(res.data);
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .resource {
        .content {
            height: 100%;
            .handleBtn {
                font-size: 14px;
                font-style: normal;
                cursor: pointer;
            }
        }
    }
</style>
