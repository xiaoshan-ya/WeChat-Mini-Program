// pages/logs/my_volunteer/my_volunteer.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      uid:"0",
    secret:"",
    idid:"",
    button:true,
    nowtime:1,
    choosedone:false,
    color_1:"#D2B48C",
    color_2:"#F5DEB3",
    time:[],
    show:false,
    volunteerList:[
    
    ],
  },
  cho_1:function(){
    this.setData({
      choosedone:false,
      color_1:"#D2B48C",
      color_2:"#F5DEB3",
    })
  },
  cho_2:function(){
    this.setData({
      choosedone:true,
      color_1:"#F5DEB3",
      color_2:"#D2B48C",
    })
  },
  sec:function(e){
      this.setData({
        secret:e.detail.value
      })
  },
  qian:function(e){
    this.setData({
      show:true,
      button:false,
      idid:e.currentTarget.dataset.idi
    })
  },
  onClose:function(){
    this.setData({
      show:false,
      button:true
    })
  },
  push:function(){
    var that=this
    wx.cloud.callFunction({
      name:"my_volunteer_date",
      data:{
        uid:this.data.uid,
        vonlunteerId:this.data.idid,
        secret:this.data.secret,
      },
      success:res=>{
        that.setData({
          volunteerList:res.data
        })
        if(res.result == 1){
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
        }else if(res.result == 2){
          wx.showToast({
            title: '密码错误',
            icon: 'error',
            duration: 2000//持续的时间
          })
        }else if(res.result == 3){
          wx.showToast({
            title: '签到还未发布',
            icon: 'error',
            duration: 2000//持续的时间
          })
        }
      },
      fail:res=>{
        wx.showToast({
          title: '操作失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
    })
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var timestamp = Date.now();
    var date = new Date(timestamp);
    //var a = new Date("2002/1/1");
   // var B = new Date("2202/1/1")
   var pages = getCurrentPages();
   var pre = pages[pages.length - 2];
   this.setData({
     volunteerList:pre.data.go
   })
    this.setData({
      nowtime:date,
      //"volunteerList[0].endtime":a,
      //"volunteerList[1].endtime":B
    })
    for(let i =0;i<this.data.volunteerList.length;i++){
        if(this.data.nowtime > this.data.volunteerList[i].endtime){
          this.setData({
            time:this.data.time.concat(true)
          })
        }else{
          this.setData({
            time:this.data.time.concat(false)
          })
        }
    }
  },
  getDetails(e){
    if(this.data.button){
      wx.setStorageSync('details', e.currentTarget.dataset.details)
      wx.navigateTo({
                url: '../details/details?isApply='+true +'&isSubscribe='+false+'&isRelease'+false
      })
  }else{
      this.setData({
          button:true
      })
  }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    var that=this
    wx.cloud.callFunction({
      name:"my_volunteer_go",
      data:{
        uid:getApp().globalData.userInformation._id
      },
      success:res=>{
        that.setData({
          volunteerList:res.result
        })
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
      },
      fail:res=>{
        wx.showToast({
          title: '更新失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
  })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})