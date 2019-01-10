// pages/journeyNews/journeyNews.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-消息', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    newsArray: [],
    titleText:"新消息",
    showKong: false,
    types:0,
    showFanhui: true
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
    //console.log(options.type);
    if (options.type == 1){
      that.setData({
        titleText: "新的行程"
      })
    } else if (options.type == 2) {
      that.setData({
        titleText: "新的讨论组"
      })
    } else if (options.type == 3) {
      that.setData({
        titleText: "新的到访"
      })
    }

    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data,
          types: options.type
        })
        that.dataArr()
      }
    })
  },
  dataArr:function(){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/msgList',
      data: {
        user_id: that.data.userInfo.user_id,
        type: that.data.types
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       // console.log(res)
       
        that.setData({
          newsArray: res.data,
          showKong: true
        })
        wx.hideLoading()
      }
    })
  },
  //点击进详情
  tapNews:function(e){
    console.log(e.currentTarget.dataset.id)
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/isRead',
      data: {
        id: e.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.alertnew(e)
      }
    })
  },
  alertnew:function(e){
    let that = this;
    if (that.data.types == 1){
      //行程
        if (e.currentTarget.dataset.status == 0) {
          wx.showModal({
            title: '提示',
            content: '该行程等待房东处理',
          })

        } else if (e.currentTarget.dataset.status == 1) {
          that.dataJujue(e.currentTarget.dataset.house_id, e.currentTarget.dataset.visit_id, e.currentTarget.dataset.status);
        } else {
          that.setData({
            showFanhui: false
          })
          wx.navigateTo({
            url: '../routeChat/routeChat?id=' + e.currentTarget.dataset.house_id + '-' + e.currentTarget.dataset.visit_id + '-' + e.currentTarget.dataset.status,
          })
        }
    } else if (that.data.types == 2){
      that.setData({
        showFanhui: false
      })
      //讨论组
      wx.navigateTo({
        url: '../discussion/discussion?group_id=' + e.currentTarget.dataset.group_id,
      })
    }else{
      //到访
      if (e.currentTarget.dataset.status == 1) {
        that.dataJujue(e.currentTarget.dataset.house_id, e.currentTarget.dataset.visit_id, e.currentTarget.dataset.status);
      } else {
        that.setData({
          showFanhui: false
        })
        wx.navigateTo({
          url: '../visitChat/visitChat?id=' + e.currentTarget.dataset.house_id + '-' + e.currentTarget.dataset.visit_id + '-' + e.currentTarget.dataset.status,
        })
      }
    }
  },
  dataJujue: function (id, visit_id, status) {
    let that = this;
    console.log(id, visit_id, status)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visitInfo',
      data: {
        house_id: id,
        visit_id: visit_id,
        status: status,
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '拒绝原因',
          content: res.data.reason,
        })
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
  onShow: function (options) {
   // console.log(options)
    let that = this;
    if (that.data.showFanhui) {
      return;
    } else {
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
          userInfo: res.data,
          showFanhui:true
        })
        that.dataArr()
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