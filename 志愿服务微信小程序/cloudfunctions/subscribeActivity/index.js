// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    let count = await db.collection('my_collection').count()
    count = count.total

    var activity = await db.collection('my_collection').where({
        ActivityID: event.ActivityID,
        UserID: event.UserID
    }).get()

    if (activity.data.length != 0) {
        db.collection('my_collection').where({
            ActivityID: event.ActivityID,
            UserID: event.UserID
        }).update({
            data: {
                isSubscribe: true
            }
        })
    }
    else {
        db.collection('my_collection').add({
            data:{
                _id:count + 1,
                ActivityID:event.ActivityID,
                UserID: event.UserID,
                isSubscribe: true
            }
        })
    }

}