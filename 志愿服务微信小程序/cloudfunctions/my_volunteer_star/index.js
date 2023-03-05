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
  let searchData = db1.collection('my_collection')

  // 计算查询的活动总数
  const count = await searchData.where({
    UserID: event.uid,
    isSubscribe: true
  }).count()
  const total = count.total
  const batchTimes = Math.ceil(total / 100)

  // 获取所需要的活动ID
  var IDs = []
  var volunteerlist = []
  for(let i = 0; i < batchTimes; i++) {
    var list = await searchData.where({
      UserID: event.uid,
      isSubscribe: true
    }).skip(i * 100).get()

    for(let j = 0; j < list.data.length; j++){
      IDs.push(list.data[j].ActivityID)
    }
  }

  // 获取ID对应的志愿活动详情
  let returnData = db2.collection('Volunteering_Database')
  for(let i = 0; i < IDs.length; i++){
    var object = await returnData.where({
      ActivityID: IDs[i]
    }).get()
    
    var Object = {
      tittle: object.data[0].title,
      vonlunteerId: object.data[0].ActivityID,
      Photosrcs: object.data[0].image_path,
      position: object.data[0].place,
      now: object.data[0].n_current,
      num: object.data[0].n_needs,
      maxnum: object.data[0].n_max,
      over: object.data[0].overflow,
      description: object.data[0].details,
      starttime: object.data[0].starting_time,
      endtime: object.data[0].end_time,
      starttimeStr: object.data[0].str_starting_time,
      endtimeStr: object.data[0].str_end_time,
      out: object.data[0].time_limit,
      volunteertime: object.data[0].volunteertime
    }
    volunteerlist.push(Object)
  }

  // todo 列表按时间顺序排序
  const len = volunteerlist.length
  for(let i = 0; i < len - 1; i++){
    for(let j = 0; j < len - 1 - i; j++){
      if(volunteerlist[j].starttime > volunteerlist[j+1].starttime) {
        var temp = volunteerlist[j+1]
        volunteerlist[j+1] = volunteerlist[j]
        volunteerlist[j] = temp
      }
    }
  }

  return volunteerlist
}