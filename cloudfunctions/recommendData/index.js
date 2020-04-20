// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-0c8bcd'
})

const db = cloud.database()

//获取数据库查询及更新指令
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('commodity').limit(4).get()
}