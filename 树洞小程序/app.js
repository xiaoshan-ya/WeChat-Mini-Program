// app.js
App({
  globalData: {
    userInfo: {},
    user: {},
  },
  onLaunch: function() {
    // 登录
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经提交，可以直接获取头像，不会弹窗
          wx.getUserInfo({
            success: res => {
              //可以将res发出给后台解析出unionID
              this.globalData.userInfo = res.userInfo;

              // 由于getUserInfo是网络请求，可能在Page.Load之后才返回
              //所以此处加入callback以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
  }
});
