<template>
  <div>
    <el-dialog title="生成的字段" width="700px" append-to-body :visible.sync="dialogVisible">
      <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="120px">
        <el-form-item label="dialog名" prop="dialogVar">
          <el-input v-model="dynamicValidateForm.dialogVar" placeholder="请输入dialog名" maxlength="20"></el-input>
        </el-form-item>
        <div class="info-item" v-for="(item, index) in dynamicValidateForm.detailList" :key="item.id">
          <el-form-item
            label="属性名"
            :prop="'detailList.' + index + '.propsName'"
            :rules="{ required: true, validator: validator.propsName, trigger: 'blur' }"
          >
            <el-input v-model="item.propsName" placeholder="请输入属性名"></el-input>
          </el-form-item>
          <el-form-item
            label="字段名"
            :prop="'detailList.' + index + '.name'"
            :rules="{ required: true, validator: validator.name, trigger: 'blur' }"
          >
            <el-input v-model="item.name" placeholder="请输入字段名"></el-input>
          </el-form-item>
          <el-form-item label="类型" :prop="'detailList.' + index + '.type'">
            <el-select style="width: 100%" v-model="item.type">
              <el-option v-for="(option, index) in typeOption" :key="index" :label="option.label" :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="item.type !== 'radio' && item.type !== 'select' && item.type !== 'slot'"
            label="是否必填"
            :prop="'detailList.' + index + '.isRequire'"
          >
            <el-radio v-model="item.isRequire" :label="0">否</el-radio>
            <el-radio v-model="item.isRequire" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item
            v-show="
              item.type !== 'radio' &&
              item.type !== 'select' &&
              item.type !== 'slot' &&
              dynamicValidateForm.detailList[index].isRequire
            "
            label="是否自定义规则"
            :prop="'detailList.' + index + '.isDefineRule'"
          >
            <el-radio v-model="item.isDefineRule" :label="0">否</el-radio>
            <el-radio v-model="item.isDefineRule" :label="1">是</el-radio>
          </el-form-item>
          <div style="width: 100%" class="f-j-c">
            <el-button
              v-if="dynamicValidateForm.detailList.length > 1"
              type="danger"
              size="small"
              class="remove-button"
              @click.prevent="removeItem(item)"
            >
              删除
            </el-button>
          </div>
        </div>
        <el-button style="width: 100%" type="primary" @click="addItem"> 增加字段</el-button>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="createDialogCode">确定生成</el-button>
      </template>
    </el-dialog>

     <!-- code show -->
    <codeDrawer 
      ref="codeDrawer"
      :visible="drawerVisible"
      :jsCode="jsCode"
      :htmlCode="htmlCode"
      @close="closeCodeDrawer"
    />
  </div>
</template>

