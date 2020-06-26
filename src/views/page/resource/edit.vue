<template>
  <el-dialog class="resourceDialogEdit" :title="dialogTableTitle" :visible.sync="dialogEditVisible" :close-on-click-modal= "false">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" size="small">
      <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入名称"></el-input>
    </el-form-item>
      <el-form-item label="上级菜单">
        <tree-select-single :parentId="form.parentId" :treeSelData="treeSelData" @inputHandle="inputHandle"></tree-select-single>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="form.url" placeholder="请输入url"></el-input>
      </el-form-item>
      <el-form-item class="btnGroup">
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
    import qs from "qs";
    import { mapState } from "vuex";
    import {updateResource, getResource} from "@/api/resource";

    import TreeSelectSingle from "@/components/treeSelect/treeSelectSingle";

    export default {
        name: "resourceDialogEdit",
        components: {TreeSelectSingle },
        data () {
            return {
                form: {
                    id: "",
                    name: "",
                    parentId: null,
                    sort: "",
                    url: ""
                },
                rules: {
                    name: [
                        { required: true, message: "请输入名称", trigger: "blur" },
                        { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
                    ],
                    sort: [
                        { required: true, message: "请输入排序", trigger: "change" },
                        { min: 1, max: 3, message: "只能输入数字，默认500", trigger: "blur" }
                    ]
                },
                dialogTableTitle: "",
                dialogEditVisible: false
            };
        },
        computed: {
            ...mapState({
                treeSelData: (state) => state.resource.treeSelAll,
            })
        },
        methods: {
            editBtn (id,title) {
                this.dialogTableTitle = title;
                getResource(id).then((res) => {
                    for(let key in this.form){
                        this.form[key] = res.data[key];
                    }
                    this.form.parentId = res.data.parentId;
                    if(this.form.parentId == ""){
                        this.form.parentId = null;
                    }
                }).catch((err) => {
                    console.log(err);
                });
                // 获取数据
                this.$store.dispatch("getTreeSelAll");
            },
            // 接收传值
            inputHandle (val) {
                this.form.parentId = val.id;
            },
            submitForm (formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateResource(qs.stringify(this.form), (isShow) => {
                            if (isShow) {
                                this.$store.dispatch("reqLoading",true);
                            } else {
                                this.$store.dispatch("reqLoading",false);
                            }
                        }).then((res) => {
                            this.$refs[formName].resetFields();
                            _this.form.parentId = null;
                            _this.form.url = "";
                            this.dialogEditVisible = false;
                            _this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.$parent.getData();
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
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