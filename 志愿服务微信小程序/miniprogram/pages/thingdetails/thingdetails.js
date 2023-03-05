// pages/logs/thingdetails/thingdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
      person:[
        {  uid:"99874",
           phonenumber:"13546544567",
           name:"玩了好的完美",
           ok:true
        },
        {  uid:"123123",
        phonenumber:"123123",
        name:"123123",
        ok:false},
     {  uid:"123123",
     phonenumber:"123123",
     name:"2323321",
     ok:false}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    this.setData({
      id:options.vonlunteerId
    })
    wx.cloud.callFunction({
      name:"my_volunteer_list",
      data:{
        volunteerId:this.data.id
      },
      success:res=>{
        that.setData({
          person:res.result
        })
      },
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
      name:"my_volunteer_list",
      data:{
        volunteerId:this.data.id
      },
      success:res=>{
        that.setData({
          person:res.result
        })
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
      },
      fail:res=>{
        wx.showToast({
          title: '操作失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
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