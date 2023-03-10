<template>
  <div>
    <el-button type="primary" @click="createDialog.dialogVisible = true">属性添加弹窗</el-button>
    <el-dialog
          title="生成Dialog代码"
          width="700px"
          append-to-body
          :visible.sync="createDialog.dialogVisible">
          <el-form :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="100px">
            <div class="info-item" v-for="(item, index) in dynamicValidateForm.detailList" :key="item.id">
              <el-form-item
                label="属性名"
                :prop="'detailList.' + index + '.propsName'"
                :rules="{required: true, validator: validator.propsName, trigger: 'blur'}">
                <el-input v-model="item.propsName" placeholder="请输入属性名"></el-input>
              </el-form-item>
              <el-form-item
                label="类型"
                :prop="'detailList.' + index + '.type'">
                  <el-select
                  style="width: 100%;"
                  v-model="item.type">
                    <el-option
                      v-for="(option, index) in typeOption"
                      :key="index"
                      :label="option.label"
                      :value="option.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否必填"
                :prop="'detailList.' + index + '.isRequire'">
                <el-radio v-model="item.isRequire" :label="0">否</el-radio>
                <el-radio v-model="item.isRequire" :label="1">是</el-radio>
              </el-form-item>
              <div style="width:100%; " class="f-j-c">
                <el-button
                    v-if="dynamicValidateForm.detailList.length > 1"
                    type="danger"
                    size="small"
                    class="remove-button"
                    @click.prevent="removeItem(item)">
                    删除
                </el-button>
             </div>
            </div>
            <el-button
              style="width: 100%"
              type="primary"
              @click="addItem">
              增加一行
            </el-button>
          </el-form>
          <template #footer>
            <el-button @click="createDialog.dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="createDialogCode">确定生成</el-button>
          </template>
    </el-dialog>
  </div>
</template>

<script>
const typeOption = [
  {
    value: '',
    label: '文本(默认类型)'
  },
  {
    value: 'textarea',
    label: '多行文本'
  },
  {
    value: 'select',
    label: '下拉框'
  },
  {
    value: 'radio',
    label: '单选'
  },
  {
    value: 'number',
    label: '数字'
  },
  {
    value: 'upload',
    label: '图片'
  }
]
export default {
  data() {
    return {
      typeOption,
      addItems: [],
      createDialog: {
        dialogVisible: false
      },
      dynamicValidateForm: {
        detailList: [
          {
            id: Date.now(),
            propsName: '',
            type: '',
            isRequire: 0
          }
        ]
      },
      validator: {
        propsName: (rule, value, callback) => {
          if(!value) {
            callback(new Error('请输入属性名'))
          }
          callback()
        },
      }
    }
  },
  methods: {
    addItem() {
      this.dynamicValidateForm.detailList.push({
        id: Date.now(),
        propsName: '',
        type: '',
        isRequire: 0
      })
    },
    removeItem(item) {
      const index = this.dynamicValidateForm.detailList.indexOf(item)
      index !== -1 && this.dynamicValidateForm.detailList.splice(index, 1)
    },
    createDialogCode() {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm.detailList)
          console.log('生成代码')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
