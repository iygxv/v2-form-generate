<template>
  <div class="main-page">
    <el-container class="container-main">
      <!-- 物料区 -->
      <el-aside width="250px" class="main-right">
      </el-aside>
      <!-- 渲染区 -->
      <el-container>
      </el-container>
      <!-- 属性区 -->
      <el-aside width="250px" class="main-left">属性配置区</el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

.container-main {
  height: 100vh;
}
.main-right {
  border-right: 1px solid #ccc;
  padding: 10px;
}
.main-left {
  border-left: 1px solid #ccc;
  padding: 10px;
}
.draggable-container {
  cursor: move;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 25px;
  gap: 17px;
}
</style>
