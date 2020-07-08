<template>
    <div class="shadeBox">
        <p class="loadTxt">加载中...</p>
    </div>
</template>

<script>
export default {
    name: "shadeBox",
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" scoped>
    .shadeBox {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;

        .loadTxt {
            padding-top: 28%;
        }
    }
</style>
