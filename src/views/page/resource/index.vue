<template>
  <div class="resource" ref="resource">
    <!--面包屑导航-->
    <bread-crumb-box :breadList="breadList"></bread-crumb-box>
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
    <!-- loading -->
    <shade-box v-if="isShow"></shade-box>
  </div>
</template>

<script>
import {fetchResource, deleteResource} from '@/api/resource'

import BreadCrumbBox from '@/components/common/breadCrumb/breadCrumb'
import ShadeBox from '@/components/common/loading/shadeBox'
import ResourceDialogAdd from "./add";
import ResourceDialogEdit from "./edit";

export default {
  name: 'resource',
  components: {ResourceDialogEdit, ResourceDialogAdd, ShadeBox, BreadCrumbBox},
  data () {
    return {
      breadList: [],
      tableHeaders: [
        {prop: 'name', label: '名称'},
        {prop: 'url', label: 'url'},
        {prop: 'createDate', label: '创建时间'}
      ],
      treeSelData: [],
      dialogEditTitle: '',
      dialogAddTitle: '',
      isShow: false
    }
  },
  created () {
    this.treeSelLoad()
    this.breadNav()
  },
  methods: {
    // 面包屑导航获取
    breadNav () {
      this.breadList = this.$route.matched
    },
    // 添加对话框
    dialogTableAdd(e) {
      this.$refs.elDialogAdd.dialogAddVisible  = true
      this.dialogAddTitle = e
    },
    // 编辑
    editBtn(index, row, title) {
      this.$refs.elDialogEdit.dialogEditVisible  = true
      this.$refs.elDialogEdit.editBtn(row.id, title)
    },
    // 删除
    deleteBtn (index, row) {
      deleteResource(row.id).then(() => {
        this.$router.go(0)
      }).catch((err) => {
        console.log(err)
      })
    },
    load (tree, treeNode, resolve) {
      let params = {
        id: tree.id
      }
      fetchResource(params).then((res) => {
              resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    treeSelLoad () {
      const _this = this
      fetchResource().then(function (res) {
        //        console.log(res.data)
        _this.treeSelData = res.data
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .resource {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    /*min-width: 1100px;*/
    .content{
      min-height: calc(100% - 65px);
      .handleBtn{
        font-size: 14px;
        font-style: normal;
        cursor: pointer;
      }
    }
  }
</style>
