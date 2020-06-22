<template>
    <el-dialog class="resourceDialogAdd" :title="dialogTableTitle" :visible.sync="dialogAddVisible">
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
                        v-model="ruleForm.parentId"
                />
            </el-form-item>
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
</template>

<script>

    import {asyncResource, saveResource} from '@/api/resource'
    // import { formdata } from '@/utils/tool'
    import qs from 'qs';

    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: 'resourceDialogAdd',
        components: { Treeselect },
        props: ['dialogTableTitle'],
        data () {
            return {
                ruleForm: {
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
                dialogAddVisible: false,
                isDisabled: false
            }
        },
        methods: {
            // 获取数据
            getData () {
                const _this = this
                asyncResource().then((res) => {
                    _this.treeSelData = res.data;
                    for (let i = 0; i < _this.treeSelData.length; i++) {
                        if (_this.treeSelData[i].childCount>0){
                            _this.treeSelData[i].childrens = null;
                        }else{
                            delete _this.treeSelData[i].childrens;
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            addBtn () {
                this.getData();
            },

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
                }).catch((err) => {
                    console.log(err)
                })
            },
            submitForm (formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm.parentId===null);
                        saveResource(qs.stringify(this.ruleForm),
                            (isShow) => {
                                if (isShow) {
                                    _this.isDisabled = true;
                                    this.$emit('').$parent.isShow = true
                                } else {
                                    _this.isDisabled = false;
                                    this.$emit('').$parent.isShow = false
                                }
                            }
                        ).then((res) => {
                            this.$refs[formName].resetFields()
                            _this.ruleForm.menu = null
                            _this.ruleForm.url = ''
                            this.dialogAddVisible = false
                            _this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.$router.go(0)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .resourceDialogAdd{
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
