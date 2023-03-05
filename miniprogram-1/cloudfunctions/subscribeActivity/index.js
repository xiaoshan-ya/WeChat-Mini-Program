// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    try{
        return await db.collection('my_collection').where({
            ActivityID: event.ActivityID,
            UserID: event.UserID
        }).update({
            data: {
                isSubscribe: true
            }
        })
    } catch(e) {
        console.error(e)
    }
}