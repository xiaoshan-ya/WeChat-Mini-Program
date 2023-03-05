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
  let searchData = db1.collection('my_participation')

  // 计算查询的志愿者总数
  const count = await searchData.where({
    ActivityID: event.volunteerId,
    isApply: true
  }).count()
  const total = count.total
  const batchTimes = Math.ceil(total / 100)

  // 获取参与者的用户ID
  var IDs = []
  const person = []
  for(let i = 0; i < batchTimes; i++) {
    var list = await searchData.where({
      ActivityID: event.volunteerId,
      isApply: true
    }).skip(i * 100).get()

    for(let j = 0; j < list.data.length; j++){
      IDs.push(list.data[j].UserID)
    }
  }

  // 获取ID对应的志愿者详情
  let returnData = db2.collection('UserInformation')
  for(let i = 0; i < IDs.length; i++){
    var user = await returnData.where({
      UserID: IDs[i]
    }).get()

    var signin = await searchData.where({
      ActivityID: event.volunteerId,
      isApply: true,
      UserID: IDs[i]
    }).get()

    var User = {
      uid: user.data[0].UserID,
      phonenumber: user.data[0].phone,
      name: user.data[0].name,
      ok: signin.data[0].sign_in
    }

    person.push(User)
  }

  return person
}