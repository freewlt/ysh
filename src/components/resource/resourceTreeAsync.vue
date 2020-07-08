<template>
    <div>
        <tree-select
                v-if="show"
                :options="treeData"
                :normalizer="normalizer"
                v-model="treeCheckedId"
                :clearable="false"
                placeholder="请选择"
                :loading-text="loadingText"
                :no-options-text="noOptionsText"
                :no-children-text="noChildrenText"
                :max-height="maxHeight"
                :load-options="loadOptions"
                @select="select"
                @deselect="dselect"
                @input="input"
        />
    </div>
</template>

<script>
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { asyncResource } from "@/api/resource";

export default {
    name: "resourceTreeAsync",
    components: { TreeSelect },
    props: {
        loadingText: {
            type: String,
            default: "Loading..."
        },
        noOptionsText: {
            type: String,
            default: "暂无数据"
        },
        noChildrenText: {
            type: String,
            default: "请求数据中..."
        },
        maxHeight: {
            type: Number,
            default: 300
        },
        checkedId: [String, Object, Array],
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
            asyncResource().then((res) => {
                this.treeData = this.handleChildrenData(res.data.data);
                this.show = true;
            });
        },
        loadOptions({ parentNode, callback }) {
            let params = {
                parentId: parentNode.id
            };
            asyncResource(params,{contentLoading: false}).then((res) => {
                parentNode.childrens = this.handleChildrenData(res.data.data);
            });
            callback();
        },
        handleChildrenData(data){
            data.map((it) => {
                if (it.childCount > 0) {
                    it.childrens = null;
                } else {
                    delete it.childrens;
                }
            });
            return data;
        },
        normalizer(node) {
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
