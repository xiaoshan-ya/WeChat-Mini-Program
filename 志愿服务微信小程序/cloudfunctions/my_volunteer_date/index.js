// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db1 = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})
const db2 = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})
const db3 = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let searchData = db1.collection('Volunteering_Database')
  let changeData = db2.collection('my_participation')
  let addData = db3.collection('UserInformation')

  let activity = await searchData.where({
    ActivityID: event.vonlunteerId
  }).get()

  // 计算志愿时长
  const time = activity.data[0].starting_time - activity.data[0].end_time
  const day = time / 86400000 + 1
  const hours = day * activity.data[0].volunteertime

  // 判断签到结果
  if (activity.data[0].sign_in == false) {
    return 3
  } else if (event.secret == activity.data[0].secret) {
    changeData.where({
      UserID: event.uid,
      ActivityID: event.vonlunteerId
    }).update({
      data: {
        sign_in: true
      }
    }).then(res=>{
      // 签到成功，志愿时长增加
      const _ = db3.command
      addData.where({
        UserID: event.uid
      }).update({
        data: {
          score: _.inc(hours)
        }
      })
    })
    return 1
  } else {
    return 2
  }
}