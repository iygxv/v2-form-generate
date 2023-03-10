/**
 * 文件大小判断
 *
 * @param   {Object}  file     选择的文件
 * @param   {Number|String}  maxSize  限制的大小
 * @param   {String}  type     文件类型的正则
 *
 * @return  {Boolean}           是否超出大小限制
 */
export function isOverSize(file, maxSize, type) {
  if (maxSize == 0) {
    return false;
  }
  let reg = new RegExp(type, 'i');
  if (reg.test(file.name)) {
    return file.size > maxSize;
  }
  return false;
}
