<template>
    <div class="permission">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogTableAdd('添加')">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="treeTableData"
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
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {deleteResource, asyncResource} from "@/api/permission";
    import {deleteList} from "@/utils/tool";

    export default {
        name: "role",
        data () {
            return {
                tableHeaders: [
                    {prop: "name", label: "名称"},
                    {prop: "url", label: "url"},
                    {prop: "createDate", label: "创建时间"}
                ]
            };
        },
        computed: {
            ...mapState({
                treeTableData: (sate) => sate.permission.treeSelData,
            })
        },
        created () {
            this.getData();
        },
        methods: {
            // 获取table数据
            getData () {
                this.$store.dispatch("getTreeSel");
            },
            // 编辑
            editBtn () {

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
    .permission {
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
