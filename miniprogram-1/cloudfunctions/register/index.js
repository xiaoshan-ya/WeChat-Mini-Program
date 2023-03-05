// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();

    let count = await db.collection('UserInformation').count()
    count = count.total

    // 向数据库添加一条用户信息
    // 添加成功 errMsg: "collection.add:ok"
    // 向数据库添加用户信息时，所有_id都是唯一的
    return await db.collection('UserInformation').add({
        data: {
            _id: count + 1,
            name: event.name,
            password: event.password,
            phoneNumber: event.phoneNumber
        },
        success:function(res) {
            console.log("成功")
        },
    })
}