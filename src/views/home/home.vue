<template>
  <el-container class="home">
    <aside-box></aside-box>
    <router-view class="main"/>
    <div class="loding" v-if="this.$store.state.isShow">
      <shade-box></shade-box>
    </div>
  </el-container>
</template>

<script>

import AsideBox from '@/components/common/nav/aside'
import ShadeBox from "@/components/common/loading/shadeBox";

export default {
  name: 'home',
  components: {ShadeBox, AsideBox},
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped="">
  .home{
    width: 100%;
    height: 100%;
    .main{
      position: absolute;
      left: 210px;
      top: 128px;
      width: calc(100% - 220px);
      height: calc(100% - 128px);
      margin: 0 auto;
      box-sizing: border-box;
      overflow-y: auto;
    }
    .loding{
      position: fixed;
      left:210px;
      top: 65px;
      width: calc(100% - 210px);
      height: 100%;
      z-index: 9999;
    }
  }
</style>
