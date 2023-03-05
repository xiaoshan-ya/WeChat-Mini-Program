// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let returnData = db.collection('UserInformation')

  let user = await returnData.where({
    _id: event.uid
  }).get()

  var person = {
    name: user.data[0].name,
    gen: user.data[0].gen,
    longtext: user.data[0].longtext,
    mail: user.data[0].mail,
    phone: user.data[0].phone,
    pic: user.data[0].pic,
    score: user.data[0].score,
    uid:user.data[0]._id
  }

  return person
}