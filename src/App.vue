<template>
  <div id="app">
    <appMain/>
  </div>
</template>

<script>
import appMain from '@/components/main.vue'
export default {
  components: {
    appMain
  }
}
</script>

<style lang='scss' scoped>
.app {
  width: 100vw;
  height: 100vh;
  background: burlywood;
}
</style>
