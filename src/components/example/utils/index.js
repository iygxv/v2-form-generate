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
  push(strCb(context.indentLevel))
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
  push(`data() {`)
  indent()
  push(`return {`)
  indent()
  push(strCb(context.indentLevel))
  deindent()
  push(`}`)
  deindent()
  push(`}`)
  deindent()
  push(`}`)
  newLine()
  push(`</script>`)
  return context.code
}
export function cssStyle(cssStr) {
  const context = createCodegenContext()
  const { push, indent, deindent } = context
  push(`<style lang='scss' scoped>`)
  indent()
  push(cssStr)
  deindent()
  push(`</style>`)
  return context.code
}
