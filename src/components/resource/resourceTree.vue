<template>
    <div>
        <tree-select
                v-if="show"
                :multiple="multiple"
                :options="treeData"
                :normalizer="normalizer"
                v-model="treeCheckedId"
                :limit="limit"
                :limit-text="limitText"
                :clearable="false"
                :loading-text="loadingText"
                :no-options-text="noOptionsText"
                placeholder="请选择"
                value-consists-of="ALL_WITH_INDETERMINATE"
                :max-height="maxHeight"
                @select="select"
                @deselect="dselect"
                @input="input"
        />
    </div>
</template>

<script>
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { fetchResource } from "@/api/resource";

export default {
    name: "resourceTree",
    components: { TreeSelect },
    props: {
        closeOnSelect: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: true
        },
        limit: {
            type: Number,
            default: 2
        },
        limitText: {
            type: Function,
            default: function() {
                return "...";
            }
        },
        loadingText: {
            type: String,
            default: "Loading..."
        },
        noOptionsText: {
            type: String,
            default: "暂无数据"
        },
        maxHeight: {
            type: Number,
            default: 300
        },
        checkedId: [String, Object, Array],
        excluedId: String
    },
    data: () => ({
        show: false,
        treeData: [],
        treeCheckedId: []
    }),
    created() {
        this.getData();
    },
    mounted() {
        this.treeCheckedId = this.checkedId;
    },
    methods: {
        getData() {
            fetchResource({ id: this.excluedId }).then((res) => {
                this.treeData = res.data.data;
                this.show = true;
            });
        },
        normalizer(node) {
            if (node.childrens && !node.childrens.length) {
                delete node.childrens;
            }
            return {
                id: node.id,
                label: node.name,
                children: node.childrens
            };
        },
        select(node) {
            this.$emit("selectNode", node);
        },
        dselect(node) {
            this.$emit("cancelNode", node);
        },
        input(value) {
            this.$emit("dataChange", value);
        }
    }
};
</script>
