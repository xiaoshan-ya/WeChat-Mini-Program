// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    passWord:'',
    returnResult: "123114", // 返回的用户信息存在这里, TODO: 把这个存到app.js里用来初始化”我的”。
    returnMessage: "",
    returnErrorCode: 0,
    loginSkipTo:"../collect/collect" //TODO:登录成功后跳转
  },
  phoneInput: function(e){
    this.setData({ phoneNum: e.detail.value });
  },
  passwordInput: function(e){
    this.setData({ passWord: e.detail.value });
  },

  login: function(){
      let that = this;
      wx.cloud.callFunction({
        name:'passwordLogin',
        data:{
          phoneNumber:this.data.phoneNum,
          password:this.data.passWord
        },
        success(res){
          that.setData({
            returnResult:res.result.userInformation,
            returnMassage:res.result.massage,
            returnErrorCode:res.result.errorCode
          })
          wx.showModal({
            title:'系统提醒',
            content:that.data.returnMassage,
            showCancel:false,
            success(_res){
                if(_res.confirm){
                    return false
                }
            }
          })
          if (that.data.returnErrorCode==0) {
            app.globalData.userInformation=that.data.returnResult
            wx.switchTab({
              url: that.data.loginSkipTo,
            })
          }else{
            wx.showModal({
              title:'密码或手机号错误',
              showCancel:false,
              success(_res){
                  if(_res.confirm){
                      return false
                  }
              }
            })
          }
        },
        fail(res){
            wx.showModal({
              title:'系统提醒',
              content:'登录失败',
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

  skipToRegister: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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