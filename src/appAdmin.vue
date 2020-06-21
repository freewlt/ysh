<template>
  <div id="Admin">
    Admin
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style>
  /*@import "./assets/css/normalize.css";*/
  @import "./assets/css/common.css";
  html,body,#app {
    width: 100%;
    height: 100%;
  }
</style>
