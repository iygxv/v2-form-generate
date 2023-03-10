## 代码演示

### 基础用法

通过`v-model`可以绑定文件上传成功后接口返回的url

```html
<app-upload action="xxx/xx" v-model="fileUrl" />
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 上传组件类型 | String | image/file | image |
| value/v-model | 绑定值 | String | - | - |
| accept | 文件类型 | String | - | image/* |
| action | 上传地址(必须) | String | - | - |
| name | 上传文件的字段名 | String | - | uploadFile |
| width | type为image时组件宽度 | String | - | 120px |
| height | type为image时组件高度 | String | - | 120px |
| disabled | 禁用 | Boolean | - | false |
| uploadSuccess | 上传成功回调函数 | Function | - | - |
| showRemoveButton | 显示删除按钮 | Boolean | - | true |
| removeText | 移除已选择文件按钮文案 | String | - | 删除 |
| maxSize | 文件大小限制，单位为 byte | Number \| String | - | 5 * 1024 * 1024 |
| maxSizeFileType | 文件格式匹配的正则 | String | - | \.(png\|jpg\|jpeg\|gif)$ |
| maxSizeToastMsg | 文件超出大小的提示msg | String | - | 请选择少于5MB的图片 |
| showUploadedFileType | 显示上传文件类型 | Boolean | - | false |
| fileType | 文件类型 | String\|Function | - | - |

注意：value/v-model仅在接口返回数据包含path时才会自动更新！如上传接口返回数据不包含path时，需使用uploadSuccess手动更新value值。

### Events

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| change | 文件变化 | - | file |
| remove | 删除成功回调函数 | - | - |
| updateFileType | 文件类型更新函数 | - | string |


### Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| reset | 重置组件状态 | - | - |