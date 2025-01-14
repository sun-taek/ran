/**
 * @description: 过滤对象的属性，去除对象中在list数组里面有的属性，返回一个新对象，一般是用于去除空字符和null
 * @param {Object} obj 传入对象
 * @param {Array} list 传入数组
 * @return {Object}
 */

const filterObj = (obj: Record<string, unknown>, list: Array<string>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  Object.keys(obj).forEach((item) => {
    if (!list.includes(item)) {
      result[item] = obj[item];
    }
  });
  return result;
};

export default filterObj;
