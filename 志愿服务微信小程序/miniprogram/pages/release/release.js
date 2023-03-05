// pages/release/release.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min'); // 引入 SDK 文件
var qqmapsdk; // SDK实例对象
const time={
    '年':[2022,2023,2024],
    '月':[1,2,3,4,5,6,7,8,9,10,11,12],
    '日':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tittle:'',
        province:'省',
        city:'市',
        county:'区',
        mintime:'年/月/日',
        maxtime:'年/月/日',
        mintimeDate:'',
        maxtimeDate:'',
        num:'',
        over:'',
        maxnum:'',
        out:'',
        FilePath:[],
        FileIds:[],
        src:'',
        count:0,
        description:'',
        volunteerTime:'',
        isShowVolunteerTime:false,
        volunteerTimeList:[{values:[3,4,5,6,7,8]}],
        isShowAreaSelect: false,
        isShowmintimeSelect:false,
        isShowmaxtimeSelect:false,
        isShowphoto:false,
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
        ButtonColor1:'white',
        ButtonColor2:'white',
    },

    release(e){
        var that=this
        var FileId=[]
        for (var i = 0; i < that.data.FilePath.length; i++) {
            var fileName=that.data.FilePath[i]
            fileName=fileName.slice(11)
            wx.cloud.init()
            wx.cloud.uploadFile({
                cloudPath:'img/'+fileName,
                filePath:that.data.FilePath[i],
                success(_res_){
                    that.data.FileIds.push(_res_.fileID)
                    console.log(_res_.fileID)
                },
                fail(_res_){
                    console.log(_res_.errMsg)
                }
            })
        }
        wx.showToast({
          title: '请稍等',
          duration:6000,
          icon:'loading',
        })
        wx.showModal({
          title:'系统提醒',
          content:'确定要进行发布嘛？',
          success(res){
              if(res.confirm){
                //确定数据全部填完了
                if(that.data.tittle!=''&&that.data.province!='省'&&that.data.num!=''&&that.data.over!==''&&that.data.description!=''&&that.data.starttimeStr!='年/月/日'&&that.data.endtimeStr!='年/月/日'&&that.data.FilePath.length>0){
                    //向云端传入图片
                    //向后端传入数据
                    let starttime=new Date(that.data.mintime)
                    let endtime=new Date(that.data.maxtime)
                    wx.cloud.callFunction({
                        name:'my_post',
                        data:{
                            uid:getApp().globalData.userInformation._id,
                            Photosrcs:that.data.FileIds,
                            tittle:that.data.tittle,
                            position:that.data.province+'/'+that.data.city+'/'+that.data.county,
                            num:that.data.num,
                            over:that.data.over,
                            maxnum:that.data.maxnum,
                            out:that.data.out,
                            description:that.data.description,
                            starttime:starttime,
                            starttimeStr:that.data.mintime,
                            endtime:endtime,
                            endtimeStr:that.data.maxtime,
                            volunteertime:8
                        },
                        success(e){
                            wx.showModal({
                                title:'系统提醒',
                                content:'发布成功！',
                                showCancel:false,
                                success(_res){
                                    if(_res.confirm){
                                        return false
                                        //有待考量
                                    }
                                }
                            })
                        },
                        fail(e){
                            wx.showModal({
                                title:'系统提醒',
                                content:'发布失败！',
                                showCancel:false,
                                success(_res){
                                    if(_res.confirm){
                                        return false
                                        //有待考量
                                    }
                                }
                            })
                        }
                    })
                    //初始化我的发布
                    that.setData({
                        FileIds:[],
                        FilePath:[],
                        tittle:'',
                        province:'省',
                        city:'市',
                        county:'区',
                        mintime:'年/月/日',
                        maxtime:'年/月/日',
                        mintimeDate:'',
                        maxtimeDate:'',
                        num:'',
                        over:'',
                        maxnum:'',
                        out:'',
                        description:'',
                        count:0,
                        ButtonColor1:'white',
                        ButtonColor2:'white',
                    })
                }else{
                    wx.showModal({
                      title:'系统提醒',
                      content:'信息未填充完毕！',
                      showCancel:false,
                      success(_res){
                        if(_res.confirm){
                            return false
                            //有待考量
                        }
                      }
                    })
                }
              }else if(res.cancel){
                return false
              }
          }
        })
    },

    getvolunteertime(e){
        this.setData({
            isShowVolunteerTime:true
        })
    },

    confirmvolunteertime:function(e){
        this.setData({
            volunteerTime:e.detail.value,
            isShowVolunteerTime:false,
        })
    },

    closevolunteertimeSelect:function(){
          this.setData({
              isShowVolunteerTime:false
          })
      },

    remarkinput:function(e){
        this.data.tittle=e.detail.value;
        //console.log(this.data.tittle);
    },

    remarkinputDescribe:function(e){
        this.data.description=e.detail.value;
        //console.log(this.data.tittle);
    },

    remarkNuminput:function(e){
        this.data.num=e.detail.value;
        //console.log(this.data.num);
    },

    remarkMaxNuminput:function(e){
        this.data.maxnum=e.detail.value;
        //console.log(this.data.maxnum);
    },

    getmintime(){
        this.setData({
            isShowmintimeSelect:true
        })
    },

    getmaxtime(){
        this.setData({
            isShowmaxtimeSelect:true
        })
    },

    getposition(e){
        this.setData({
            isShowAreaSelect: true
        })
    },

    yes(e){
        if(!this.data.over){
            this.setData({
                ButtonColor1:'#708090',
                ButtonColor2:'white',
                over:true
            })
        }else{
            this.setData({
                ButtonColor1:'white',
                over:false
            })
        }
    },

    no(e){
        if(this.data.over){
            this.setData({
                ButtonColor1:'white',
                ButtonColor2:'#708090',
                over:false
            })
        }else{
            if(this.data.ButtonColor2=="white"){
                this.setData({
                    ButtonColor2:'#708090',
                    over:false
                })
            }else{
                this.setData({
                    ButtonColor2:'white'
                })
            }
        }
    },

    getphoto(e){
        var that=this
        wx.chooseMedia({
          count:9,
          mediaType:['image'],
          sourceType:['album','camera'],
          maxDuration:10,
          camera:'back',
          success(res){
            const c=that.data.FilePath
            for (let index1 = c.length ,index2=0; index2 < res.tempFiles.length&&index1<9; index1++,index2++) {
                c[index1] = res.tempFiles[index2].tempFilePath;
                that.setData({
                    count:that.data.count+1
                })
            }
            //that.data.src=that.data.FilePath[0]
            that.setData({
                FilePath:c,
            })
            /*
            wx.getImageInfo({
              src: that.data.FilePath[0],
              success(res){
                  console.log('yes')
              }
            })
            **/
            wx.previewImage({
              urls: that.data.FilePath,
            })
            that.setData({
                isShowphoto:true
            })
          }
        })
    },

    preview(e){
        var that=this
        wx.previewImage({
          urls: that.data.FilePath,
          current:that.data.FilePath[e.currentTarget.dataset.num]
        })
    },

    delete(e){
        var that=this
        var imagesPath=that.data.FilePath
        var index=e.currentTarget.dataset.num
        wx.showModal({
          title:'系统提醒',
          content:'确定要删除此图片嘛？',
          success:function(res){
            if(res.confirm){
                imagesPath.splice(index,1)
            }else if(res.cancel){
                return false
            }
            that.setData({
                FilePath:imagesPath,
                count:that.data.count-1
            })
          }
        })
    },

    getout(e){
       this.data.out=e.detail.value;
       console.log(this.data.out);
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

    confirmmintime:function(e){
        const a=e.detail.value
        let timeStr=a[0]+'/'+a[1]+'/'+a[2]
        let time=new Date(timeStr)
        this.setData({
            mintime:timeStr,
            mintimeDate:time,
            isShowmintimeSelect:false,
        })
    },

    confirmmaxtime:function(e){
        const b=e.detail.value
        let timeStr=b[0]+'/'+b[1]+'/'+b[2]
        let time=new Date(timeStr)
        this.setData({
            maxtime:timeStr,
            maxtimeDate:time,
            isShowmaxtimeSelect:false,
        })
    },

    closemintimeSelect:function(){
        this.setData({
            isShowmintimeSelect:false
        })
    },

    closemaxtimeSelect:function(){
        this.setData({
            isShowmaxtimeSelect:false
        })
    },

    closeAreaSelect: function () {
        this.setData({
          isShowAreaSelect: false
        })
      },
  
     // 格式化省市区数据
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
        //调用 getCityList 
        qqmapsdk.getCityList({
            success: (res) => { //成功后的回调
                console.log('省份数据：', res.result[0]); //打印省份数据
                console.log('城市数据：', res.result[1]); //打印城市数据
                console.log('区县数据：', res.result[2]); //打印区县数据
                this.setData({
                    "areaList.province_list": this.ArrayToObject(res.result[0]),
                    "areaList.city_list": this.ArrayToObject(res.result[1]),
                    "areaList.county_list": this.ArrayToObject(res.result[2]),
                })
            },
            fail: function (error) {
            console.error(error);
            },
            complete: function (res) {
            console.log(res);
            }
        });
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})