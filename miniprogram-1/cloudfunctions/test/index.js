// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    var date = new Date();
    var x = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    date = new Date(x);

    var list = [];
    // for (var i = 0; i < 5; i++) {
    //     list[i] = i
    // }

    list.push("123456");
    list.push("abcdef")
    list.push("这是一个志愿活动,在南京")
    var result = []
    // for (var i = 0; i < 3; i++) {
    //     if (list[i].indexOf("南京") >= 0) {
    //         list.splice(i, 1)
    //     }
    // }

    for (let i = 0; i < 3; i++) {
        if (!indexofStr.incloudes(list[i], "南京")) {
            list.splice(i, 1)
        }
    }
    return list
}