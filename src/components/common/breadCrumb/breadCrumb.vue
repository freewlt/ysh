<template>
  <div class="breadCrumbBox">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="breakLink" v-for="item in breadList" :to="{path:item.path}" :key="item.path">{{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumbBox',
  props: ['breadList'],
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .breadCrumbBox {
    width: 100%;
    padding: 20px;
    background: #fff;
  }
</style>
