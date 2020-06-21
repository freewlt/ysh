<template>
  <!--<div class="resourceAdd">-->
  <el-dialog class="resourceAdd" :title="dialogTableTitle" :visible.sync="dialogTableVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <treeselect
          :options="treeSelData"
          :normalizer="normalizer"
          :load-options="loadOptions"
          placeholder="请选择"
          v-model="ruleForm.menu"
        />
      </el-form-item>
      <!--<el-form-item label="上级菜单">-->
        <!--<tree-select-single v-model="ruleForm.menu" @inputHandle="inputHandle" :treeSelData="treeSelData"></tree-select-single>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="上级菜单">-->
        <!--<tree-select-mut @inputHandle="inputHandle" :treeSelData="treeSelData"></tree-select-mut>-->
      <!--</el-form-item>-->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ruleForm.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="ruleForm.url" placeholder="请输入url"></el-input>
      </el-form-item>
      <el-form-item class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isDisabled">保 存</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  <!--</div>-->
</template>

<script>

import {fetchMenu, saveResource, editMenu} from '@/utils/api/menu'
import {getStore} from '@/utils/localStorage'
import { formdata } from '@/utils/tool'

// import TreeSelectMut from '@/components/treeSelect/treeSelectMut'
// import TreeSelectSingle from '@/components/treeSelect/treeSelectSingle'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

        
export default {
  name: 'resourceAdd',
  components: { Treeselect },
  props: ['dialogTableTitle'],
  data () {
    return {
      ruleForm: {
        name: '',
        menu: null,
        sort: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'change' },
          { min: 1, max: 3, message: '只能输入数字，默认500', trigger: 'blur' }
        ]
      },
      treeSelData: [],
      dialogTableVisible: true,
      isDisabled: false
    }
  },
  
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      const _this = this
      if (this.dialogTableTitle === '添加') {
        fetchMenu().then((res) => {
          _this.treeSelData = res.data
          for (let i = 0; i < _this.treeSelData.length; i++) {
            _this.treeSelData[i].childrens = null
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        editMenu().then((res) => {
          _this.treeSelData = res.data

          this.ruleForm.name = getStore('name')
          this.ruleForm.sort = getStore('sort')
          this.ruleForm.menu = []
          this.ruleForm.url = getStore('url')
        }).catch((err) => {
          console.log(err)
        })
      }
    },

    //    // 获取当前点击菜单值
    //    inputHandle (val) {
    //      if (Array.isArray(val)) {
    //        this.ruleForm.menu = val
    //      } else {
    //        this.ruleForm.menu = val.name
    //      }
    //    },

    /** 转换菜单数据结构 */
    normalizer (node) {
      if (node.childrens && !node.childrens.length) {
        delete node.childrens
      }
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
      fetchMenu(params).then((res) => {
        parentNode.childrens = res.data
        callback()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 传值
//    selectDepart (val) {
//      console.log(val)
//      this.ruleForm.menu = val
//    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveResource(formdata(this.ruleForm)).then((res) => {
//            const timer = setInterval(() => {
//              this.isDisabled = !this.isDisabled
//            }, 100)
            if (res.result === 'SUCCESS') {
              this.$refs[formName].resetFields()
              _this.ruleForm.menu = null
              _this.ruleForm.url = ''
//              clearInterval(timer)
              this.dialogTableVisible = false
              _this.$message({
                message: res.message,
                type: 'success'
              })
              this.$router.go(0)
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .resourceAdd{
    .el-form{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin:0 auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .el-form-item{
        width: 50%;
      }
      .btnGroup{
        width: 100%;
      }
    }
  }
</style>
