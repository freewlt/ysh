<template>
  <div class="treeSelectLoad">
    <!--<treeselect-->
      <!--:options="treeSelData"-->
      <!--:normalizer="normalizer"-->
      <!--:load-options="loadOptions"-->
      <!--placeholder="请选择"-->
      <!--v-model="value"-->
      <!--@select="selectDepart"-->
    <!--/>-->
    <treeselect
        :options="treeSelData"
        :normalizer="normalizer"
        placeholder="请选择"
        v-model="value"
    />
  </div>
</template>

<script>
//import {fetchMenu} from '@/utils/api/menu'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'treeSelectLoad',
  components: { Treeselect },
  props: ['treeSelData'],
  data: () => ({
    value: null
  }),
  created () {
//    this.getData()
  },
  methods: {
    // 获取数据
//    getData () {
//      const _this = this
//      fetchMenu().then((res) => {
//        _this.treeSelData = res.data
//        for (let i = 0; i < _this.treeSelData.length; i++) {
//          _this.treeSelData[i].childrens = null
//        }
//      }).catch((err) => {
//        console.log(err)
//      })
//    },
    /** 转换菜单数据结构 */
    normalizer (node) {
      return {
        id: node.id,
        label: node.name,
        children: node.childrens
      }
    },
    // 懒加载
//    loadOptions ({ action, parentNode, callback }) {
//      let params = {
//        id: parentNode.id
//      }
//      fetchMenu(params).then((res) => {
//        parentNode.childrens = res.data
//        callback()
//      }).catch((err) => {
//        console.log(err)
//      })
//    },
    // 传值
//    selectDepart (val) {
//      this.$emit('inputHandle', val)
//    }
  }
}
</script>
