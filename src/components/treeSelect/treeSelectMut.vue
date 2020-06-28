<template>
    <div class="treeSelectMut">
        <treeselect
                :multiple="true"
                :options="treeSelData"
                :normalizer="normalizer"
                placeholder="请选择"
                :value="parentId"
                @select="selectDepart"
        />
    </div>
</template>

<script>
    import Treeselect from "@riophae/vue-treeselect";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";

    export default {
        name: "treeSelectMut",
        components: {Treeselect},
        props: ["treeSelData","parentId"],
        data: () => ({
            arr: []
        }),
        methods: {
            /** 转换菜单数据结构 */
            normalizer (node) {
                if (node.childrens && !node.childrens.length) {
                    delete node.childrens;
                }
                return {
                    id: node.id,
                    label: node.name,
                    children: node.childrens
                };
            },
            // 传值
            selectDepart (node) {
                this.arr.push(node.name);
                this.$emit("inputHandle", this.arr);
            }
        }
    };
</script>
