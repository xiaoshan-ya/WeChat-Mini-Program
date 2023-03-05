// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let changeData = db.collection('Volunteering_Database')

  changeData.where({
    ActivityID: event.volunteerId
  }).update({
    data: {
      secret: event.secret,
      sign_in: true
    }
  })
}