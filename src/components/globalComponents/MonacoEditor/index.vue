<template>
  <div ref="editorContainer" style="width: 100%; height: 100%" :id="`${type}-editor`"></div>
</template>

<script>
import * as monaco from 'monaco-editor'

const editorObj = {
  html: null,
  js: null
}
const mode = {
  html: 'html',
  js: 'javascript'
}
export default {
  name: 'MonacoEditor',
  props: {
    type: String
  },
  methods: {
    initMonacoEditor(value, type) {
      this.setEditorValue(value, type, this.type + '-editor')
    },
    setEditorValue(codeStr, type, id) {
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr)
      } else {
        editorObj[type] = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          fontSize: 16,
          automaticLayout: true, // 自适应布局,
          readOnly: true, // 只读, 不可编辑
        })
      }
    }
  }
}
</script>
