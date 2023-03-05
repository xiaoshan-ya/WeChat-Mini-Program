// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:'cloud1-0gvq4q44e3a1abbf'
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const _ = db.command

    // 返回数据中，errMsg:"collection.update:ok"为调用成功
    try{
        db.collection('Volunteering_Database').where({
            ActivityID: event.ActivityID
        }).update({
            data: {
                n_current: _.inc(1)
            }
        })

        return await db.collection('my_partcicpation').where({
            ActivityID: event.ActivityID,
            UserID: event.UserID
        }).update({
            data: {
                isApply: true
            }
        })
    } catch(e) {
        console.error(e)
    }
}
