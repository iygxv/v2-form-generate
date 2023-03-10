<template>
  <div class="app-upload-box">
    <input
      :accept="accept"
      type="file"
      ref="fileInput"
      style="display: none;"
      @change="handleChange">

    <template v-if="type === 'image'">
      <div
        :style="{ width: width, height: height }"
        :class="{ 'is-disabled': disabled }"
        class="app-upload-image"
        @click="trigger">
        <img v-show="imgUrl" :src="imgUrl" class="app-upload-img">
        <i v-show="!imgUrl" :style="{ 'line-height': height }" class="el-icon-plus app-upload-icon"></i>

        <div v-show="isUploaded" class="app-upload-success">
          <i class="el-icon-check"></i>
        </div>
      </div>
    </template>
    <template v-else-if="type === 'file'">
      <div class="app-upload-file-group">
        <input v-model="fileName" type="text" readonly autocomplete="off" class="app-upload-file-name">
        <div class="app-upload-file-append">
          <el-button
            :disabled="disabled"
            type="primary"
            icon="el-icon-folder-opened"
            @click="trigger">
            选择文件
          </el-button>
        </div>
      </div>
    </template>
    <div v-if="uploadTips" class="app-upload-tips">{{ uploadTips }}</div>
    <div class="app-upload-btns">
      <el-button
        :loading="uploading"
        :disabled="isUploaded || disabled || !file"
        type="primary"
        size="small"
        class="app-upload-btn"
        @click="upload">
        {{ isUploaded ? '已上传' : '上传' }}
      </el-button>
      <el-button
        v-if="showRemoveButton"
        :loading="uploading"
        :disabled="!file && !isUploaded"
        type="danger"
        size="small"
        @click="removeFile">
        {{ removeText }}
      </el-button>
    </div>
    <template v-if="showUploadedFileType">
      <div v-show="isUploaded" class="app-upload-filetype">当前上传文件格式：{{ getShowFileType() }}</div>
    </template>
  </div>
</template>

<script>
import { isOverSize } from './utils';
export default {
  name: 'AppUpload',
  props: {
    value: String,
    accept: {
      type: String,
      default: 'image/*'
    },
    type: {
      type: String,
      default: 'image'
    },
    action: {
      type: String,
      default: '/admin/upload/img'
    },
    uploadTips: String,
    name: {
      type: String,
      default: 'uploadFile'
    },
    width: {
      type: String,
      default: '120px'
    },
    height: {
      type: String,
      default: '120px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadSuccess: Function,
    showRemoveButton: {
      type: Boolean,
      default: true
    },
    removeText: {
      type: String,
      default: '删除'
    },
    maxSize: {
      type: [Number, String],
      default: 5 * 1024 * 1024
    },
    maxSizeFileType: {
      type: String,
      default: '\.(png|jpg|jpeg|gif)$'
    },
    maxSizeToastMsg: {
      type: String,
      default: '请选择少于5MB的图片'
    },
    showUploadedFileType: {
      type: Boolean,
      default: false
    },
    fileType: [String, Function]
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.isUploaded = !!this.value;
        if (this.type === 'image') {
          if (!this.isPreview) {
            this.imgUrl && window.URL.revokeObjectURL(this.imgUrl);
            this.imgUrl = this.value;
          }
        } else if (this.type === 'file') {
          !this.fileName && (this.fileName = this.value);
        }
      }
    }
  },
  data() {
    return {
      file: null,
      imgUrl: null,
      fileName: null,
      uploadedFileType: null,

      uploading: false,
      isPreview: false,
      isUploaded: false
    }
  },
  methods: {
    getShowFileType() {
      if (this.fileType && typeof this.fileType === 'function') {
        return this.fileType();
      } else {
        return this.fileType || this.uploadedFileType;
      }
    },

    removeFile() {
      this.reset();
      this.$emit('input', '');
      this.$emit('updateFileType', this.uploadedFileType);
      this.$emit('remove');
    },
    reset() {
      this.imgUrl && window.URL.revokeObjectURL(this.imgUrl);
      this.$refs.fileInput.value = null;
      this.file = null;
      this.fileName = null;
      this.uploadedFileType = null;
      this.imgUrl = null;
      this.uploading = false;
      this.isPreview = false;
      this.isUploaded = false;
    },
    trigger() {
      if (!this.disabled) {
        this.$refs.fileInput.value = null;
        this.$refs.fileInput.click();
      }
    },
    handleChange(ev) {
      let files = ev.target.files;
      if (!files || !files.length) {
        return;
      }
      let file = files[0];
      let oversize = isOverSize(file, this.maxSize, this.maxSizeFileType);
      if (oversize) {
        this.$message.error(this.maxSizeToastMsg);
        return;
      }
      this.isUploaded = false;
      if (this.type === 'image') {
        this.isPreview = true;
        this.imgUrl && window.URL.revokeObjectURL(this.imgUrl);
        this.imgUrl = window.URL.createObjectURL(file);
      } else if (this.type === 'file') {
        this.fileName = file.name;
      }
      this.uploadedFileType = null;
      this.file = file;
      this.$emit('updateFileType', this.uploadedFileType);
      this.$emit('input', '');
      this.$emit('change', file);
    },
    upload() {
      let fd = new FormData();
      fd.append(this.name, this.file);
      this.uploading = true;
      this.$request.post({
        url: this.action,
        data: fd,
        loading: {
          show: false
        },
        isSerialized: true,
        returnError: true
      }).then((data) => {
        if (this.uploadSuccess) {
          this.uploadSuccess(data, this.file);
        } else if (data.path) {
          this.isPreview = false;
          this.$emit('input', data.path);
        }
        let fileType = this.file.name.match(/\.([^\.]+)$/);
        this.uploadedFileType = fileType ? fileType[1] : null;
        this.uploading = false;
        this.isUploaded = true;
        this.$emit('updateFileType', this.uploadedFileType);
      }).catch(() => {
        this.uploading = false;
      });
    }
  }
}
</script>

<style lang="scss">
  .app-upload-image {
    position: relative;
    vertical-align: top;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: content-box;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    &.is-disabled {
      cursor: not-allowed;
      &:hover {
        border-color: #d9d9d9;
      }
    }
    &:hover {
      border-color: #409EFF;
    }
    .app-upload-img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    .app-upload-icon {
      width: 100%;
      font-size: 28px;
      color: #8c939d;
    }

    .app-upload-success {
      position: absolute;
      z-index: 2;
      top: -6px;
      right: -15px;
      width: 40px;
      height: 24px;
      line-height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);

      .el-icon-check {
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
        transform: rotate(-45deg);
      }
    }
  }
  .app-upload-file-group {
    display: inline-table;
    width: 100%;
    line-height: normal;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 14px;
    .app-upload-file-name {
      -webkit-appearance: none;
      display: table-cell;
      vertical-align: middle;
      width: 100%;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      background-image: none;
      color: #606266;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .app-upload-file-append {
      display: table-cell;
      vertical-align: middle;
      position: relative;
      white-space: nowrap;
      width: 1px;

      .el-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .app-upload-tips {
    margin-top: 5px;
    line-height: 16px;
    font-size: 12px;
  }
  .app-upload-btns {
    margin-top: 5px;
    line-height: 0;
  }
  .app-upload-btn {
    vertical-align: top;
  }
  .app-upload-filetype {
    color: #409EFF;
  }
</style>