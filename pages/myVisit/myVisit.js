// pages/myVisit/myVisit.js
const app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-我的到访', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    dataArr: [],
    showKong: false,
    showFanhui:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log('onLoad')
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
        });
        that.dataArr();
      }
    })
  },
  dataArr: function () {
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visitList',
      data: {
        id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      console.log(res)
        that.setData({
          dataArr: res.data,
          showKong: true
        })
        wx.hideLoading()
      }
    })
  },
  routeTap:function(e){
    let that = this;
    if (e.currentTarget.dataset.status == 3){
      return;
    } else if (e.currentTarget.dataset.status == 1) {
      that.dataJujue(e.currentTarget.dataset.id, e.currentTarget.dataset.visit_id, e.currentTarget.dataset.status);
    } else {
      that.setData({
        showFanhui:false
      })
      wx.navigateTo({
        url: '../visitChat/visitChat?id=' + e.currentTarget.dataset.id + '-' + e.currentTarget.dataset.visit_id + '-' + e.currentTarget.dataset.status,
      })
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
  //  console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    if (that.data.showFanhui){
return;
    }else{
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
          });
          that.dataArr();
        }
      })
    }
   
    //console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   // console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // console.log("onUnload")
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