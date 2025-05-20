<template>
  <div class="app-container">
    <div class="app-content-title" v-if="title || $slots.title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="app-content" :class="{ 'app-content-border': border }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContent',
  props: {
    title: String,
    border: Boolean
  }
};
</script>
<style lang="scss">
.app-container {
  position: relative;
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  + .app-container {
    margin-top: 15px;
  }

  .app-content-title {
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 500;
  }
  .app-content {
    &.app-content-border {
      border: 1px solid #ebeef5;
    }
  }

  .table-search {
    padding: 15px 10px;
    border-bottom: 1px solid #ebeef5;
    overflow: hidden;

    .el-form-item {
      margin-bottom: 0;
    }
    &-form {
      .el-col {
        margin-bottom: 15px;
        .el-col {
          margin-bottom: 0;
        }
      }

      .el-date-editor {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
  }

  .el-table {
    .el-button {
      margin: 2px 5px;
    }
  }
}

@media screen and (max-width: 750px) {
  .app-container {
    padding: 10px;
  }
}
</style>
