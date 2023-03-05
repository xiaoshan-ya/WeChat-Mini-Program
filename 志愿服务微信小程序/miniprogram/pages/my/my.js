// pages/logs/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      uid:"0",
      output:[{vonlunteerId:'2',
      Photosrcs:["https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"],
      tittle:"例子henhhhhasdddddddddddddddddddddddddddddddddddd",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },
      {vonlunteerId:'2',
      Photosrcs:[""],
      tittle:"例子",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },],
      go:[{vonlunteerId:'2',
      Photosrcs:[""],
      tittle:"例子",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },
      {vonlunteerId:'2',
      Photosrcs:[""],
      tittle:"例子",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },],
      star:[{vonlunteerId:'2',
      Photosrcs:[""],
      tittle:"例子",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },
      {vonlunteerId:'2',
      Photosrcs:[""],
      tittle:"例子",
      position:"省/市/区",
      num:10,
      over:false , 
      maxnum:20, 
      out:2,
      description:"描述",
      now:5,
      starttime:new Date("2002/1/1"),
      endtime: new Date("2002/1/1"),
      starttimestr:"2002/1/1",
      endtimestr:"2002/1/1"
      },],
  },

  gotovolunteer:function(){
    wx.navigateTo({
      url: '../my_volunteer/my_volunteer'
    })
  },
  gotostar:function(){
    wx.navigateTo({
      url: '../my_star/my_star'
    })
  },
  gotooutput:function(){
    wx.navigateTo({
      url: '../my_output/my_output'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    this.setData({
        uid:getApp().globalData.userInformation._id
    })
    wx.cloud.callFunction({
      name:"my_volunteer_putout",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          output:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_go",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          go:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_star",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          star:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
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
    var that=this
    this.setData({
        uid:getApp().globalData.userInformation._id
    })
    wx.cloud.callFunction({
      name:"my_volunteer_putout",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          output:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_go",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          go:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_star",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          star:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
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
    this.setData({
        uid:getApp().globalData.userInformation._id
    })
    wx.cloud.callFunction({
      name:"my_volunteer_putout",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          output:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_go",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          go:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
      }
    })
    wx.cloud.callFunction({
      name:"my_volunteer_star",
      data:{
        uid:this.data.uid
      },
      success:res=>{
        that.setData({
          star:res.result
        })
        wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
      },
      fail:err=>{
        wx.showToast({
            title: '信息同步失败',
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