<template>
  <el-dialog class="resourceDialogEdit" :title="dialogTableTitle" :visible.sync="dialogEditVisible" :close-on-click-modal= "false">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <tree-select-load :treeSelData="treeSelData" v-model="form.parentId" :loadOptions="loadOptions" @inputHandle="inputHandle"></tree-select-load>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="form.url" placeholder="请输入url"></el-input>
      </el-form-item>
      <el-form-item class="btnGroup">
        <el-button type="primary" @click="submitForm('form')" :disabled="isDisabled">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

    import {updateResource, getResource, asyncResource} from '@/api/resource';
    import qs from 'qs';

    import TreeSelectLoad from "../../../components/resource/treeSelectLoad";

    export default {
        name: 'resourceDialogEdit',
        components: { TreeSelectLoad },
        data () {
            return {
                form: {
                    id: '',
                    name: '',
                    parentId: null,
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
                dialogTableTitle: '',
                dialogEditVisible: false,
                isDisabled: false,
                parentId: ''
            }
        },

        created () {

        },
        methods: {
            // 获取数据
            getData () {
                const _this = this
                asyncResource({id:this.form.id}).then((res) => {
                    _this.treeSelData = res.data;
                    for (let i = 0; i < _this.treeSelData.length; i++) {
                        _this.treeSelData[i].childrens = null
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            editBtn (id,title) {
                this.dialogTableTitle = title
                this.form.id = id;
                getResource(id).then((res) => {
                    for(let key in this.form){
                        this.form[key] = res.data[key];
                    }
                    if(this.form.parentId == ''){
                        this.form.parentId = null
                    }
                    this.getData();
                }).catch((err) => {
                    console.log(err)
                })
            },

            // 懒加载
            loadOptions ({ parentNode, callback }) {
                let params = {
                    parentId: parentNode.id
                }
                asyncResource(params).then((res) => {
                    let childrenArray = [];
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].childCount > 0){
                            res.data[i].childrens = null;
                        } else {
                            delete res.data[i].childrens;
                        }
                        childrenArray.push(res.data[i])
                    }
                    parentNode.childrens = childrenArray;
                    callback()
                })
            },
            inputHandle (val) {
                this.form.parentId = val.id
            },
            submitForm (formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateResource(qs.stringify(this.form),
                          (isShow) => {
                              if (isShow) {
                                  _this.isDisabled = true;
                                  this.$store.commit('isShow', true);
                              } else {
                                  _this.isDisabled = false;
                                  this.$store.commit('isShow', false);
                              }
                          }
                        ).then((res) => {
                            this.$refs[formName].resetFields()
                            _this.form.menu = null
                            _this.form.url = ''
                            this.dialogEditVisible = false
                            _this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.$parent.getData();
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
  .resourceDialogEdit{
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
