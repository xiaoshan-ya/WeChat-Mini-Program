// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud1-0g0z9xyc11b450fb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 添加到我的发布数据库
  let count = await db.collection('Volunteering_Database').count()
  count = count.total

  let addData = db.collection('my_post')
  addData.add({
      data: {
        UserID: event.uid,
        ActivityID: count + 1 + "",
        isown: true
      }
  })

  // data转string
  var date = new Date(event.starttime)
  str_starting_time = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()
  var date = new Date(event.endtime)
  str_end_time = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()

  // 添加志愿信息
  let insertData = db.collection('Volunteering_Database')
  insertData.add({
    data: {
      title: event.tittle,
      _id: count + 1 + "",
      ActivityID: count + 1 + "",
      image_path: event.Photosrcs,
      details: event.description,
      starting_time: event.starttime,
      end_time: event.endtime,
      str_starting_time: str_starting_time,
      str_end_time: str_end_time,
      n_current: 0,
      n_max: event.maxnum,
      n_needs: event.num,
      overflow: event.over,
      place: event.position,
      time_limit: event.out,
      volunteertime: event.volunteertime,
      sign_in: false,
      secret: "-1"
    }
  }).then(res => {
    return '发布成功'
  }).catch(err=>{
    return '发布失败'
  })
}