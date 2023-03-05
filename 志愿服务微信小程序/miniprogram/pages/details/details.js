// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail:{},
        isSubscribe:false,
        isApply:false,
        isRelease:false,
    },

    watchPhoto(e){
        wx.previewImage({
          urls: this.data.detail.Photosrcs,
          current:e.currentTarget.dataset.current
        })
    },

    getSubscribe(){
        var that=this
        if(!this.data.isSubscribe){
            wx.showModal({
                title:'系统提醒',
                content:'确定要订阅此志愿嘛？',
                success(res){
                    if(res.confirm){
                        wx.cloud.callFunction({
                            name:'subscribeActivity',
                            data:{
                                //存在app.js中的用户id
                                UserID:getApp().globalData.userInformation._id,
                                ActivityID:that.data.detail.vonlunteerId,
                            },
                            success(e){
                                that.setData({
                                    isSubscribe:true
                                })
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'订阅成功！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            },
                            fail(e){
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'订阅失败！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            }
                        })
                        //将数据传入后端（未完成）
                    }else if(res.cancel){
                        return false
                    }
                }
            })
        }else{
            wx.showModal({
                title:'系统提醒',
                content:'确定要取消订阅此志愿嘛？',
                success(res){
                    if(res.confirm){
                        wx.cloud.callFunction({
                            name:'cancalSubscribe',
                            data:{
                                //存在app.js中的用户id
                                UserID:getApp().globalData.userInformation._id,
                                ActivityID:that.data.detail.vonlunteerId,
                            },
                            success(e){
                                that.setData({
                                    isSubscribe:false
                                })
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'取消成功！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            },
                            fail(e){
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'取消失败！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            }
                        })
                        //将数据传入后端（未完成）
                    }else if(res.cancel){
                        return false
                    }
                }
            })
        }
    },

    getApply(){
        var that=this
        if(!this.data.isApply){
            wx.showModal({
                title:'系统提醒',
                content:'确定要报名此志愿嘛？',
                success(res){
                    if(res.confirm){
                        //将数据传入后端（未完成）
                        wx.cloud.callFunction({
                            name:'signUp',
                            data:{
                                //存在app.js中的用户id
                                UserID:getApp().globalData.userInformation._id,
                                ActivityID:that.data.detail.vonlunteerId,
                            },
                            success(e){
                                that.setData({
                                    isApply:true
                                })
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'报名成功！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            },
                            fail(e){
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'报名失败！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            }
                        })
                    }else if(res.cancel){
                        return false
                    }
                }
            })
        }else{
            wx.showModal({
                title:'系统提醒',
                content:'确定要取消报名此志愿嘛？',
                success(res){
                    if(res.confirm){
                        wx.cloud.callFunction({
                            name:'signOut',
                            data:{
                                //存在app.js中的用户id
                                UserID:getApp().globalData.userInformation._id,
                                ActivityID:that.data.detail.vonlunteerId,
                            },
                            success(e){
                                that.setData({
                                    isApply:false
                                })
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'退出成功！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            },
                            fail(e){
                                wx.showModal({
                                    title:'系统提醒',
                                    content:'退出失败！',
                                    showCancel:false,
                                    success(_res){
                                        if(_res.confirm){
                                            return false
                                        }
                                    }
                                })
                            }
                        })
                        //将数据传入后端（未完成）
                    }else if(res.cancel){
                        return false
                    }
                }
            })
        }
    },

    getApplyDetails(){
        //跳转入相应页面（传入volunteerId）
        wx.navigateTo({
          url: '../thingdetails/thingdetails?volunteerId='+this.data.detail.volunteerId,
        })
    },

    getMessage(){
        wx.navigateTo({
          url: '../消息页面/消息页面?',//后续参数再增加
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var details=wx.getStorageSync('details')
        this.setData({
            detail:details,
        })
        if(options.isApply=="true"){this.setData({isApply:true})}
        if(options.isSubscribe=="true"){this.setData({isSubscribe:true})}
        if(options.isRelease=="true"){
            this.setData({isRelease:true})
        }
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