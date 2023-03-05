// app.js
App({
    onLaunch:function(){
        wx.cloud.init({
            env:'cloud1-0g0z9xyc11b450fb'
        })
    },
    globalData:{
        userInformation:{},
    }
})

