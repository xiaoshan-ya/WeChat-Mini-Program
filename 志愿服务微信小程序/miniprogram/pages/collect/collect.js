// pages/collect.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min'); // 引入 SDK 文件
var qqmapsdk; // SDK实例对象
const time={
    '年':[2022,2023,2024],
    '月':[1,2,3,4,5,6,7,8,9,10,11,12],
    '日':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
};
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        he:0,
        search:'',
        province:'省',
        city:'市',
        county:'区',
        startmintime:'年/月/日',
        startmaxtime:'年/月/日',
        endmintime:'年/月/日',
        endmaxtime:'年/月/日',
        startmintimeDate:'',
        startmaxtimeDate:'',
        endmintimeDate:'',
        endmaxtimeDate:'',
        timetype:'',
        ScreenScale:0,
        isRemainNum:false,
        isVonlunteerTime:false,
        isStartTime:false,
        isShowScreenSelect:false,
        isShowAreaSelect: false,
        isShowTimeSelect:false,
        timelist:[
            {values:time['年']},
            {values:time['月']},
            {values:time['日']}
        ],
        areaList: {
            // 变量名称是 van-area 规定写死的，不能换！不能换！不能换！
            province_list: {}, //省
            city_list: {},  //市
            county_list: {} //区
        },
        volunteerList:[],  
        userInformation:[
            { userID:'12345',vonlunteerId:'1',isApply:true,isSubscribe:true},{userID:'12345',vonlunteerId:'2',isApply:false,isSubscribe:true},
        ],
        userSubscribe:[],
        userRelease:[],
        userNewApply:[],
        cnt:0,
        sortColor1:'white',
        sortColor2:'white',
        sortColor3:'white',
        scalecolor1:'white',
        scalecolor2:'white',
        scalecolor3:'white',
        scalecolor4:'white',
    },

    search(e){
        var that=this
        this.setData({
            cnt:0
        })
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                if(that.data.cnt==0){
                    that.setData({
                        volunteerList:res.result.volunteerData,
                    })
                }else{
                    var volunteerList=that.data.volunteerList
                    var volunteerData=res.result.volunteerData
                    for (let index = 0; index < volunteerData.length; index++) {
                        volunteerList.push(volunteerData[index])
                    }
                    that.setData({
                        volunteerList:volunteerList,
                    })
                }
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
    },

    getinput(e){
        this.setData({
            search:e.detail.value,
        })
        console.log(this.data.search)
    },

    screen(e){
        console.log("yes")
        this.setData({
            isShowScreenSelect:true,
        })
    },

    getposition(e){
        this.setData({
            isShowAreaSelect:true
        })
    },

    getTime(e){
        this.setData({
            timetype:e.currentTarget.dataset.type,
            isShowTimeSelect:true
        })
    },

    getScale(e){
        var a=e.currentTarget.dataset.scale
        if(a=="0~10"){
            if(this.data.scalecolor1=="green"){
                this.setData({
                    scalecolor1:'white',
                    ScreenScale:0
                })
            }else{
                this.setData({
                    scalecolor1:'green',
                    ScreenScale:1
                })
            }
            this.setData({
                scalecolor2:'white',
                scalecolor3:'white',
                scalecolor4:'white'
            })
        }else if(a=="10~50"){
            if(this.data.scalecolor2=="green"){
                this.setData({
                    scalecolor2:'white',
                    ScreenScale:0
                })
            }else{
                this.setData({
                    scalecolor2:'green',
                    ScreenScale:2
                })
            }
            this.setData({
                scalecolor1:'white',
                scalecolor3:'white',
                scalecolor4:'white'
            })
        }else if(a=="50~100"){
            if(this.data.scalecolor3=="green"){
                this.setData({
                    scalecolor3:'white',
                    ScreenScale:0
                })
            }else{
                this.setData({
                    scalecolor3:'green',
                    ScreenScale:3
                })
            }
            this.setData({
                scalecolor1:'white',
                scalecolor2:'white',
                scalecolor4:'white'
            })
        }else if(a==">100"){
            if(this.data.scalecolor4=="green"){
                this.setData({
                    scalecolor4:'white',
                    ScreenScale:0
                })
            }else{
                this.setData({
                    scalecolor4:'green',
                    ScreenScale:4
                })
            }
            this.setData({
                scalecolor1:'white',
                scalecolor2:'white',
                scalecolor3:'white'
            })
        }
    },

    getSort(e){
        var str=e.currentTarget.dataset.sorttype
        if(str=="numRemain"){
            if(!this.data.isRemainNum){
                this.setData({
                    sortColor1:'green',
                    isRemainNum:true,
                    cnt:0
                })
            }else{
                this.setData({
                    sortColor1:'white',
                    isRemainNum:false,
                    cnt:0
                })
            }
        }else if(str=="allTime"){
            if(!this.data.isVonlunteerTime){
                this.setData({
                    sortColor2:'green',
                    isVonlunteerTime:true,
                    cnt:0
                })
            }else{
                this.setData({
                    sortColor2:'white',
                    isVonlunteerTime:false,
                    cnt:0
                })
            }
        }else if(str=="startTime"){
            if(!this.data.isStartTime){
                this.setData({
                    sortColor3:'green',
                    isStartTime:true,
                    cnt:0
                })
            }else{
                this.setData({
                    sortColor3:'white',
                    isStartTime:false,
                    cnt:0
                })
            }
        }
        //与后端连接，传变量numRemain，addTime，startTime
        var that=this
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                if(that.data.cnt==0){
                    that.setData({
                        volunteerList:res.result.volunteerData,
                    })
                }else{
                    var volunteerList=that.data.volunteerList
                    var volunteerData=res.result.volunteerData
                    for (let index = 0; index < volunteerData.length; index++) {
                        volunteerList.push(volunteerData[index])
                    }
                    that.setData({
                        volunteerList:volunteerList,
                    })
                }
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
    },

    getDetails(e){
        wx.setStorageSync('details', e.currentTarget.dataset.details)
        let VonId=e.currentTarget.dataset.details.vonlunteerId
        let isApply=false
        let isSubscribe=false
        let isRelease=false
        for (let index = 0; index < this.data.userNewApply.length; index++) {
            if(this.data.userNewApply[index].ActivityID==VonId){
                isApply=this.data.userNewApply[index].isApply
            }
        }
        for (let index = 0; index < this.data.userSubscribe.length; index++) {
            if(this.data.userSubscribe[index].ActivityID==VonId){
                isSubscribe=this.data.userSubscribe[index].isSubscribe
            }
        }
        for (let index = 0; index < this.data.userRelease.length; index++) {
            if(this.data.userRelease[index].ActivityID==VonId){
                isRelease=this.data.userRelease[index].isown
            }
        }
        wx.navigateTo({
          url: '../details/details?isApply='+isApply +'&isSubscribe='+isSubscribe+'&isRelease='+isRelease,
        })
    },

    confirmArea: function (e) {
        const values = e.detail.values
        //直辖市，需要处理数据，保持省市一致，例如，省：北京市；市：北京市；区：朝阳区
        if (values.some(x => !Boolean(x)))[values[1], values[2]] = [values[0], values[1]];    1
        const arr = (values.map(x => x.name))
        //调用父组件的传递方法，并传递选择结果。
        this.triggerEvent("confirm", arr)
        this.setData({
            province:values[0].name,
            city:values[1].name,
            county:values[2].name,
            isShowAreaSelect: false,
        })
    },

    confirmTime:function(e){
        const a=e.detail.value
        let timestamp=Date.parse(new Date())
        let nowTime=new Date(timestamp)
        if(this.data.timetype=='startmin'){
            let timeStr=a[0]+'/'+a[1]+'/'+a[2]
            let time=new Date(timeStr)
            if(nowTime>time){
               wx.showModal({
                 title:'所选时间不能小于当前时间！',
                 showCancel:false,
                 success(res){
                     if(res.confirm){
                         return false
                     }
                 }
               })
            }else{
                this.setData({
                    startmintime:timeStr,
                    startmintimeDate:time,
                    isShowTimeSelect:false,
                })
            }
        }else if(this.data.timetype=='startmax'){
            let timeStr=a[0]+'/'+a[1]+'/'+a[2]
            let time=new Date(timeStr)
            if(nowTime>time){
                wx.showModal({
                  title:'所选时间不能小于当前时间！',
                  showCancel:false,
                  success(res){
                      if(res.confirm){
                          return false
                      }
                  }
                })
            }else{
                this.setData({
                    startmaxtime:timeStr,
                    startmaxtimeDate:time,
                    isShowTimeSelect:false,
                })
            }
        }else if(this.data.timetype=='endmin'){
            let timeStr=a[0]+'/'+a[1]+'/'+a[2]
            let time=new Date(timeStr)
            if(nowTime>time){
                wx.showModal({
                  title:'所选时间不能小于当前时间！',
                  showCancel:false,
                  success(res){
                      if(res.confirm){
                          return false
                      }
                  }
                })
            }else{
                this.setData({
                    endmintime:timeStr,
                    endmintimeDate:time,
                    isShowTimeSelect:false,
                })
            }
        }else if(this.data.timetype=='endmax'){
            let timeStr=a[0]+'/'+a[1]+'/'+a[2]
            let time=new Date(timeStr)
            if(nowTime>time){
                wx.showModal({
                  title:'所选时间不能小于当前时间！',
                  showCancel:false,
                  success(res){
                      if(res.confirm){
                          return false
                      }
                  }
                })
            }else{
                this.setData({
                    endmaxtime:timeStr,
                    endmaxtimeDate:time,
                    isShowTimeSelect:false,
                })
            }
        }
    },

    confirm:function(e){
        //与后端连接
        var that=this
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:0,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                that.setData({
                    volunteerList:res.result.volunteerData,
                    cnt:0,
                })
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
        this.setData({
            isShowScreenSelect:false,
            province:'省',
            city:'市',
            county:'区',
            startmintime:'年/月/日',
            startmaxtime:'年/月/日',
            endmintime:'年/月/日',
            endmaxtime:'年/月/日',
            scalecolor1:'white',
            scalecolor2:'white',
            scalecolor3:'white',
            scalecolor4:'white',
            ScreenScale:0
        })
    },

    closeAreaSelect: function () {
        this.setData({
          isShowAreaSelect: false
        })
      },

    closeScreenShow(){
        this.setData({
            isShowScreenSelect:false
        })
    },

    closeTimeSelect(){
        this.setData({
            isShowTimeSelect:false
        })
    },

    ArrayToObject(arr) {
        const obj = {}
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i].id] = arr[i].fullname
        }
        return obj
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        qqmapsdk=new QQMapWX({
            key:'VR5BZ-F2JR6-RMZS2-M5YAM-55IW7-2LFDR'
        })
        var that=this
        //调用 getCityList 
        qqmapsdk.getCityList({
            success: (res) => { //成功后的回调
                //console.log('省份数据：', res.result[0]); //打印省份数据
                //console.log('城市数据：', res.result[1]); //打印城市数据
                //console.log('区县数据：', res.result[2]); //打印区县数据
                that.setData({
                    "areaList.province_list": that.ArrayToObject(res.result[0]),
                    "areaList.city_list": that.ArrayToObject(res.result[1]),
                    "areaList.county_list": that.ArrayToObject(res.result[2]),
                })
            },
            fail: function (error) {
            console.error(error);
            },
            complete: function (res) {
            console.log(res);
            }
        });
        //与后端通信得到数据
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                if(that.data.cnt==0){
                    that.setData({
                        volunteerList:res.result.volunteerData,
                        userNewApply:res.result.participateActivity,
                        userSubscribe:res.result.subscribeActivity,
                        userRelease:res.result.postActivity,
                    })
                }else{
                    var volunteerList=that.data.volunteerList
                    var volunteerData=res.data.volunteerData
                    for (let index = 0; index < volunteerData.length; index++) {
                        volunteerList.push(volunteerData[index])
                    }
                    that.setData({
                        volunteerList:volunteerList,
                    })
                }
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that=this
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                that.setData({
                    volunteerList:res.result.volunteerData,
                    userNewApply:res.result.participateActivity,
                    userSubscribe:res.result.subscribeActivity,
                    userRelease:res.result.postActivity,
                    cnt:0
                })
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var that=this
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                that.setData({
                    volunteerList:res.result.volunteerData,
                    userNewApply:res.result.participateActivity,
                    userSubscribe:res.result.subscribeActivity,
                    userRelease:res.result.postActivity,
                    cnt:0
                })
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
    
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //与后端连接，维护cnt的值从而得到完整的数据
        var that=this
        this.setData({
            cnt:this.data.cnt+1
        })
        wx.cloud.callFunction({
            name:'showActivityInformation',
            data:{
                //第一次得到数据，按后端默认排序
                //还有一个存在app.js中的userId
                id:getApp().globalData.userInformation._id,
                cnt:this.data.cnt,
                isRemainNum:this.data.isRemainNum,
                isVolunteerTime:this.data.isVonlunteerTime,
                isStartTime:this.data.isStartTime,
                position:this.data.province+'/'+this.data.city+'/'+this.data.county,
                startTime1:this.data.startmintime,
                startTime2:this.data.startmaxtime,
                deadTime1:this.data.endmintime,
                deadTime2:this.data.endmaxtime,
                scale:this.data.ScreenScale,
                search:this.data.search
            },
            success(res){
                if(that.data.cnt==0){
                    that.setData({
                        volunteerList:res.result.volunteerData,
                        //userInformation:that.data.User_activity,
                    })
                }else{
                    var volunteerList=that.data.volunteerList
                    var volunteerData=res.result.volunteerData
                    for (let index = 0; index < volunteerData.length; index++) {
                        volunteerList.push(volunteerData[index])
                    }
                    that.setData({
                        volunteerList:volunteerList,
                    })
                }
            },
            fail(res){
                wx.showModal({
                  title:'系统提醒',
                  content:'读取数据失败',
                  showCancel:false,
                  success(_res){
                      if(_res.confirm){
                          return false
                      }
                  }
                })
            }
        })
        //提醒：search函数还未实现
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})