// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    let count = await db.collection('Volunteering_Database').count()
    count = count.total

    let subscribeActivity = [] // 得到用户收藏的活动ID
    let count1 = await db.collection('my_collection').count()
    count1 = count1.total
    for (var i = 0; i < count1; i++) {
        let activity = await db.collection('my_collection').limit(1).skip(i).get();
        activity = activity.data[0];
        if (activity.UserID == event.id) {
            subscribeActivity.push(activity)
        }
    }

    let paritcipateActivity = [] // 得到用户参与的活动ID
    let count2 = await db.collection('my_participation').count()
    count2 = count2.total
    for (var i = 0; i < count2; i++) {
        let activity = await db.collection('my_participation').limit(1).skip(i).get();
        activity = activity.data[0];
        if (activity.UserID == event.id) {
            paritcipateActivity.push(activity)
        }
    }

    let postActivity = [] // 得到用户参与的活动ID
    let count3 = await db.collection('my_post').count()
    count3 = count3.total
    for (var i = 0; i < count3; i++) {
        let activity = await db.collection('my_post').limit(1).skip(i).get();
        activity = activity.data[0];
        if (activity.UserID == event.id) {
            postActivity.push(activity)
        }
    }
    

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
    if (event.startTime1 != "年/月/日") {
        startTime1 = new Date(event.startTime1);
        startTime2 = new Date(event.startTime2);
        deadTime1 = new Date(event.deadTime1);
        deadTime2 = new Date(event.deadTime2);
    }

    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    // 先进行规模和地点的筛选
    let allActivity = []
    for (let i = 0; i < count; i++) { //自己设置每次获取数据的量
        let activity = await db.collection('Volunteering_Database').limit(1).skip(i).get();
        activity = activity.data[0]
        if(!activity.overflow){
            activity.n_max=activity.n_needs
        }
        if (event.position != "省/市/区") { // 当有地点查询限制时
            if ((event.position == activity.place) && 
            (activity.n_max >= minPeopleNum) && (activity.n_max <= maxPeopleNum)) {
                allActivity.push(activity)
            }
        }
        else { // 没有地点查询限制
            if ((activity.n_max >= minPeopleNum) && (activity.n_max <= maxPeopleNum)) {
                allActivity.push(activity)
            }
        }
    }


    // 通过搜索时间进行筛选
    let resultActivity = []
    for (let i = 0; i < allActivity.length; i++) {
        var starting_time = new Date(allActivity[i].str_starting_time)
        allActivity[i].starting_time=starting_time
        var end_time = new Date(allActivity[i].str_end_time)
        allActivity[i].end_time=end_time
        if(starting_time >= startTime1 && starting_time <= startTime2
        && end_time >= deadTime1 && end_time <= deadTime2) {
            resultActivity.push(allActivity[i])
        }
    }

    // 进行排序:冒泡排序法，从大到小
    if (event.isRemainNum) { // 根据剩余人数排序：n_max - n_current
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 0; j < resultActivity.length - i - 1; j++) {
                if ((resultActivity[j].n_max - resultActivity[j].n_current) < (resultActivity[j+1].n_max - resultActivity[j+1].n_current)) {
                    let temp = resultActivity[j];
                    resultActivity[j] = resultActivity[j+1];
                    resultActivity[j+1] = temp;
                }
            }
        }
    }
    if (event.isVolunteerTime) { // 根据志愿时长：volunteertime * 天数
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 0; j < resultActivity.length - i - 1; j++) {
                let x = resultActivity[j].volunteertime * (30 * (resultActivity[j].end_time.getMonth() - resultActivity[j].starting_time.getMonth()) + 
                (resultActivity[j].end_time.getDate() - resultActivity[j].starting_time.getDate()))

                let y = resultActivity[j+1].volunteertime * (30 * (resultActivity[j+1].end_time.getMonth() - resultActivity[j+1].starting_time.getMonth()) + 
                (resultActivity[j+1].end_time.getDate() - resultActivity[j+1].starting_time.getDate()))

                if (x < y) {
                    let temp = resultActivity[j];
                    resultActivity[j] = resultActivity[j+1];
                    resultActivity[j+1] = temp;
                }
            }
        }
    }
    if (event.isStartTime) { // 根据开始时间：starting_time
        for (let i = 0; i < resultActivity.length; i++) {
            for (let j = 0; j < resultActivity.length - i - 1; j++) {
                if (resultActivity[j].starting_time > resultActivity[j+1].starting_time) {
                    let temp = resultActivity[j];
                    resultActivity[j] = resultActivity[j+1];
                    resultActivity[j+1] = temp;
                }
            }
        }
    }

    // 实现搜索功能：对标题进行搜索
    if (event.search != "") {
        let activity = []
        for (let i = 0; i < resultActivity.length; i++) {
            if (resultActivity[i].title.indexOf(event.search) >= 0) {
                var x = {
                    //用正常命名
                    vonlunteerId:resultActivity[i].ActivityID,
                    Photosrcs:resultActivity[i].image_path,
                    tittle:resultActivity[i].title,
                    position:resultActivity[i].place,
                    num:resultActivity[i].n_needs,
                    over:resultActivity[i].overflow,
                    maxnum:resultActivity[i].n_max,
                    out:resultActivity[i].time_limit,
                    description:resultActivity[i].details,
                    now:resultActivity[i].n_current,
                    starttime:resultActivity[i].starting_time,
                    starttimeStr:resultActivity[i].str_starting_time,
                    endtime:resultActivity[i].end_time,
                    endtimeStr:resultActivity[i].str_end_time,
                    volunteerTime:resultActivity[i].volunteertime
                }
                activity.push(x)
            }
        }
        let new_activity=[]
        for(let i=event.cnt*10;i<(event.cnt+1)*10&&i<activity.length;i++){
            new_activity.push(activity[i])
        }
        return {
            volunteerData: new_activity,
            subscribeActivity: subscribeActivity,
            paritcipateActivity: paritcipateActivity,
            postActivity: postActivity
        }
    }else {
        let activity=[]
        for (let i=event.cnt*10;i<(event.cnt+1)*10&&i<resultActivity.length;i++){
            var x = {
                //用正常命名
                vonlunteerId:resultActivity[i].ActivityID,
                Photosrcs:resultActivity[i].image_path,
                tittle:resultActivity[i].title,
                position:resultActivity[i].place,
                num:resultActivity[i].n_needs,
                over:resultActivity[i].overflow,
                maxnum:resultActivity[i].n_max,
                out:resultActivity[i].time_limit,
                description:resultActivity[i].details,
                now:resultActivity[i].n_current,
                starttime:resultActivity[i].starting_time,
                starttimeStr:resultActivity[i].str_starting_time,
                endtime:resultActivity[i].end_time,
                endtimeStr:resultActivity[i].str_end_time,
                volunteerTime:resultActivity[i].volunteertime
            }
            activity.push(x)
        }
        return {
            volunteerData: activity,
            subscribeActivity: subscribeActivity,
            participateActivity: paritcipateActivity,
            postActivity: postActivity
        }
    }

    
}