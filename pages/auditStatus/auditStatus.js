// pages/auditStatus/auditStatus.js
const app = getApp();
Page({ 

  /**
   * 页面的初始数据 
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-房屋审核', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo:{},
    auditArr:[],
    showKong: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        })
        that.onLoadSh();
      }
    })

    
  
  },
<<<<<<< HEAD
  //点击审核房源
  lodingTap:function(){
    wx.showToast({
      title: '该房源正在审核中',
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
  //点击拒绝房源
  baibaiTap:function(e){
    wx.showToast({
      title: '拒绝原因:' + e.currentTarget.dataset.toast,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
  onLoadSh:function(){
    let that = this;
   
    wx.request({ 
      url: "https://www.suitius.com/tp5/public/myApply",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: that.data.userInfo.user_id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          auditArr: res.data,
          showKong: true
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