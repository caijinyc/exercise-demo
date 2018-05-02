<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <list-view></list-view>
    <router-view/>
  </div>
</template>

<script>
import ListView from './components/list-view/list-view.vue'
export default {
  components: {
    ListView
  }
}
</script>

<style lang="scss">
@import "./common/scss/index.scss";
</style>
