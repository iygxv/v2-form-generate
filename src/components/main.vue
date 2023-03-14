<template>
  <div class="main-page">
    <el-button 
      size="medium" 
      type="primary" 
      @click="createDialogVisible = true">
      生成Dialog代码
    </el-button>
    <createDialog :visible="createDialogVisible" @close="close"/>

  </div>
</template>

<script>
import createDialog from './createDialog'
export default {
  components: {
    createDialog
  },
  data() {
    return {
      createDialogVisible: false
    }
  },
  methods: {
    close() {
      this.createDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
