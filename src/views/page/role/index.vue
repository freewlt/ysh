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
                :tree-props="{children: 'childrens', hasChildren: 'parent'}">
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
    import { mapState } from 'vuex';
    import {deleteResource, asyncResource} from '@/api/resource'

    import ResourceDialogAdd from "./add";
    import ResourceDialogEdit from "./edit";

    export default {
        name: 'resource',
        components: {ResourceDialogEdit, ResourceDialogAdd},
        data () {
            return {
                tableHeaders: [
                    {prop: 'name', label: '名称'},
                    {prop: 'url', label: 'url'},
                    {prop: 'createDate', label: '创建时间'}
                ],
                treeSelData: [],
                dialogEditTitle: '',
                dialogAddTitle: ''
            }
        },
//  created () {
//    this.getData()
//  },
        computed: {
            ...mapState({
                treeSelData: (sate) => sate.resource.treeSelData,
            })
        },
        methods: {
            // 添加对话框
            dialogTableAdd(e) {
                this.$refs.elDialogAdd.dialogAddVisible  = true;
                this.dialogAddTitle = e;
                this.$refs.elDialogAdd.addBtn()
            },
            // 编辑对话框
            editBtn(index, row, title) {
                this.$refs.elDialogEdit.dialogEditVisible  = true
                this.$refs.elDialogEdit.editBtn(row.id, title)
            },
            // 删除
            deleteBtn (index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteResource(row.id).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            load (tree, treeNode, resolve) {
                let params = {
                    parentId: tree.id
                }
                asyncResource(params).then((res) => {
                    resolve(res.data)
                })
            },
        }
    }
</script>

<style lang="less" scoped>
  .resource {
    /*min-width: 1100px;*/
    .content{
      height: 100%;
      .handleBtn{
        font-size: 14px;
        font-style: normal;
        cursor: pointer;
      }
    }
  }
</style>
