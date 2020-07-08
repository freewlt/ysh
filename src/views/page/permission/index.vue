<template>
    <div class="permission">
        <!--主要内容-->
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="treeTableData"
                        row-key="id"
                        :key="handleCount"
                        border
                        lazy
                        :load="load"
                        :tree-props="{children: 'childrens', hasChildren: 'parentFlag'}"
                >
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"
                                         :align="item.align"></el-table-column>
                    </template>
                    <el-table-column label="icon" align="center">
                        <template slot-scope="scope">
                            <i class="tableIcon" :class="scope.row.icon"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="permissionType" align="center"
                                     :formatter="permissionTypeFormatter"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" class="handleBtn" @click="dialogEdit(scope.$index, scope.row)">编辑


                            </el-link>
                            <el-link type="danger" class="handleBtn" @click="deleteBtn(scope.$index, scope.row)">删除


                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog class="dialogBox" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="类型" prop="permissionType">
                    <el-radio-group v-model="form.permissionType">
                        <el-radio-button label="1">菜单</el-radio-button>
                        <el-radio-button label="2">按钮</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入名称，2-20个字符" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model="form.code" placeholder="请输入编码，2-20个字符" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="上级" prop="parentId">
                    <permission-tree-async v-if="addStatus" @dataChange="inputHandle"></permission-tree-async>
                    <permission-tree v-else :multiple="false" :checked-id="form.parentId" @dataChange="inputHandle"
                                     :excluedId="form.id"></permission-tree>
                </el-form-item>
                <el-form-item label="icon" prop="icon">
                    <icon-sets :iconName="form.icon" @iconSelect="iconSelect"></icon-sets>
                </el-form-item>
                <el-form-item label="upload" prop="upload"
                              class="uploader">
                    <el-upload
                            name="file"
                            action="/api-file/file/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <el-input v-model="upload" placeholder="请上传文件" type="button"></el-input>
                        <el-input v-model="form.upload"  style="visibility: hidden;" ></el-input>
                    </el-upload>
                </el-form-item>
                <el-form-item label="upload">
                    <upload-con :action="actionApi"
                                @abort="abort" @onError="onError"
                    ></upload-con>

                </el-form-item>
                <el-form-item label="前端路由" prop="frontPath">
                    <el-input v-model="form.frontPath" placeholder="请输入前端路由地址"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort" :min="1" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label="资源" prop="resourceIds">
                    <resource-tree :checked-id="form.resourceIds" :limit="8" :multiple='true'
                                   @dataChange="resourceHandle"></resource-tree>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="submitForm" type="primary" :loading="btnLoading">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import qs from "qs";
import {asyncPermission, deletePermission, getPermission, savePermission, updatePermission} from "@/api/permission";

import {deleteRow} from "@/utils/tool";

import permissionTreeAsync from "@/components/permission/permissionTreeAsync";
import permissionTree from "@/components/permission/permissionTree";
import resourceTree from "@/components/resource/resourceTree";
import iconSets from "@/components/common/iconSets/iconSets";
import {stdCodes} from "@/api/stdCode";
import UploadCon from "@//components/common/upload/upload";

