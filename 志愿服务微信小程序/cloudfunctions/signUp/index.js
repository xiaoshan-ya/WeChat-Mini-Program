// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const _ = db.command

    let count = await db.collection('my_participation').count()
    count = count.total

    // 返回数据中，errMsg:"collection.update:ok"为调用成功
    try{
        db.collection('Volunteering_Database').where({
            ActivityID: event.ActivityID
        }).update({
            data: {
                n_current: _.inc(1)
            }
        })

        var activity = await db.collection('my_participation').where({
            ActivityID: event.ActivityID,
            UserID: event.UserID
        }).get()
        
        if (activity.data.length != 0) {
            db.collection('my_participation').where({
                ActivityID: event.ActivityID,
                UserID: event.UserID
            }).update({
                data: {
                    isApply: true
                }
            })
        }
        else {
            db.collection('my_participation').add({
                data:{
                    _id:count + 1,
                    ActivityID:event.ActivityID,
                    UserID: event.UserID,
                    isApply: true,
                    sign_in: false
                }
            })
        }
        

    } catch(e) {
        console.error(e)
    }
}
