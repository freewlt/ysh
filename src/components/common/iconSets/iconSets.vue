<template>
    <div class="iconSets">
        <el-popover placement="top-start" title="图标集" trigger="click" class="iconArray" v-model="visible">
            <div class="iconList">
                <i :class="item.name" v-for="item in iconList" :key="item.name" @click="select(item)"></i>
            </div>
            <el-input slot="reference" :value="iconName" placeholder="请选择图标"></el-input>
        </el-popover>
    </div>
</template>

<script>

import iconList from "./iconList.js";

export default {
    name: "iconSets",
    props: ["iconName"],
    data() {
        return {
            iconList: iconList,
            visible: false,
        };
    },
    methods: {
        select(item){
            this.$emit("iconSelect", item.name);
            this.visible = false;
        }
    }
};
</script>

<style lang="less">
    .iconList {
        max-width: 500px;
        max-height: 300px;
        padding-top: 20px;
        overflow-y: auto;
        border-top: 2px solid #e4e7ed;
        i {
            font-size: 20px !important;
            padding: 10px;
            &:hover {
                transform: scale(1.6);
            }
        }
    }
</style>
