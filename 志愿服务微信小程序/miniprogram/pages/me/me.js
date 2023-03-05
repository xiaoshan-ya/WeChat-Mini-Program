// pages/logs/me/me.js
var app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      level:0,
      percent:'96%',
      person:{
        "uid":"0",
        "level":1,
        "name":"111",
        "gen":"male",
        "longtext":"123",
        "mail":"111",
        "phone":"111",
        "pic":""
      },
  },
  jump:function(){
    wx.navigateTo({
      url: '../me_setting/me_setting'
    })
  },
  onChooseAvatar(e) {
    this.setData({
      avatarUrl: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    this.setData({
        'person.uid':app.globalData.userInformation._id
     })
    wx.cloud.callFunction({
      name:"me_update",
      data:{
        uid:this.data.person.uid
      },
      success:res=>{
        that.setData({
          person:res.result
        })
        wx.showToast({
            title: '信息拉取成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
          var a = Math.floor(that.data.person.score/10)
          that.setData({
              level:a
          })
      },
      fail:res=>{
        wx.showToast({
          title: '信息拉取失败',
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
      name:"me_update",
      data:{
        uid:this.data.person.uid
      },
      success:res=>{
        that.setData({
          person:res.result
        })
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
        var a = Math.floor((that.data.person.score)/10)
        that.setData({
            level:a
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
    out:function(e){
        wx.redirectTo({
        url:"../login/login"
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