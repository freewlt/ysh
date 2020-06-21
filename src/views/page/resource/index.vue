<template>
  <div class="resource">
    <!--面包屑导航-->
    <bread-crumb-box :breadList="breadList"></bread-crumb-box>
    <!--主要内容-->
    <div class="content">
      <div class="btnCondition">
        <el-button type="primary" @click="dialogTable('添加')">添 加</el-button>
      </div>
      <div class="dataTable">
        <el-table
          :data="treeSelData"
          row-key="id"
          border
          lazy
          :load="load"
          :tree-props="{children: 'childrens', hasChildren: 'flag'}">
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
    <!--弹窗资源新建-->
    <resource-add :dialogTableTitle="dialogTableTitle"></resource-add>
  </div>
</template>

<script>
import {fetchMenu, getResource, deleteTreeData} from '@/utils/api/menu'
import {setStore} from '@/utils/localStorage'

// import ResourceTable from '@/components/resource/tableLoad'
import BreadCrumbBox from '@/components/common/breadCrumb/breadCrumb'
import resourceAdd from './add'

export default {
  name: 'resource',
  components: {resourceAdd, BreadCrumbBox},
  data () {
    return {
      breadList: [
        {name: '首页', path: '/home'},
        {name: '资源管理', path: '/home/resource'}
      ],
      tableHeaders: [
        {prop: 'name', label: '名称'},
        {prop: 'url', label: 'url'},
        {prop: 'createDate', label: '创建时间'}
      ],
      treeSelData: [],
      dialogVisible: false,
      dialogTableTitle: ''
    }
  },
  created () {
    this.treeSelLoad()
  },
  methods: {
    // 显示对话框
    dialogTable (e) {
      console.log('显示对话框');
      this.dialogVisible = true
      this.dialogTableTitle = e
    },
    // 编辑
    editBtn (index, row, title) {
      //      const _this = this
      console.log(row)
      this.dialogVisible = true
      this.dialogTableTitle = title
      getResource(row.id, true).then((res) => {
        const editData = res.data
        setStore('name', editData.name)
        setStore('sort', editData.sort)
        setStore('url', editData.url)
        setStore('menu', editData.parentId)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除
    deleteBtn (index, row) {
      deleteTreeData(row.id).then(() => {
        this.$router.go(0)
      }).catch((err) => {
        console.log(err)
      })
    },
    load (tree, treeNode, resolve) {
      console.log(tree, 'tree.childrens')
      let params = {
        id: tree.id
      }
      fetchMenu(params).then((res) => {
        console.log(res.data, 'res.data')
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    treeSelLoad () {
      const _this = this
      fetchMenu().then(function (res) {
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
    width: 100%;
    height: 100%;
    overflow-y: auto;
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