<template>
  <div class="user">
    <!--搜索条件-->
    <div class="searchCriteria">
      <div class="left">
        <el-input class="nouVen" placeholder="人员名称"></el-input>
        <el-input class="nouVen" placeholder="手机号"></el-input>
        <el-input class="nouVen" placeholder="请输入内容"></el-input>
        <el-date-picker class="dateChose" v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type="primary">搜索</el-button>
        <treeselect
          :options="treeSelData"
          :normalizer="normalizer"
          :load-options="loadOptions"
          placeholder="Try expanding any folder option..."
          v-model="value"
        />
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <div class="btnCondition">
        <el-button type="primary" @click="dialogTableVisible = true">添加用户</el-button>
      </div>
      <!--表格-->
      <div class="dataTable">
        <el-table :data="rowData" stripe>
          <template v-for="item in tableHeaders">
            <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
          </template>
          <el-table-column label="代理名称" class="daiLi">
            <template slot-scope="">
              <a class="buttonText" @click="look = true">查看详情</a>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="">
              <i class="handleBtn el-icon-edit"></i>
              <i class="handleBtn el-icon-share"></i>
              <!--<el-button class="handleBtn" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <!--<i class="iconfont icon-edit2" @click="handleEdit(scope.$index, scope.row)"></i>-->
              <!--<el-button class="handleBtn" @click="handleAdd(scope.$index, scope.row)">添加</el-button>-->
              <!--<el-button class="iconfont el-icon-close handleBtn" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新建" :visible.sync="dialogTableVisible">
      <user-add></user-add>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {fetchResource} from '@/api/resource'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import UserAdd from './add'

export default {
  name: 'user',
  components: { Treeselect, UserAdd },
  data () {
    return {
      breadList: [],
      value: '',
      value1: '',
      rowData: [
        {
          id: '2016-05-24',
          phone: '123465757',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          use: '可用',
          date: '2016-05-04',
          a: '2016-05-04',
          b: '2016-05-04',
          c: '2016-05-04',
          d: '2016-05-04',
          e: '2016-05-04',
          f: '2016-05-04',
          g: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-23',
          phone: '2235465',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          use: '可用',
          date: '2016-05-22',
          a: '2016-05-04',
          b: '2016-05-04',
          c: '2016-05-04',
          d: '2016-05-04',
          e: '2016-05-04',
          f: '2016-05-04',
          g: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016',
          phone: '4564537',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518',
          use: '可用',
          date: '2016-',
          lock: '未锁定'
        },
        {
          id: '2016-05-09',
          phone: '15742457557',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-08',
          phone: '15780022452',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-07',
          phone: '1888888888',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-06',
          phone: '15811124244',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-05',
          phone: '15811418144',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        },
        {
          id: '2016-05-04',
          phone: '15811418244',
          accountCode: '普陀区',
          address: '上海市普陀区金沙江路 1518',
          use: '可用',
          date: '2016-05-04',
          lock: '未锁定'
        }
      ],
      tableHeaders: [
        {prop: 'id', label: '人员名称'},
        {prop: 'platformName', label: '手机号'},
        {prop: 'accountCode', label: '角色名称'},
        {prop: 'use', label: '是否可用'},
        {prop: 'lock', label: '是否锁定'},
        {prop: 'date', label: '创建日期'},
        {prop: 'a', label: '创建日期'},
        {prop: 'b', label: '是否可用'},
        {prop: 'c', label: '是否锁定'},
        {prop: 'd', label: '创建日期'},
        {prop: 'e', label: '是否可用'},
        {prop: 'f', label: '是否锁定'},
        {prop: 'g', label: '创建日期'}
      ],
      operations: [
        {
          icon: 'iconfont icon-edit2',
          className: 'blue',
          label: '编辑',
          width: '172px',
          title: '编辑',
          clickFn: (index, data) => {
            this.$emit('openSuppliersDialog', {create: false, editData: data})
            // this.$emit('openSuppliersDialog', {create: false, editData: data});
            // this.$set(this.rowData[$index], 'editing', true)
            this.$router.push('/home/index-system/member-edit')
          }
        }
      ],
      dialogTableVisible: false,
      currentPage3: 5,
      parentId: '',
      treeSelData: []
    }
  },
  created () {
    var _this = this
    axios.get('http://192.168.0.226:7070/api-base/permission/tree-nodes').then(function (res) {
      _this.treeSelData = res.data.data
    }).catch(function (error) {
      console.log(error)
    })

    this.getData()
  },
  methods: {

    // 获取数据
    getData () {
      const _this = this
      fetchResource().then((res) => {
        _this.treeSelData = res.data
        for (let i = 0; i < _this.treeSelData.length; i++) {
          _this.treeSelData[i].childrens = null
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    /** 转换菜单数据结构 */
    normalizer (node) {
      return {
        id: node.id,
        label: node.name,
        children: node.childrens
      }
    },
    // 懒加载
    loadOptions ({ parentNode, callback }) {
      let params = {
        id: parentNode.id
      }
      fetchResource(params).then((res) => {
        //        parentNode.childrens = [{
        //          id: '141',
        //          name: '15'
        //        }]
        parentNode.childrens = res.data
        callback()
      }).catch((err) => {
        console.log(err)
      })
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .user {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .content{
      max-height: calc(100% - 128px);
      min-height: calc(100% - 92px);
      margin-top:10px;
      .dataTable{
        .handleBtn{
          display: inline-block;
          vertical-align: middle;
          font-size: 18px;
        }
      }
      .pageBox{
        width: 100%;
        margin: 20px auto;
        text-align: center;
      }
    }
  }
</style>
