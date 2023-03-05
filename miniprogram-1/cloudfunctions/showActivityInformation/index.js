// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    let count = await db.collection('Volunteering_Datebase').count()
    count = count.total

    let subscribeActivity = []
    let paritcipateActivity = []
    

    // 得到查询的人数区间，scale: 0（全部），1（<10），2（10-50），3（50-100）,4(>100)
    let minPeopleNum
    let maxPeopleNum
    if (event.scale == 0) {
        minPeopleNum = 1;
        maxPeopleNum = 10000;
    }
    else if (event.scale == 1) {
        minPeopleNum = 1;
        maxPeopleNum = 10;
    } else if (event.scale == 2) {
        minPeopleNum = 11;
        maxPeopleNum = 50;
    }
    else if (event.scale == 3) {
        minPeopleNum = 51;
        maxPeopleNum = 100;
    }
    else {
        minPeopleNum = 101;
        maxPeopleNum = 10000;
    }

    // 得到搜索的时间区间
    let startTime1 = new Date();
    var x = startTime1.getFullYear() + "-" + (startTime1.getMonth() + 1) + "-" + startTime1.getDate();

    startTime1 = new Date(x);
    let startTime2 = new Date('2099-12-30');
    let deadTime1 = new Date(x);
    let deadTime2 = new Date('2099-12-30');
    if (event.startTime1 != "") {
        startTime1 = new Date(event.startTime1);
        startTime2 = new Date(event.startTime2);
        deadTime1 = new Date(event.deadTime1);
        deadTime2 = new Date(event.deadTime2);
    }

    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    // 先进行规模和地点的筛选
    let allActivity = []
    for (let i = 0; i < count; i++) { //自己设置每次获取数据的量
        let activity = await db.collection('Volunteering_Datebase').skip(i).get();
        activity = activity.data
        if (event.positon != "") { // 当有地点查询限制时
            if (event.positon == activity.place && 
            activity.n_needs >= minPeopleNum && activity.n_needs <= maxPeopleNum) {
                allActivity = allActivity.concat(activity);
            }
        }
        else { // 没有地点查询限制
            if (activity.n_needs >= minPeopleNum && activity.n_needs <= maxPeopleNum) {
                allActivity = allActivity.concat(activity);
            }
        }
    }


    // 通过搜索时间进行筛选
    let resultActivity = []
    for (let i = 0; i < allActivity.length; i++) {
        if(allActivity[i].starting_time >= startTime1 && allActivity[i].starting_time <= startTime2
        && allActivity[i].end_time >= deadTime1 && allActivity[i].end_time <= deadTime2) {
            resultActivity.push(allActivity[i])
        }
    }

    // 进行排序:冒泡排序法，从大到小
    if (event.isRemainNum) { // 根据剩余人数排序：n_max - n_current
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 1; j < resultActivity.length - i - 1; j++) {
                if ((resultActivity[i].n_max - resultActivity[i].n_current) < (resultActivity[j].n_max - resultActivity[j].n_current)) {
                    let temp = resultActivity[i];
                    resultActivity[i] = resultActivity[j];
                    resultActivity[j] = temp;
                }
            }
        }
    }
    else if (isVonlunteerTime) { // 根据志愿时长：volunteertime * 天数
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 1; j < resultActivity.length - i - 1; j++) {
                let x = resultActivity[i].volunteertime * (30 * (resultActivity[i].end_time.getMonth() - resultActivity[i].starting_time.getMonth()) + 
                (resultActivity[i].end_time.getDate() - resultActivity[i].starting_time.getDate()))

                let y = resultActivity[j].volunteertime * (30 * (resultActivity[j].end_time.getMonth() - resultActivity[j].starting_time.getMonth()) + 
                (resultActivity[j].end_time.getDate() - resultActivity[j].starting_time.getDate()))

                if (x < y) {
                    let temp = resultActivity[i];
                    resultActivity[i] = resultActivity[j];
                    resultActivity[j] = temp;
                }
            }
        }
    }
    else if (isStartTime) { // 根据开始时间：starting_time
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 1; j < resultActivity.length - i - 1; j++) {
                if (resultActivity[i].starting_time < resultActivity[j].starting_time) {
                    let temp = resultActivity[i];
                    resultActivity[i] = resultActivity[j];
                    resultActivity[j] = temp;
                }
            }
        }
    }

    // 实现搜索功能：对标题进行搜索
    if (search != "") {
        let activity = []
        for (let i = 0; i < resultActivity.length; i++) {
            if (resultActivity[i].title.indexOf(event.search) >= 0) {
                activity.push(resultActivity[i])
            }
        }

        return {
            activity: activity,

        }
    }else {
        return {
            activity: resultActivity,

        }
    }

    
}