<script>
import codeDrawer from './codeDrawer.vue'
import { createCodegenContext, vueTemplate, vueScript, humpChange, typeOption } from './utils'
export default {
  components: {
    codeDrawer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typeOption,
      addItems: [],
      codeStr: '',
      jsCode: '',
      htmlCode: '',
      drawerVisible: false,
      dynamicValidateForm: {
        dialogVar: 'test', //对话框变量
        detailList: [
          {
            id: Date.now(),
            propsName: '',
            name: '',
            type: 'input',
            isRequire: 0,
            isDefineRule: 0
          }
        ]
      },
      validator: {
        propsName: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入属性名'))
          }
          callback()
        },
        name: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入字段名'))
          }
          callback()
        }
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        // 当dialogVisible变化时，同时更新visible属性
        this.$emit('close')
      }
    },
    items() {
      return this.dynamicValidateForm.detailList
    },
    itemOrder() {
      return this.dynamicValidateForm.detailList.map(item => item.propsName)
    },
    dialogVar() {
      return this.dynamicValidateForm.dialogVar
    },
    slotArr() {
      return this.dynamicValidateForm.detailList.filter(item => item.type === 'slot')
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeCodeDrawer() {
      this.drawerVisible = false
    },
    generateCode() {
      this.jsCode = this.generateScriptCode(`handle${humpChange(this.dialogVar)}`, `${this.dialogVar}Form`)
      this.htmlCode = this.generateTemplateCode()
      // console.log(this.jsCode)
      // console.log(this.htmlCode)
      this.$nextTick(() => {
        this.drawerVisible = true
        this.$refs.codeDrawer.initDrawer()
      })
      // const fileName = `${this.dialogVar}.vue`
      // this.codeStr = this.generateCode()
      // console.log(this.codeStr)
      // const blob = new Blob([this.codeStr], { type: 'text/plain;charset=utf-8' })
      // saveAs(blob, fileName)
    },
    generateTemplateCode() {
      const { dialogVar } = this
      // 主要生成dialog
      const context = createCodegenContext()
      const { push, indent, deindent, newLine } = context
      return vueTemplate(indentLevel => {
        context.indentLevel = indentLevel
        push(`<el-dialog`)
        indent()
        push(`:title="${dialogVar}.isAdd ? '添加' : '编辑'"`)
        newLine()
        push(`width="550px"`)
        newLine()
        push(`append-to-body`)
        newLine()
        push(`:visible.sync="${dialogVar}.dialogVisible"`)
        newLine()
        push(`@closed="viewDialogClosed('${dialogVar}Form')">`)
        newLine()
        push(`<app-form`)
        indent()
        push(`ref="${dialogVar}Form"`)
        newLine()
        push(`label-width="110px"`)
        newLine()
        push(`:model="${dialogVar}.form"`)
        newLine()
        push(`:rules="${dialogVar}.rules"`)
        newLine()
        push(`:item-order="${dialogVar}.itemOrder"`)
        newLine()
        push(`:form-items="${dialogVar}.formItems">`)
        push(this.generateSlotCode(this.slotArr, context.indentLevel))
        deindent()
        push(`</app-form>`)
        newLine()
        push(`<template #footer>`)
        indent()
        push(`<el-button @click="${dialogVar}.dialogVisible = false;">取消</el-button>`)
        newLine()
        push(`<el-button type="primary" @click="handle${humpChange(dialogVar)}">确定</el-button>`)
        deindent()
        push(`</template>`)
        deindent()
        push(`</el-dialog>`)
        return context.code
      })
    },
    generateScriptCode(methodName, formName) {
      const { dialogVar } = this
      const context = createCodegenContext()
      const { push, indent, deindent, newLine } = context
      return vueScript(
        indentLevel => {
          context.indentLevel = indentLevel
          push(`${dialogVar}: {`)
          indent()
          push(`dialogVisible: false,`)
          newLine()
          push(`isAdd: false,`)
          newLine()
          push(`form: {`)
          indent()
          push(this.generateForm(this.items, context.indentLevel))
          deindent()
          push(`},`)
          newLine()
          push(`itemOrder: ${this.generateItemOrder(this.itemOrder, context.indentLevel)}`)
          newLine()
          push(`formItems: {`)
          indent()
          push(this.generateFormItems(this.items, context.indentLevel))
          deindent()
          push(this.generateRules(this.items, context.indentLevel))
          deindent()
          push(`}`)
          return context.code
        },
        methodName,
        formName
      )
    },
    // 以下生成字段代码
    generateSlotCode(slotItems, indentLevel) {
      const context = createCodegenContext()
      const { push, newLine, indent, deindent } = context
      context.indentLevel = indentLevel
      for (let i = 0; i < slotItems.length; i++) {
        newLine()
        push(`<template #${slotItems[i].propsName}>`)
        indent()
        push(`<el-form-item label="" prop="${slotItems[i].propsName}">`)
        indent()
        push(`<!-- ${slotItems[i].propsName}插槽内容 -->`)
        deindent()
        push(`</el-form-item>`)
        deindent()
        push(`</template>`)
      }
      return slotItems.length ? context.code : ''
    },
    generateForm(items, indentLevel) {
      const context = createCodegenContext()
      const { push, newLine } = context
      context.indentLevel = indentLevel
      for (let i = 0; i < items.length; i++) {
        push(`${items[i].propsName}: ''${i !== items.length - 1 ? ',' : ''}`)
        i !== items.length - 1 && newLine()
      }
      return context.code
    },
    generateItemOrder(items, indentLevel) {
      const context = createCodegenContext()
      const { push } = context
      context.indentLevel = indentLevel
      push(`[`)
      for (let i = 0; i < items.length; i++) {
        push(`'${items[i]}'${i !== items.length - 1 ? ', ' : ''}`)
      }
      push(`],`)
      return context.code
    },
    generateFormItems(items, indentLevel) {
      const context = createCodegenContext()
      const { push, newLine, indent, deindent } = context
      context.indentLevel = indentLevel
      for (let i = 0; i < items.length; i++) {
        push(`${items[i].propsName}: {`)
        indent()
        if (items[i].type === 'slot') {
          push(`slot: '${items[i].propsName}'`)
        } else {
          push(`type: '${items[i].type}',`)
          newLine()
          push(`label: '${items[i].name}'`)
        }
        if (items[i].type === 'input' || items[i].type === 'datepicker') {
          push(`,`)
          newLine()
          push(`attrs: {`)
          indent()
          push(`placeholder: '请输入${items[i].name}'`)
          deindent()
          push(`}`)
        }
        if (items[i].type === 'select') {
          push(`,`)
          newLine()
          push(`options: []`)
        }
        if (items[i].type === 'radio') {
          push(`,`)
          newLine()
          push(`radios: []`)
        }
        if (items[i].type === 'textarea') {
          push(`,`)
          newLine()
          push(`attrs: {`)
          indent()
          push(`placeholder: '请输入${items[i].name}',`)
          newLine()
          push(`rows: 4`)
          deindent()
          push(`}`)
        }
        deindent()
        push(`${i !== items.length - 1 ? '},' : '}'}`)
        i !== items.length - 1 && newLine()
      }
      return context.code
    },
    generateRules(items, indentLevel) {
      const context = createCodegenContext()
      const { push, newLine, indent, deindent } = context
      context.indentLevel = indentLevel
      const requireItem = items.filter(item => Boolean(item.isRequire))
      push(`},`)
      newLine()
      push(`rules: {`)
      indent()
      for (let i = 0; i < requireItem.length; i++) {
        if (requireItem[i].isDefineRule) {
          push(
            `${
              requireItem[i].propsName
            }: [ { required: true, validator: (rule, value, callback) => {}, trigger: ['blur', 'change'] } ]${
              i !== requireItem.length - 1 ? ',' : ''
            }`
          )
        } else {
          push(
            `${requireItem[i].propsName}: [ { required: true, message: '${
              requireItem[i].name
            }不能为空', trigger: ['blur', 'change'] } ]${i !== requireItem.length - 1 ? ',' : ''}`
          )
        }
        i !== requireItem.length - 1 && newLine()
      }
      deindent()
      push(`}`)
      return requireItem.length ? context.code : '}'
    },
    // 弹窗相关代码
    addItem() {
      this.dynamicValidateForm.detailList.push({
        id: Date.now(),
        propsName: '',
        name: '',
        type: 'input',
        isRequire: 0,
        isDefineRule: 0
      })
    },
    removeItem(item) {
      const index = this.dynamicValidateForm.detailList.indexOf(item)
      index !== -1 && this.dynamicValidateForm.detailList.splice(index, 1)
    },
    createDialogCode() {
      this.$refs.dynamicValidateForm.validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm.detailList)
          this.generateCode()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-item {
  border-top: 1px #000000 solid;
  padding-top: 20px;
  &:first-of-type {
    margin-bottom: 20px;
  }
}
.remove-button {
  margin-bottom: 20px;
}
.f-j-c {
  display: flex;
  justify-content: center;
}

</style>
