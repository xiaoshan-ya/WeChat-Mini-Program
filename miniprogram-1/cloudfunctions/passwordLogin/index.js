// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 密码登录
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();

    var errorCode = 2;
    var message = "不存在该用户";
    var data = null;
    let count = await db.collection('UserInformation').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i++) { //自己设置每次获取数据的量
        let list = await db.collection('UserInformation').skip(i).get();
        all = all.concat(list.data);
    }

    // 查找UserInformation中手机号与传入相符的数据，检查密码是否相同
    // 密码相同返回：0,同时返回用户的个人信息
    // 密码不同返回：1
    // 未找到手机号返回：2
    for (let i = 0; i < count; i++) {
        if (all[i].phoneNumber == event.phoneNumber) {
            if (all[i].password == event.password) {
                errorCode = 0;
                data = all[i];
                message = "登陆成功";
            }
            else {
                errorCode = 1;
                message = "密码不正确";
            }
        }
    }

    return {
        errorCode: errorCode,
        userInformation: data,
        message: message
    }
}