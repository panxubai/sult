// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-登陆', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
  },
  //授权
  bindGetUserInfo: function (e) {
  
   if (e.detail.errMsg == "getUserInfo:ok"){
     wx.login({
       success: function (res) {
        // console.log(res)
         if (res.code) {
           //发起网络请求 从后台获取openid
           wx.request({
             url: 'https://www.suitius.com/tp5/public',
             data: {
               encryptedData: e.detail.encryptedData,
               iv: e.detail.iv,
               code: res.code
             },
             header: {
               'content-type': 'application/json' // 默认值
             },
             success: function (res) {
               // console.log(res)
               wx.setStorage({
                 key: "sultOpenId",
                 data: res.data
               });
               wx.reLaunch({//跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
                 url: '../index/index'
               })
             }
           })
         } else {
           console.log('获取用户登录态失败！' + res.errMsg)
         }
       }
     });
   }else{
     wx.showModal({
       title: '提示',
       content: '登陆才能享受更多服务哦~',
       success: function (res) {
         if (res.confirm) {
         } else if (res.cancel) {
         }
       }
     })
     console.log(e.detail)

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