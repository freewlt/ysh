<template>
    <el-select v-model="value"
               value-key="id"
               placeholder="请选择公司名称"
               filterable
               clearable
               :loading="loading"
               @change="sendData">
        <el-option
                v-for="item in companyData"
                :key="item.id"
                :label="item.name"
                :value="item">
        </el-option>
    </el-select>
</template>

<script>
import {getAllCompanyOrStation} from "../../../../api/merchant";

export default {
    name: "merchantCompanyTree",
    props: {
        currentCompanyId: undefined,
        currentCompanyName: undefined
    },
    data: () => ({
        value: {},
        companyData: [],
        loading: true,
        tag: "merchantCompanyTree"
    }),
    created() {
        this.getData();
    },
    mounted() {
        this.value.id = this.currentCompanyId;
        this.value.name = this.currentCompanyName;
    },
    methods: {
        getData() {
            getAllCompanyOrStation(null).then((res) => {
                this.companyData = res.data.data;
                this.loading = false;
            });
        },
        //向父组件发送数据
        sendData() {
            console.log(this.tag, "sendData:" + this.value.name);
            this.$emit("dataChange", this.value);
        }
    }
};
</script>

<style scoped>

</style>