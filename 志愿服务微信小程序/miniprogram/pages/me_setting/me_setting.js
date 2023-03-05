// pages/logs/me_setting.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    textlongmax:100,
    textlongnow:3,
    S:"1111",
    listmenus:["电子邮箱","电话号码"],
    fimg:"/image/123.jpg",
    person:
    {"uid":"0","name":"...","gen":"male","longtext":"...","mail":"...","phone":"...","pic":"","level":""}
  },
  afterRead(event) {
    var that=this
     // loading加载
     this.setData({
       "person.pic":""
     })
     wx.cloud.init();
     wx.showLoading({
      title: '上传中...'
    });
    const {file} = event.detail;//获取图片详细信息
    that.setData({
      "person.pic":file.url
    })
      wx.cloud.uploadFile({
      cloudPath: "ima/123.png",
      filePath: file.url,
      // 成功回调
      success:res=> {
         wx.hideLoading();//停止loading
         wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
         /*wx.cloud.downloadFile({
          fileID: that.data.person.pic,
          success:res=>{
            that.setData({
              "person.pic":res.tempFilePath
            })
            
          },
          fail:err=>{
            wx.showToast({
              title: '下载失败',
              icon: 'error',
              duration: 2000//持续的时间
            })
          }
        })*/
      },
      fail:res=>{
        wx.hideLoading();//停止loading
        wx.showToast({
          title: '上传失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
  });
  },
  mailchange:function(e){
    this.setData({
      "person.mail":e.detail.value,
    })
  },
  phonechange:function(e){
    this.setData({
      "person.phone":e.detail.value,
    })
  },
  longchange:function(e){
    this.setData({
      'person.longtext':e.detail.value,
    })
    let a=e.detail.value;
    let b=parseInt(a.length);
    this.setData({
      textlongnow:b,
    })
  },
  bandleChange:function(e){
    this.setData({
      'person.gen':e.detail
    })
  },
  nameinput:function(e){
    this.setData({
      'person.name':e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
         "person.uid":app.globalData.userInformation._id
      })
      var pages = getCurrentPages();
      var pre = pages[pages.length - 2];
      let a = pre.data.person.longtext;
      let b = a.length;
      this.setData({
        textlongnow:b,
        "person.name":pre.data.person.name,
        "person.gen":pre.data.person.gen,
        "person.longtext":pre.data.person.longtext,
        "person.mail":pre.data.person.mail,
        "person.phone":pre.data.person.phone,
        "person.pic":pre.data.person.pic,
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
      var pages = getCurrentPages();
      var pre = pages[pages.length - 2];
      pre.setData({
        "person.name":this.data.person.name,
        "person.gen":this.data.person.gen,
        "person.longtext":this.data.person.longtext,
        "person.mail":this.data.person.mail,
        "person.phone":this.data.person.phone,
        "person.pic":this.data.person.pic,
      })
      wx.cloud.callFunction({
        name:"me_correct",
        data:{
          person:this.data.person
        },
        success:res=>{
          wx.showToast({
            title: '信息同步成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
        },
        fail:res=>{
          wx.showToast({
            title: '信息同步失败',
            icon: 'error',
            duration: 2000//持续的时间
          })
        }
      })
  },
  oover:function(){
    wx.cloud.callFunction({
      name:"me_quit",
      data:{
        uid:this.data.person.uid
      },
      success:res=>{
        wx.showToast({
          title: '注销账号成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
      },
      fail:res=>{
        wx.showToast({
          title: '注销账号失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    var a = person.pic;
    this.setData({
      "person.pic":a
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})