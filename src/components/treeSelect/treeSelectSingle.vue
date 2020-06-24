<template>
    <div class="treeSelectSingle">
        <treeselect
                :options="treeSelData"
                :normalizer="normalizer"
                placeholder="请选择"
                v-model="parentId"
                @select="selectDepart"
        />
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: 'treeSelectSingle',
        components: {Treeselect},
        props: ['treeSelData', 'parentId'],
        data: () => ({
            value: null
        }),
        methods: {
            /** 转换菜单数据结构 */
            normalizer (node) {
                if (node.childrens && !node.childrens.length) {
                    delete node.childrens
                }
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
