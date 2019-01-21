// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
//此函数计算用户关系表
exports.main = async (event, context) => {
  //relation sheet
  var urs = await db.collection('user_relation_sheet').doc('XBZEw97E7L4wsUCA').get()
  urs = urs['data']['mr_list']

  return {
    urs
  }
}