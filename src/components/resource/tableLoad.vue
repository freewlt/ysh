<template>
    <div class="resourceTable">
        <el-table
                :data="rowData"
                row-key="id"
                border
                lazy
                :load="load"
                :tree-props="{children: 'childrens', hasChildren: 'flag'}">
            <template v-for="item in tableHeaders">
                <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
            </template>
            <el-table-column label="操作">
                <template slot-scope="">
                    <i class="handleBtn el-icon-edit"></i>
                    <i class="handleBtn el-icon-delete"></i>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "resourceTable",
        props: ["tableHeaders", "rowData"],
        data () {
            return {};
        },
        methods: {
            load (tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve(tree.childrens);
                }, 1000);
            }
        }
    };
</script>

<style lang="less" scoped>
    .resourceManage {
        table {
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>
