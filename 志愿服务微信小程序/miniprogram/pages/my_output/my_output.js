// pages/logs/my_output/my_output.js
// pages/logs/my_volunteer/my_volunteer.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    secret:"",
    output:[],
    button:true,
    nowtime:1,
    choosedone:false,
    color_1:"#D2B48C",
    color_2:"#F5DEB3",
    time:[],
    show:false,
    volunteerList:[
     
    ],
  },
  getDetails(e){
    if(this.data.button){
    wx.setStorageSync('details', e.currentTarget.dataset.details)
    wx.navigateTo({
      url: '../details/details?isApply='+'false' +'&isSubscribe='+'false'+'&isRelease='+'true'
    })
    }
    this.setData({
      button:true,
    })
  },
  cho_1:function(){
    this.setData({
      choosedone:false,
      color_1:"#D2B48C",
      color_2:"#F5DEB3",
    })
  },
  cho_2:function(){
    this.setData({
      choosedone:true,
      color_1:"#F5DEB3",
      color_2:"#D2B48C",
    })
  },
  make:function(e){
    var r = Math.floor(Math.random()*1000000);
    var o = String(r);
    var that=this
    let sss = "volunteerList["+e.currentTarget.dataset.index+"].secret"
    let qqq = "volunteerList["+e.currentTarget.dataset.index+"].sign_in"
    that.setData({
      [sss]:o,
      button:false
    })
    wx.cloud.callFunction({
      name:"my_volunteer_output",
      data:{
        secret:this.data.volunteerList[e.currentTarget.dataset.index].secret,
        volunteerId:e.currentTarget.dataset.ide
      },
      success:res=>{
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
        that.setData({
            [qqq]:true
        })
      },
      fail:res=>{
        wx.showToast({
          title: '发布失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  look:function(e){
    this.setData({
      show:true,
      button:false,
        secret:this.data.volunteerList[e.currentTarget.dataset.index].secret
    })
  },
  onClose:function(){
    this.setData({
      show:false,
    })
  },
  over:function(e){
    var that=this
    let a=this.data.volunteerList[e.currentTarget.dataset.index].sign_in
    this.setData({
      button:false,
    })
    wx.cloud.callFunction({
      name:"my_volunteer_over",
      data:{
        volunteerId:e.currentTarget.dataset.id
      },
      success:res=>{
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
        that.setData({
            [a]:false
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
  delete:function(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确认要删除此志愿么？',
      success: (res)=> {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:"my_volunteer_delete",
            data:{
              volunteerId:e.currentTarget.dataset.id
            },
            success:res=>{
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 2000//持续的时间
              })
              that.data.volunteerList.splice(e.currentTarget.dataset.index, 1)
              that.data.time.splice(e.currentTarget.dataset.index, 1)
            },
            fail:res=>{
              wx.showToast({
                title: '操作失败',
                icon: 'error',
                duration: 2000//持续的时间
              })
            }
          })
        }
      }
    })
    that.setData({
      button:false,
    })
  },
  onLoad(options) {
    var timestamp = Date.now();
    var date = new Date(timestamp);
    //var a = new Date("2002/1/1");
    //var B = new Date("2202/1/1")
    this.setData({
      nowtime:date,
      //"volunteerList[0].endtime":a,
      //"volunteerList[1].endtime":B
    })
    var pages = getCurrentPages();
    var pre = pages[pages.length - 2];
    this.setData({
      volunteerList:pre.data.output
    })
    for(let i =0;i<this.data.volunteerList.length;i++){
        if(this.data.nowtime > new Date(this.data.volunteerList[i].endtimeStr)){
          this.setData({
            time:this.data.time.concat(true)
          })
        }else{
          this.setData({
            time:this.data.time.concat(false)
          })
        }
    }
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
      name:"my_volunteer_putout",
      data:{
        uid:getApp().globalData.userInformation._id
      },
      success:res=>{
        that.setData({
          volunteerList:res.result
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
    this.setData({
        time:[]
      })
    for(let i =0;i<this.data.volunteerList.length;i++){
        if(this.data.nowtime > new Date(this.data.volunteerList[i].endtimeStr)){
          this.setData({
            time:this.data.time.concat(true)
          })
        }else{
          this.setData({
            time:this.data.time.concat(false)
          })
        }
    }
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