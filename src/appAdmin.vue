<template>
  <div id="App">
    Admin
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*@import "./assets/css/normalize.css";*/
  @import "./assets/css/common.css";
  html,body,#App {
    width: 100%;
    height: 100%;
  }
</style>
