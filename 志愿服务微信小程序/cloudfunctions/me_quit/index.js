// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 删除我的参与
  let deleteData = db.collection('my_participation')
  deleteData.where({
    UserID: event.uid
  }).remove()
  
  // 删除我的收藏
  let deleteData = db.collection('my_collection')
  deleteData.where({
    UserID: event.uid
  }).remove()

  // 获取我发布的活动id
  let searchData = db.collection('my_post')
  const count = await searchData.where({
    UserID: event.uid
  }).count()
  const total = count.total
  const batchTimes = Math.ceil(total / 100)

  var vid = []
  for(let i = 0; i < batchTimes; i++) {
    var list = await searchData.where({
      UserID: event.uid
    }).skip(i * 100).get()

    for(let j = 0; j < list.data.length; j++){
      vid.push(list.data[j].ActivityID)
    }
  }

  // 删除我发布的志愿活动信息
  let deleteData = db.collection('Volunteering_Database')
  for(let i = 0; i < vid.length; i++){
    deleteData.where({
      ActivityID: vid[i]
    }).remove()
  }
  
  // 删除我的发布
  let deleteData = db.collection('my_post')
  deleteData.where({
    UserID: event.uid
  }).remove()

  // 删除个人信息
  deleteData.where({
    UserID: event.uid
  }).remove()
}