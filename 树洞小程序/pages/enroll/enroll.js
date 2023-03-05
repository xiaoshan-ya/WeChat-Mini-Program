Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNameInput: '',
        phoneNumberInput: '',
        passwordInput: '',
        passwordInputAck: '',
    },

    login: function (e) {
        wx.navigateBack({
            // 上一页为login
            delta: 1 // delta为多少，就返回到上多少页
        })
    },

    register: function () {
        var that = this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

        if (this.data.userNameInput == '') {
            wx.showModal({
                title: '提示',
                content: '请输入用户名',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        else if (this.data.phoneNumberInput == '') {
            wx.showModal({
                title: '提示',
                content: '请输入手机号',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        else if (this.data.passwordInput == '') {
            wx.showModal({
                title: '提示',
                content: '请输入密码',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        else if (this.data.passwordInputAck == '') {
            wx.showModal({
                title: '提示',
                content: '请确认密码',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

        // 检查合法性
        if (that.data.phoneNumberInput.length != 11) {
            wx.showModal({
                title: '提示！',
                content: '手机号长度有误，请重新输入！',
                showCancel: false,
                success(res) { }
            })
        } else if (!myreg.test(that.data.phoneNumberInput)) {
            wx.showModal({
                title: '提示！',
                content: '请输入正确的手机号码',
                showCancel: false,
                success(res) { }
            })
        }

        else if (that.data.passwordInput != that.data.passwordInputAck) {
            wx.showModal({
                title: '提示！',
                content: '两次输入密码不一样',
                showCancel: false,
                success(res) { }
            })
        }
    },

    checkPhoneNumber: function(e) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (this.data.phoneNumberInput.length != 11) {
            wx.showModal({
                title: '提示！',
                content: '手机号长度有误，请重新输入！',
                showCancel: false,
                success(res) { }
            })
        } else if (!myreg.test(that.data.phoneNumberInput)) {
            wx.showModal({
                title: '提示！',
                content: '请输入正确的手机号码',
                showCancel: false,
                success(res) { }
            })
        }
    },

    userNameInput: function (e) {
        this.data.userNameInput = e.detail.value;
    },
    phoneNumberInput: function (e) {
        this.data.phoneNumberInput = e.detail.value;
    },
    passwordInput: function (e) {
        this.data.passwordInput = e.detail.value;
    },
    passwordInputAck: function (e) {
        this.data.passwordInputAck = e.detail.value;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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