// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '',
        phoneNum: '',
        passWord: '',
        passwordCheck: '',
        registerSkipTo: "../login/login" //TODO:注册成功后跳转
    },
    nicknameInput: function (e) {
        this.setData({ nickName: e.detail.value });
    },
    phoneInput: function (e) {
        this.setData({ phoneNum: e.detail.value });
    },
    passwordInput: function (e) {
        this.setData({ passWord: e.detail.value });
    },
    passwordCheck: function (e) {
        this.setData({ passwordCheck: e.detail.value });
    },
    register: function () {
        let that = this;
        if (this.data.passWord == this.data.passwordCheck) {
            wx.cloud.callFunction({
                name: 'register',
                data: {
                    name: this.data.nickName,
                    phoneNumber: this.data.phoneNum,
                    password: this.data.passWord
                },
                success(res) {
                    if (!res.result) {
                        wx.showModal({
                            title: '系统提醒',
                            content: '手机号已存在',
                            showCancel: false,
                            success(_res) {
                                if (_res.confirm) {
                                    return false
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '系统提醒',
                            content: '注册成功',
                            showCancel: false,
                            success(_res) {
                                if (_res.confirm) {
                                    return false
                                }
                            }
                        })
                        wx.navigateTo({
                            url: that.data.registerSkipTo
                        })
                    }
                },
                fail(res) {
                    wx.showModal({
                        title: '系统提醒',
                        content: '注册失败',
                        showCancel: false,
                        success(_res) {
                            if (_res.confirm) {
                                return false
                            }
                        }
                    })
                }

            })
        } else {
            wx.showModal({
                title: '两次输入密码不一致',
                showCancel: false
            })
        }

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