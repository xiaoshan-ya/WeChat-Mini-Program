// pages/first/first.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        source: "../../images/201250190_顺序图.jpg" ,
        str:''
    },

    getit(e){
        this.setData({
            count:this.data.count+1,
        })
        console.log(this.data.count);
        console.log(e);
    },

    inout: function(e) {
        this.data.str = e.detail.value;
        if (this.data.str.length != 2) {
            console.log("error");
        }
        else {
            console.log("success");
        }
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