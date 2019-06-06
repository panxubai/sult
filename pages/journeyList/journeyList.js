// pages/journeyList/journeyList.js
const app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */
  data: { 
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-我的行程', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    dataArr:[],
    showKong: false,
    showFanhui: true,
    lock:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
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

  dataArr:function(){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visitTrip',
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
  //长按删除
  longTap: function (e) {
    var that = this;
    this.setData({
      lock: false
    });
    wx.showModal({
      title: '提示',
      content: '您确定要删除这条到访',
      confirmColor: '#FF0000',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.suitius.com/tp5/public/deleteVisit',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              identity: 0,
              id: e.currentTarget.dataset.visit_id
            },
            success: function (res) {
              console.log(res)
              if (res.data.code) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                that.dataArr();
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
              }
              that.setData({
                lock: true
              });
              // that.coordinate();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            lock: true
          });
        }
      }
    })
  },
  //点击跳到行程 详情
  routeTap:function(e){
    let that = this;
    if (that.data.lock){
      console.log(e.currentTarget.dataset.status)
      if (e.currentTarget.dataset.status == 0) {
        wx.showModal({
          title: '提示',
          content: '该行程等待房东处理',
        })

      } else if (e.currentTarget.dataset.status == 1) {
        that.dataJujue(e.currentTarget.dataset.id, e.currentTarget.dataset.visit_id, e.currentTarget.dataset.status);
      } else {
        that.setData({
          showFanhui: false
        })
        wx.navigateTo({
          url: '../routeChat/routeChat?id=' + e.currentTarget.dataset.id + '-' + e.currentTarget.dataset.visit_id + '-' + e.currentTarget.dataset.status,
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
  onShow: function () {
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