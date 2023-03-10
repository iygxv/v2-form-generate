<template>
  <el-form ref="appForm" class="app-form" :model="model" :rules="rules" v-bind="$attrs" v-on="$listeners">
    <template v-for="itemName in itemOrder">
      <slot v-if="'slot' in formItems[itemName]" :name="formItems[itemName].slot"> </slot>
      <el-form-item
        v-else
        v-show="processor(formItems[itemName].show, true)"
        v-bind="formItems[itemName].formItemAttrs"
        :key="itemName"
        :label="processor(formItems[itemName].label)"
        :prop="itemName"
      >
        <el-input
          v-if="formItems[itemName].type === 'textarea'"
          type="textarea"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
        </el-input>
        <el-input
          v-else-if="formItems[itemName].type === 'number'"
          type="number"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model.number="model[itemName]"
        >
        </el-input>
        <el-select
          v-else-if="formItems[itemName].type === 'select'"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
          <el-option
            v-for="opt in processor(formItems[itemName].options)"
            :key="!formItems[itemName].itself ? opt[formItems[itemName].valueKey || 'value'] : opt"
            :label="!formItems[itemName].itself ? opt[formItems[itemName].labelKey || 'label'] : opt"
            :value="!formItems[itemName].itself ? opt[formItems[itemName].valueKey || 'value'] : opt"
            :disabled="getDisabledStatus(opt['disabled'])"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-else-if="formItems[itemName].type === 'datepicker'"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="
            typeof formItems[itemName].attrs === 'function' ? formItems[itemName].attrs() : formItems[itemName].attrs
          "
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
        </el-date-picker>
        <el-radio-group
          v-else-if="formItems[itemName].type === 'radio'"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
          <el-radio
            v-for="radio in formItems[itemName].radios"
            :key="!formItems[itemName].itself ? radio[formItems[itemName].valueKey || 'value'] : radio"
            :label="!formItems[itemName].itself ? radio[formItems[itemName].valueKey || 'value'] : radio"
          >
            {{ !formItems[itemName].itself ? radio[formItems[itemName].labelKey || 'label'] : radio }}
          </el-radio>
        </el-radio-group>
        <el-checkbox-group
          v-else-if="formItems[itemName].type === 'checkbox'"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
          <el-checkbox
            v-for="box in formItems[itemName].checkbox"
            :key="!formItems[itemName].itself ? box[formItems[itemName].valueKey || 'value'] : box"
            :label="!formItems[itemName].itself ? box[formItems[itemName].valueKey || 'value'] : box"
          >
            {{ !formItems[itemName].itself ? box[formItems[itemName].labelKey || 'label'] : box }}
          </el-checkbox>
        </el-checkbox-group>
        <app-upload
          v-else-if="formItems[itemName].type === 'upload'"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
          ref="upload"
        >
        </app-upload>
        <el-input
          v-else-if="formItems[itemName].type === 'input' || !formItems[itemName].type"
          :disabled="getDisabledStatus(formItems[itemName].disabled)"
          v-bind="formItems[itemName].attrs"
          v-on="formItems[itemName].listeners"
          v-model="model[itemName]"
        >
        </el-input>
        <div class="app-form-tips" v-if="formItems[itemName].tips">{{ formItems[itemName].tips }}</div>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import appUpload from '../Upload'
export default {
  name: 'appForm',
  components: {
    appUpload
  },
  props: {
    model: Object,
    rules: Object,
    formItems: {
      type: Object,
      default() {
        return {}
      }
    },
    itemOrder: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 如果值存在函数的情况，就执行返回，否则就直接返回
    processor(val, defaultVal) {
      defaultVal = defaultVal || val
      return Object.prototype.toString.call(val) === '[object Function]' ? val() : defaultVal
    },
    getDisabledStatus(disabled) {
      return typeof disabled === 'function' ? disabled() : typeof disabled === 'boolean' ? disabled : false
    },
    validate(callback) {
      return this.$refs.appForm.validate(callback)
    },
    validateField(props, callback) {
      return this.$refs.appForm.validateField(props, callback)
    },
    resetFields() {
      this.$refs.upload &&
        this.$refs.upload.forEach(item => {
          item.reset()
        })
      return this.$refs.appForm.resetFields()
    },
    clearValidate(props) {
      return this.$refs.appForm.clearValidate(props)
    }
  }
}
</script>
<style lang="scss">
.app-form {
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-radio {
    vertical-align: top;
    line-height: 40px;
  }
  .el-checkbox {
    vertical-align: top;
  }

  &-tips {
    line-height: 24px;
    color: #f00;
  }
}
</style>
