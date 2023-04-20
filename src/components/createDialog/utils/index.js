export const humpChange = (str) => {
  return str.replace(str[0], str[0].toUpperCase())
}
export const createCodegenContext = () => {
  const newLine = n => {
    context.push('\n' + '  '.repeat(n))
  }
  const context = {
    code: ``, // 拼的结果
    indentLevel: 0, // 缩进等级
    push(c) {
      context.code += c
    },
    newLine() {
      newLine(context.indentLevel) // 换行
    },
    indent() {
      newLine(++context.indentLevel) // 缩进
    },
    deindent() {
      newLine(--context.indentLevel) // 减少缩进
    }
  }
  return context
}

export function vueTemplate(strCb) {
  const context = createCodegenContext()
  const { push, indent, deindent, newLine } = context
  push(`<template>`)
  indent()
  // 插入关键代码
  push(strCb(context.indentLevel))
  // 插入关键代码
  deindent()
  push(`</template>`)
  return context.code
}

export function vueScript(strCb) {
  const context = createCodegenContext()
  const { push, indent, deindent, newLine } = context
  push(`<script>`)
  newLine()
  push(`export default {`)
  indent()
  // 插入关键代码
  push(strCb(context.indentLevel))
  // 插入关键代码
  deindent()
  push(`}`)
  newLine()
  push(`</script>`)
  return context.code
}
export function cssStyle(strCb) {
  const context = createCodegenContext()
  const { push, indent, deindent } = context
  push(`<style lang='scss' scoped>`)
  indent()
  // 插入关键代码
  push(strCb(context.indentLevel))
  // 插入关键代码
  deindent()
  push(`</style>`)
  return context.code
}


export const typeOption = [
  {
    value: 'input',
    label: '文本(默认类型)'
  },
  {
    value: 'select',
    label: '下拉框'
  },
  {
    value: 'radio',
    label: '单选框'
  },
  {
    value: 'upload',
    label: '图片'
  },
  {
    value: 'datepicker',
    label: '时间'
  },
  {
    value: 'number',
    label: '数字'
  },
  {
    value: 'textarea',
    label: '多行文本'
  },
  {
    value: 'slot',
    label: '插槽'
  }
]