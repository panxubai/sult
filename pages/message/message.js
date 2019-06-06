// pages/message/message.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-消息中心', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},
    indexPd: 0,
    newXx:[],
    showFanhui: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
       // console.log(res)
        that.setData({
          userInfo: res.data
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
    //    console.log(res)
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
        that.setData({
          indexPd: res.data.identity,
        });
        that.dataArrNew()
        }
      }
    })
  },
  dataArrNew() {
    let that = this;
    // console.log(that.data.userInfo)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/message',
      data: {
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         //   console.log(res)
        that.setData({
          newXx: res.data,
        });

      }
    })
  },
   //点击系统消息
  systemTap:function(e){
    this.setData({
      showFanhui: false
    })
    wx.navigateTo({
      url: '../sultnews/sultnews?type=' + e.currentTarget.dataset.type,
    })

  },
  //点击我的行程
  journeyTap:function(e) {
    this.setData({
      showFanhui: false
    })
    //console.log(e.currentTarget.dataset.type)
    wx.navigateTo({
      url: '../journeyNews/journeyNews?type=' + e.currentTarget.dataset.type,
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
          // console.log(res)
          that.setData({
            userInfo: res.data,
            showFanhui: true
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})