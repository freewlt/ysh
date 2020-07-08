<template>
    <div class="merchant">
        <div class="queryCriteria">
            <el-form :inline="true" class="queryItem">
                <el-form-item label="公司名称:" prop="orgCompanyId">
                    <merchant-company-tree v-on:dataChange="queryCompanyDataChange($event)"></merchant-company-tree>
                </el-form-item>
                <el-form-item label="油站名称:" prop="orgStationId">
                    <merchant-station-tree
                            ref="stationSelectorSearch"
                            :current-company-id="query.orgCompanyId"
                            v-on:dataChange="queryStationDataChange($event)"></merchant-station-tree>
                </el-form-item>
                <el-form-item>
                    <el-button @click="selectList" type="primary">查 询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <div class="btnCondition">
                <el-button type="primary" @click="dialogAdd">添 加</el-button>
            </div>
            <div class="dataTable">
                <el-table
                        :data="tableData"
                        row-key="id"
                        border
                        lazy>
                    <template v-for="item in tableHeaders">
                        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
                    </template>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-link class="handleBtn" type="primary" @click="editMerchant(scope.row)">编辑
                            </el-link>
                            <el-link class="handleBtn" type="danger" @click="delMerchant(scope.row)">删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination class="pageBox"
                           :current-page="query.pageNum"
                           :page-size="query.pageSize"
                           :total="total"
                           @current-change="changePage">
            </el-pagination>
            <!-- 添加或修改商户对话框 -->
            <el-dialog :before-close="dialogClose"
                       :close-on-click-modal="false"
                       :title="dialogTitle"
                       :visible.sync="dialogVisible"
                       v-if="dialogVisible">
                <el-form :model="form" :rules="rules" label-width="110px" ref="form">
                    <el-form-item label="公司名称" prop="orgCompanyId">
                        <merchant-company-tree
                                :current-company-id="form.orgCompanyId"
                                :current-company-name="form.companyName"
                                v-on:dataChange="companyDataChange($event)"></merchant-company-tree>
                    </el-form-item>
                    <el-form-item label="油站名称" prop="orgStationId">
                        <merchant-station-tree
                                ref="stationSelectorAdd"
                                :current-station-id="form.orgStationId"
                                :current-station-name="form.stationName"
                                :current-company-id="form.orgCompanyId"
                                v-on:dataChange="stationDataChange($event)"></merchant-station-tree>
                    </el-form-item>
                    <el-form-item label="加油卡商户号" prop="cardMerchantNo">
                        <el-input placeholder="请输入15位加油卡商户号" v-model="form.cardMerchantNo" maxlength="15"/>
                    </el-form-item>
                    <el-form-item label="移动商户号" prop="mobileMerchantNo">
                        <el-input placeholder="请输入15位移动商户号" v-model="form.mobileMerchantNo" maxlength="15"/>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer" slot="footer">
                    <el-button @click="submitForm" type="primary">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import merchantCompanyTree from "./components/merchantCompanyTree";
import merchantStationTree from "./components/merchantStationTree";
import {delMerchant, getMerchant, list, saveMerchant, updateMerchant} from "../../../api/merchant";
import qs from "qs";
import {deleteRow} from "../../../utils/tool";

