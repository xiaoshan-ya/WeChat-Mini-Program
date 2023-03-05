// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const _ = db.command

    try{
        db.collection('my_partcicpation').where({
            ActivityID: event.ActivityID,
            UserID: event.UserID
        }).update({
            data: {
                isApply: false
            }
        })
    } catch(e) {
        console.error(e)
    }

    // 在总志愿活动修改报名人数
    return await db.collection('Volunteering_Database').where({
        ActivityID: event.ActivityID    }).update({
        data: {
            n_current: _.inc(-1)
        }
    })
}