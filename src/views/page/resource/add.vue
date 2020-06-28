<template>
    <el-dialog class="resourceDialogAdd" :title="dialogTableTitle" :visible.sync="dialogAddVisible" :close-on-click-modal= "false">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" size="small">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单">
                <tree-select-load :parentId="form.parentId" :treeSelData="treeSelData" :loadOptions="loadOptions" @inputHandle="inputHandle"></tree-select-load>
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

    import qs from "qs";
    import { mapState } from "vuex";
    import {saveResource} from "@/api/resource";

    import TreeSelectLoad from "@/components/resource/treeSelectLoad";

    export default {
        name: "resourceDialogAdd",
        components: {TreeSelectLoad },
        props: ["dialogTableTitle"],
        data () {
            return {
                form: {
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
                dialogAddVisible: false,
                isDisabled: false,
                call: true
            };
        },
        computed: {
            ...mapState({
                treeSelData: (state) => state.resource.treeSelData,
            })
        },
        methods: {
            addBtn () {
                // 获取数据
                this.$store.dispatch("getTreeSelData");
            },
            // 懒加载
            loadOptions ({ parentNode, callback }) {
                this.$store.dispatch("getTreeSelData", parentNode.id, { parentNode, callback });
                callback();
            },
            // 接收传值
            inputHandle (val) {
                this.form.parentId = val.id;
            },
            submitForm (formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        saveResource(qs.stringify(this.form), (isShow) => {
                            if (isShow) {
                                this.$store.dispatch("reqLoading",true);
                            } else {
                                this.$store.dispatch("reqLoading",false);
                            }
                        }).then((res) => {
                            this.$refs[formName].resetFields();
                            _this.form.parentId = null;
                            _this.form.url = "";
                            this.dialogAddVisible = false;
                            _this.$message({
                                message: res.message,
                                type: "success"
                            });
                             this.$parent.getData();
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .resourceDialogAdd{
        .el-form{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            margin:0 auto;
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
