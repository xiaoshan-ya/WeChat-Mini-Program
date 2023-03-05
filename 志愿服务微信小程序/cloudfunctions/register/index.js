// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();

    let count = await db.collection('UserInformation').count()
    count = count.total
    var judge = true;
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    for (let i = 0; i < count; i++) { //自己设置每次获取数据的量
        let list = await db.collection('UserInformation').limit(1).skip(i).get();
        list = list.data[0];
        if (list.phone == event.phoneNumber) judge = false
    }

    // 向数据库添加一条用户信息
    // 添加成功 errMsg: "collection.add:ok"
    // 向数据库添加用户信息时，所有_id都是唯一的

    if (judge) {
        db.collection('UserInformation').add({
            data: {
                _id: count + 1,
                UserID:count+1,
                name: event.name,
                password: event.password,
                phone: event.phoneNumber,
                gen: "未知",
                longtext: "该用户未填写",
                mail: "未绑定",
                pic: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
                score: 0
            },
            success:function(res) {
                console.log("成功")
            },
        })

        return true
    }
    else {
        return false
    }

}