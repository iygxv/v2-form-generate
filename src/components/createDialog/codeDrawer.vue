<template>
  <el-drawer :visible.sync="drawerVisible" direction="rtl" size="60%">
    <div style="height: 100%">
      <el-row style="height: 100%; overflow: auto">
        <el-col :md="24" :lg="24" class="editor">
          <el-tabs v-model="activeTab" type="card" class="editor-tabs" @tab-click="handleClick">
            <el-tab-pane name="html">
              <span slot="label">
                <i v-if="activeTab === 'html'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                template
              </span>
            </el-tab-pane>
            <el-tab-pane name="js">
              <span slot="label">
                <i v-if="activeTab === 'js'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                script
              </span>
            </el-tab-pane>
          </el-tabs>
          <MonacoEditor ref="htmlMonacoEditor" v-show="activeTab === 'html'" type="html"/>
          <MonacoEditor ref="jsMonacoEditor" v-show="activeTab === 'js'" type="js"/>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    jsCode: {
      type: String,
      default: ''
    },
    htmlCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeTab: 'html',
      options: {}
    }
  },
  computed: {
    drawerVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.close()
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    initDrawer() {
      this.handleClick()
    },
    handleClick() {
      this.$nextTick(() => {
        if (this.activeTab === 'js') {
          this.$refs.jsMonacoEditor.initMonacoEditor(this.jsCode, 'js')
        } else {
          this.$refs.htmlMonacoEditor.initMonacoEditor(this.htmlCode, 'html')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__content {
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  .el-tab-pane {
    width: 100%;
    height: 100%;
  }
}
.editor {
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
}
.setting {
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
::v-deep .el-drawer__header {
  display: none;
}
</style>
