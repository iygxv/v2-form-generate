<template>
  <div class="main-page">
    <el-container class="container-main">
      <!-- 物料区 -->
      <el-aside width="250px" class="main-right">
        <draggable
          :list="componentConfig"
          :group="{
            name: 'people', // 同分组可以互相拖拽
            pull: 'clone', // 拖拽变为复制
            put: false // 是否允许拖入当前组
          }"
          itemKey="people"
          :sort="false"
          class="draggable-container"
          animation="1000" >
          <template #item="{ element }">
            <el-tag effect="dark">
              {{ element.name }}
            </el-tag>
          </template>
        </draggable>
      </el-aside>
      <!-- 渲染区 -->
      <el-container>
        <!-- <WidgetForm ref="configFormData" :configFormData="configFormData" /> -->
      </el-container>
      <!-- 属性区 -->
      <el-aside width="250px" class="main-left">属性配置区</el-aside>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import componentConfig from '@/config/componentConfig.js'
export default {
  components: {
    draggable
  },
  data() {
    return {
      componentConfig,
      // 渲染区表单config
      configFormData: {
        // 拖拽区接收到的组件
        list: [{ name: 123 }],
        // 拖拽区el-form属性
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      // 选中的元素
      widgetFormSelect: {
        key: null,
        options: {
          placeholder: ''
        }
      }
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
