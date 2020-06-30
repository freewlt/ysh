<template>
  <div class="userAdd">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" size="small">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!--<el-form-item label="上级菜单懒加载" prop="name">-->
        <!--<tree-select-load :treeSelData="treeSelData" :loadOptions="loadOptions" @inputHandle="inputHandle"></tree-select-load>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="上级菜单全加载" prop="name">-->
        <!--<tree-select-single :treeSelData="treeSelData" @inputHandle="inputHandle"></tree-select-single>-->
      <!--</el-form-item>-->
      <el-form-item label="上级菜单多选">
        <tree-select-mut :treeSelData="treeSelData" @inputHandle="inputHandle"></tree-select-mut>
      </el-form-item>
      <el-form-item label="活动名称">
        <input-tip :msg="msg" @inputHandle="inputHandle"></input-tip>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <resource-table :tableHeaders="tableHeaders" :rowData="rowData"></resource-table>
  </div>
</template>

<script>
import { fetchResource, asyncResource } from "@/api/resource";

import InputTip from "@/components/inputTip";
import ResourceTable from "@/components/resource/tableLoad";
//import TreeSelectLoad from "@/components/resource/treeSelectLoad";
//import TreeSelectSingle from "@/components/treeSelect/treeSelectSingle";
import TreeSelectMut from "@/components/treeSelect/treeSelectMut";

export default {
  name: "userAdd",
  components: { TreeSelectMut, ResourceTable, InputTip,
//      TreeSelectSingle, TreeSelectLoad
  },
  data () {
    return {
      form: {
        name: "",
        parentId:"",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          { type: "date", required: true, message: "请选择日期", trigger: "change" }
        ],
        date2: [
          { type: "date", required: true, message: "请选择时间", trigger: "change" }
        ],
        type: [
          { type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ]
      },
      msg: "提示信息",

      tableHeaders: [
        {prop: "name", label: "姓名"},
        {prop: "url", label: "url"},
        {prop: "createDate", label: "创建时间"}
      ],
      rowData: [],
      treeSelData: []
    };
  },
  created () {
    this.getData();
  },
  methods: {

    // 获取数据
    getData () {
        const _this = this;
        asyncResource().then((res) => {
            _this.treeSelData = res.data;
            for (let i = 0; i < _this.treeSelData.length; i++) {
                _this.treeSelData[i].childrens = null;
            }
        });
        fetchResource().then(function (res) {
            _this.rowData = res.data.data;
            _this.treeSelData = res.data;
        });
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 接收传值
    inputHandle (val) {
        if(val.length > 0){
            this.form.parentId = val;
        }else{
            this.form.parentId = val.id;
        }
    },
    // 懒加载
    loadOptions ({ parentNode, callback }) {
        let params = {
            parentId: parentNode.id
        };
        asyncResource(params).then((res) => {
            let childrenArray = [];
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].childCount > 0){
                    res.data[i].childrens = null;
                } else {
                    delete res.data[i].childrens;
                }
                childrenArray.push(res.data[i]);
            }
            parentNode.childrens = childrenArray;
            callback();
        });
    },
  }
};
</script>

<style lang="less" scoped>
  .userAdd{
    .el-form{
      width: 100%;
      padding: 5% 16% 5% 13.4%;
      margin:0 auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .line{
        text-align: center;
      }
    }
  }
</style>
