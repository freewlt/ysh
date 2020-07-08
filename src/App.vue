<template>
    <div id="App">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style lang="less">
    @import "./assets/css/common.css";

    html, body, #App {
        width: 100%;
        height: 100%;
    }
</style>
