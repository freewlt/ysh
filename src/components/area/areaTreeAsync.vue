<template>
    <div>
        <tree-select
                :clearable="false"
                :load-options="loadOptions"
                :loading-text="loadingText"
                :max-height="maxHeight"
                :no-children-text="noChildrenText"
                :no-options-text="noOptionsText"
                :normalizer="normalizer"
                :options="treeData"
                :placeholder="placeholder"
                @deselect="dselect"
                @input="input"
                @select="select"
                v-if="show"
        />
    </div>
</template>

<script>
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import {asyncArea} from "@/api/area";

export default {
    name: "areaTreeAsync",
    components: {TreeSelect},
    props: {
        placeholder: {
            type: String,
            default: "请选择"
        },
        //排除的id
        disabledId: {
            type: String,
            default: null
        },
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
        treeData: []
    }),
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                id: this.disabledId
            };
            asyncArea(params, {contentLoading: true}).then((res) => {
                this.treeData = this.handleChildrenData(res.data.data);
                this.show = true;
            });
        },
        loadOptions({parentNode, callback}) {
            let params = {
                id: this.disabledId,
                parentId: parentNode.id
            };
            asyncArea(params, {contentLoading: true}).then((res) => {
                parentNode.childrens = this.handleChildrenData(res.data.data);
            });
            callback();
        },
        handleChildrenData(data) {
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
