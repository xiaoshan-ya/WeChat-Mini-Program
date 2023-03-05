// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db1 = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

const db2 = cloud.database({
    env: 'cloud1-0g0z9xyc11b450fb'
  })

// 云函数入口函数
exports.main = async (event, context) => {
  let changeData = db1.collection('Volunteering_Database')
  
  changeData.where({
    ActivityID: event.volunteerId
  }).remove()

  let deleteData = db2.collection('my_post')

  deleteData.where({
    ActivityID: event.volunteerId,
    isown: true
  }).remove()
}