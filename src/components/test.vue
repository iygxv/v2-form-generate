<template>
    <monaco-editor :value="code" :language="language"  theme="Monokai" :options="options"/>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";

export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code: "console.log('Hello, world!1234');",
      language: "javascript",
      options: {
        fontSize: 16,
        automaticLayout: true, // 自适应布局,
        folding: true, // 启用代码折叠
      }
    };
  },
};
</script>
