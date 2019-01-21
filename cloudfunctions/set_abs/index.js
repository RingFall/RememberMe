//传入一个数组名为array
//此函数返回一个集合不为0的元素个数
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  console.log(event.array)
  return{
    sum: event.array.length
  }
}                              