// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let changeData = db.collection('UserInformation')

  changeData.where({
    _id: event.person.uid
  }).update({
    data: {
      name: event.person.name,
      gen: event.person.gen,
      longtext: event.person.longtext,
      mail: event.person.mail,
      phone: event.person.phone,
      pic: event.person.pic,
      UserID:event.person.uid
    }
  })
}