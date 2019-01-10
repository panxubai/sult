// pages/myHome/myHome.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-我的房屋', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},
    arrList:[], 
    showKong: false
   // nameTx:"",
  
  },
  //房东进去修改信息
  homeXGtap:function(e){
    //console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../amendHome/amendHome?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this; 
    //获取用户信息
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        })
        that.onloadJk();
      }
    })
  
  },
  onloadJk:function(){
    let that = this; 
    //console.log(that.data.userInfo)
    wx.request({
      url: "https://www.suitius.com/tp5/public/houseList",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: that.data.userInfo.user_id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          arrList: res.data,
          showKong: true
         // nameTx: res.data.user
        });
        wx.hideLoading()
      }
    })
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