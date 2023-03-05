Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        s : 'hello',
      },

      next: function(e) {
        console.log("userInfo" , getApp().globalData.userInfo);
        wx.redirectTo({
          url: '/pages/login/login'
        })
      },

      onLoad: function() {
        // 查看是否授权
        var that = this;
        wx.showLoading({
          title: '加载中',
        })

        // 老版授权方式，现在应使用新版
        wx.login({
          success(res) {
            if (res.code) {
              wx.getSetting({
                success (res){
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: function(res) {
                        getApp().globalData.userInfo = res.userInfo; // 将所得的用户信息变为全局数据
                        console.log(res.userInfo)
                        // that.next();
                      }
                    })
                  }
                }
              })
            }
            else {
              console.log("登录失败" + res.errMsg)
            }
          }
        })

        setTimeout(function(){
          wx.hideLoading()
        }, 2000)
      },
      bindGetUserInfo (e) {
        getApp().globalData.userInfo = e.detail.userInfo; // 将所得的用户信息变为全局数据
        if (e.detail.userInfo != undefined) {
          // this.next();
        }
      },
      
      check: function(e) {
        // val a = e.;
        console.log(this.data.s);
        this.setData({
          s: e.detail.value
        })
        console.log(this.data.s);
        
      }
})