export default {
    name: "Permission",
    components: {UploadCon, resourceTree, iconSets, permissionTree, permissionTreeAsync},
    inject: ["reload"],
    data() {
        return {
            tableHeaders: [
                {prop: "name", label: "名称", align: "left"},
                {prop: "code", label: "编码", align: "left"},
                {prop: "permissionCode", label: "权限编码", align: "left"},
                {prop: "frontPath", label: "前端路由", align: "left"},
            ],
            treeTableData: [],
            dialogVisible: false,
            dialogTitle: "",
            form: {
                id: "",
                name: "",
                parentId: null,
                sort: 500,
                url: "",
                code: "",
                frontPath: "",
                icon: "",
                permissionType: 1,
                resourceIds: null,
                upload: ""
            },
            rules: {
                permissionType: [
                    {required: true, message: "请选择类型", trigger: "blur"}
                ],
                name: [
                    {required: true, message: "请输入名称", trigger: "blur"},
                    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
                ],
                code: [
                    {required: true, message: "请输入编码", trigger: "blur"},
                    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
                ],
                sort: [
                    {type: "number", required: true, message: "请输入排序", trigger: "change"},
                ],
                url: [],
                parentId: [],
                resourceIds: []
            },
            addStatus: true,
            handleCount: 0,
            btnLoading: false,
            stdCodeTypes: {
                permissionType: {
                    name: "PERMISSION_TYPE",
                    items: {}
                },
            },
            upload: "",
            actionApi: "/api-file/file/upload"
        };
    },
    created() {
        this.getData();
        stdCodes(this.stdCodeTypes);
    },
    watch: {
        treeTableData() {
            return ++this.handleCount;
        }
    },
    methods: {
        abort(res){
            console.log(res,"abort");
        },
        onError(err){
            console.log(err);
        },



        handleAvatarSuccess(res) {
            this.upload = res.data.url;
            this.form.upload = res.data.randomName;
        },
        beforeAvatarUpload(file) {
            let type = file.type.substring(6);
            const isPic = /(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPic) {
                this.$message.error("图片类型必须是.gif,jpeg,jpg,png中的一种!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }

            return isPic && isLt2M;
        },
        // 获取table数据
        getData() {
            this.treeTableData = [];
            asyncPermission().then((res) => {
                this.treeTableData = res.data.data;
            });
        },
        load(tree, treeNode, resolve) {
            let params = {
                parentId: tree.id
            };
            asyncPermission(params, {contentLoading: false}).then((res) => {
                resolve(res.data.data);
            });
        },
        // 删除
        deleteBtn(message, row) {
            deleteRow("此操作将永久删除记录, 是否继续?", deletePermission, row.id, () => {
                this.getData();
            });
        },
        clear() {
            for (let key in this.form) {
                this.form[key] = null;
            }
            this.form.sort = 500;
        },
        permissionTypeFormatter(row) {
            return this.stdCodeTypes.permissionType.items[row.permissionType];
        },
        // 添加对话框
        dialogAdd() {
            this.clear();
            this.addStatus = true;
            this.form.permissionType = 1;
            this.dialogTitle = "添加";
            this.dialogVisible = true;
        },
        // 接收传值
        inputHandle(val) {
            this.form.parentId = val;
        },
        resourceHandle(val) {
            this.form.resourceIds = val;
        },
        // 编辑对话框
        dialogEdit(index, row) {
            this.clear();
            getPermission(row.id).then((res) => {
                for (let key in this.form) {
                    this.form[key] = res.data.data[key];
                }
                if (this.form.parentId === "") {
                    this.form.parentId = null;
                }
                if (this.form.resourceIds == "") {
                    this.form.resourceIds = null;
                }
                this.addStatus = false;
                this.dialogTitle = "编辑";
                this.dialogVisible = true;
            });
        },
        iconSelect(val){
            this.form.icon = val;
        },
        submitForm() {
            const _this = this;
            _this.btnLoading = true;
            if (this.addStatus) {
                this.$refs.form.validate((valid) => {
                    if(valid) {
                        savePermission(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(function() {
                            _this.btnLoading = false;
                        });
                    } else {
                        _this.btnLoading = false;
                    }
                });
            } else {
                this.$refs.form.validate((valid) => {
                    if(valid) {
                        updatePermission(qs.stringify(this.form)).then((res) => {
                            _this.btnLoading = false;
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.getData();
                        }).catch(function() {
                            _this.btnLoading = false;
                        });
                    } else {
                        _this.btnLoading = false;
                    }
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .permission {
        min-width: 1090px;

        .content {
            height: 100%;
            .handleBtn {
                padding: 0 2px;
                &:after {
                    border: none !important;
                }
            }
            .tableIcon {
                font-size: 20px;
            }
        }
    }

    .dialogBox {
        .el-form {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;

            .el-form-item {
                width: 100%;
            }
        }
    }
</style>
