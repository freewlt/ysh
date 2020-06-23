<template>
  <div class="treeSelectLoad">
    <treeselect
      :options="treeSelData"
      :normalizer="normalizer"
      :load-options="loadOptions"
      placeholder="请选择"
      v-model="value"
      @select="selectDepart"
    />
  </div>
</template>

<script>

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'treeSelectLoad',
  components: { Treeselect },
  props: ['treeSelData','loadOptions'],
  data: () => ({
    value: null
  }),
  methods: {
    /** 转换菜单数据结构 */
    normalizer (node) {
      return {
        id: node.id,
        label: node.name,
        children: node.childrens
      }
    },
    // 传值
    selectDepart (val) {
      this.$emit('inputHandle', val)
    }
  }
}
</script>
