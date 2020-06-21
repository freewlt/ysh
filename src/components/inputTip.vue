<template>
  <div class="inputTip">
    <el-input v-model="currentValue" @input="childClick"></el-input>
    <el-tooltip class="item" effect="dark" :content="msg" placement="top">
      <i class="el-icon-warning-outline"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'inputTip',
  props: {
    msg: String
  },
  data () {
    return {
      currentValue: ''
    }
  },
  methods: {
    childClick () {
      this.$emit('inputHandle', this.currentValue)
    }
  }
}
</script>

<style lang="less" scoped>
  .inputTip {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .el-input{
      margin-right: 5px;
    }
    i{
      font-size: 20px;
    }
  }
</style>
