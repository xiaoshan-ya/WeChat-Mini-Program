// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 验证码登录
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();

    // 查找是否存在该名用户的手机号
    // 存在该用户，返回0，同时返回用户个人信息
    // 不存在该用户，返回 1
    let errorCode = 1;
    let message = "不存在该用户";
    let data = null;
    let count = await db.collection('UserInformation').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i++) { //自己设置每次获取数据的量
        let list = await db.collection('UserInformation').skip(i).get();
        all = all.concat(list.data);
    }

    for (let i = 0; i < count; i++) {
        if (all[i].phoneNumber == event.phoneNumber) {
            errorCode = 0;
            message = "登陆成功";
            data = all[i];
            break;
        }
    }

    return {
        errorCode: errorCode,
        userInformation: data,
        message: message
    }
}