export default {
    name: "Merchant",
    components: {merchantCompanyTree, merchantStationTree},
    data() {
        return {
            loading: true,
            addStatus: true,
            dialogVisible: false,
            dialogTitle: "添加商户",
            tableHeaders: [
                {prop: "companyName", label: "公司名称"},
                {prop: "stationName", label: "油站名称"},
                {prop: "cardMerchantNo", label: "加油卡商户号"},
                {prop: "mobileMerchantNo", label: "移动商户号"},
                {prop: "stationNo", label: "油站编号"},
                {prop: "createDate", label: "创建时间"}
            ],
            tableData: [],
            total: 1,//总商户数
            //查询参数
            query: {
                pageNum: 1,
                pageSize: 10,
                orgCompanyId: undefined,
                stationName: undefined
            },
            //表单参数
            form: {
                id: undefined,
                orgCompanyId: undefined,
                companyName: undefined,
                orgStationId: undefined,
                stationName: undefined,
                cardMerchantNo: undefined,
                mobileMerchantNo: undefined,
                stationNo: undefined
            },
            // 表单校验
            rules: {
                orgCompanyId: [
                    {required: true, message: "公司名称不能为空", trigger: "blur"}
                ],
                orgStationId: [
                    {required: true, message: "油站名称不能为空", trigger: "blur"}
                ],
                cardMerchantNo: [
                    {required: true, message: "请输入15位加油卡商户号", trigger: "blur", min: 15, max: 15}
                ],
                mobileMerchantNo: [
                    {required: true, message: "请输入15位移动商户号", trigger: "blur", min: 15, max: 15}
                ]
            }
        };
    },
    created() {
        this.selectList();
    },
    methods: {
        //查询商户列表
        selectList() {
            list(this.query).then((res) => {
                this.tableData = res.data.data.list;
                this.total = parseInt(res.data.data.total);
            });
        },
        //显示下一页
        changePage(pageNum) {
            this.query.pageNum = pageNum;
            this.selectList();
        },
        //展示弹窗（添加商户）
        dialogAdd() {
            this.dialogVisible = true;
            this.addStatus = true;
            this.dialogTitle = "添加商户";
        },
        //展示弹窗（编辑商户）
        dialogEdit() {
            this.dialogVisible = true;
            this.addStatus = false;
            this.dialogTitle = "编辑商户";
        },
        //关闭弹窗
        dialogClose() {
            this.resetForm();
            this.dialogVisible = false;
        },
        //查询时 公司 发生变化
        queryCompanyDataChange(val) {
            this.query.orgCompanyId = val.id;
            this.$refs["stationSelectorSearch"].companyIdChanged();
        },
        //查询时 油站 发生变化
        queryStationDataChange(val) {
            if (val === undefined) {
                this.query.stationName = undefined;
            } else {
                this.query.stationName = val.name;
            }
        },
        //添加或修改时 公司 发生变化
        companyDataChange(val) {
            this.form.orgCompanyId = val.id;
            this.form.companyName = val.name;
            this.$refs["stationSelectorAdd"].companyIdChanged();
        },
        //添加或修改时 油站 发生变化
        stationDataChange(val) {
            if (val !== undefined) {
                this.form.orgStationId = val.id;
                this.form.stationName = val.name;
                this.form.stationNo = "000005";
            }
        },
        //添加商户
        submitForm() {
            const _this = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.addStatus) {//添加
                        saveMerchant(qs.stringify(this.form)).then((res) => {
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.selectList();
                            this.resetForm();
                        });
                    } else {//编辑
                        updateMerchant(qs.stringify(this.form)).then((res) => {
                            _this.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.selectList();
                            this.resetForm();
                        });
                    }
                }
            });
        },
        //删除商户
        delMerchant(row) {
            deleteRow("此操作将永久删除记录, 是否继续?", delMerchant, row.id, () => {
                this.selectList();
            });
        },
        //编辑商户
        editMerchant(row) {
            this.resetForm();
            getMerchant(row.id).then((res) => {
                if (res.data.result == "SUCCESS") {
                    let merchant = res.data.data;
                    this.form.id = merchant.id;
                    this.form.orgCompanyId = merchant.orgCompanyId;
                    this.form.companyName = merchant.companyName;
                    this.form.orgStationId = merchant.orgStationId;
                    this.form.stationName = merchant.stationName;
                    this.form.stationNo = merchant.stationNo;
                    this.form.cardMerchantNo = merchant.cardMerchantNo;
                    this.form.mobileMerchantNo = merchant.mobileMerchantNo;
                    this.dialogEdit();
                }
            });
        },
        //重置表单数据
        resetForm() {
            for (let key in this.form) {
                this.form[key] = undefined;
            }
        }
    }
};
</script>

<style lang="less" scoped>

    .merchant {
        min-width: 1090px;

        .content {

            .handleBtn {
                padding: 0 2px;

                &:after {
                    border: none !important;
                }
            }
        }

    }

</style>