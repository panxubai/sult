// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-个人中心', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},
    indexPd:0,
    arrNumber:[],
    showFanhui: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 let that =this;
    wx.getStorage({ 
      key: 'sultOpenId',
      success: function (res) {
     //   console.log(res)
        that.setData({
          userInfo:res.data
        });
        that.dataArr();
      }
    })
  },
  dataArr() {
    let that = this;
   // console.log(that.data.userInfo)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/identity',
      data: {
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      // console.log(res)
<<<<<<< HEAD
        if (res.data.isForbidden == false) {
          wx.showToast({
            title: '你的账号状态异常,请联系客服',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 1500)
        } else {
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        that.setData({
          indexPd: res.data.identity,
          arrNumber: res.data
        });
<<<<<<< HEAD
        }
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
      }
    })
  },
  //跳转个人资料
  personalTap:function(){
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  //跳转我的消息
  newsTap: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //跳转我的房屋
  myHomeTap: function () {
    wx.navigateTo({
      url: '../myHome/myHome',
    })
  },
  //跳转我的卡包
  cardBagTap: function () {
    wx.navigateTo({
      url: '../cardBag/cardBag',
    })
  },
  //跳转我的收藏
  shoucangTap: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  //跳转我的行程
  xingchengTap: function () {
    this.setData({
      showFanhui: false
    })
    wx.navigateTo({
      url: '../journeyList/journeyList',
    })
  },
  //跳转我的讨论组
  taolunzuTap: function () {
    this.setData({
      showFanhui: false
    })
    wx.navigateTo({
      url: '../discussionList/discussionList',
    })
  },
  //跳转我的daofang
  daofangTap: function () {
    this.setData({
      showFanhui: false
    })
    wx.navigateTo({
      url: '../myVisit/myVisit',
    })
  }, 
  //跳转系统设置
  sultSettingTap: function () {
    wx.navigateTo({
      url: '../sultSetting/sultSetting',
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
    let that = this;
    if (that.data.showFanhui) {
      return;
    } else {
     
      wx.getStorage({
        key: 'sultOpenId',
        success: function (res) {
          //   console.log(res)
          that.setData({
            userInfo: res.data
          });
          that.dataArr();
        }
      })
    }
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
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})