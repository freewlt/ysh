<template>
    <el-select v-model="value" placeholder="请选择油站名称"
               filterable
               clearable
               @change="sendData"
               :loading="loading"
               value-key="id"
               @visible-change="visibleChange"
               no-data-text="请先选择公司名称">
        <el-option
                v-for="item in stationData"
                :key="item.id"
                :label="item.name"
                :value="item">
        </el-option>
    </el-select>
</template>

<script>
import {getAllCompanyOrStation} from "../../../../api/merchant";

export default {
    name: "merchantStationTree",
    props: {
        currentStationId: undefined,
        currentStationName: undefined,
        currentCompanyId: undefined
    },
    data: () => ({
        loading: false,
        value: {},
        stationData: [],
        tag: "merchantStationTree"
    }),
    created() {
        this.value.id = this.currentStationId;
        this.value.name = this.currentStationName;
        this.getData(this.currentCompanyId);
    },
    methods: {
        //获取数据
        getData(parentID) {
            if (parentID !== undefined) {
                this.loading = true;
                getAllCompanyOrStation(parentID).then((res) => {
                    this.stationData = res.data.data;
                    this.loading = false;
                });
            }
        },
        //油站信息改变时通知父组件
        sendData() {
            this.$emit("dataChange", this.value);
        },
        //下拉框出现时获取数据
        visibleChange(visible) {
            if (visible) {//下拉框出现
                this.getData(this.currentCompanyId);
            }
        },
        //当公司名称变化时，将原油站信息清空
        companyIdChanged() {
            this.value = undefined;
            this.stationData = [];
            this.sendData();
        }
    }
};
</script>

<style scoped>

</style>