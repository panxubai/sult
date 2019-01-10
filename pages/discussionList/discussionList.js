// pages/discussionList/discussionList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-我的讨论组', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    listLeft:[],
    clientXStart:0, 
    clientXMove: 0,
    hoverKey: [],//true是没显示删除，false显示删除
    dataArr:[],
    showKong:false,
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
      mask:true,
    })
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        });
        that.onLoadData();
      }
    })
   
  },
  onLoadData:function(){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/discList',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: that.data.userInfo.user_id
      },
      success: function (res) {
       // console.log(res)
        let arr = [];
        let hoverKey = [];
        for (let i = 0; i < res.data.length;i++){
          arr.push(0)
          hoverKey.push(true)
        }
        that.setData({
          dataArr: res.data,
          listLeft:arr,
          hoverKey: hoverKey,
          showKong:true
        })
        wx.hideLoading()
        // that.coordinate();
      }
    })
  },
  //点击跳转详情页
  // chatBoxesTap:function(){
  //   wx.navigateTo({
  //     url: '../discussion/discussion',
     
  //   })
  // },
  //按下
  drawStart:function(e){
    //console.log(e.touches[0].clientX, 1)
    let that = this;
    that.setData({
      clientXStart: e.touches[0].clientX
    })
  },
    //移动
  drawMove: function (e) {
    let that = this;
    let listLeft = that.data.listLeft;
    let hoverKey = that.data.hoverKey;
   // console.log(e.touches[0].clientX - that.data.clientXStart, 2)
    if (that.data.hoverKey[e.currentTarget.dataset.index]){
      if (-100 <= e.touches[0].clientX - that.data.clientXStart && e.touches[0].clientX - that.data.clientXStart <= 0) {
        listLeft[e.currentTarget.dataset.index] = e.touches[0].clientX - that.data.clientXStart
        that.setData({
          clientXMove: e.touches[0].clientX,
          listLeft: listLeft
        })
      } else {
        //console.log("不满足",111111)
      }
    }else{
      if (0 <= e.touches[0].clientX - that.data.clientXStart && e.touches[0].clientX - that.data.clientXStart <= 100) {
        listLeft[e.currentTarget.dataset.index] = e.touches[0].clientX - that.data.clientXStart - 100
        that.setData({
          clientXMove: e.touches[0].clientX,
          listLeft: listLeft
        })
      } else {
       // console.log("不满足")
      }
    }
 
   
    
   },
    //抬起
  drawEnd: function (e) { 
  //  console.log(e.currentTarget.dataset.group_id)
    let that = this;
    //console.log(that.data.clientXStart, that.data.clientXMove);
    let listLeft = that.data.listLeft;
    let hoverKey = that.data.hoverKey;
    if (that.data.hoverKey[e.currentTarget.dataset.index]){
      if (that.data.clientXMove == 0) {
        that.setData({
          showFanhui: false
        })
        wx.navigateTo({
          url: '../discussion/discussion?group_id=' + e.currentTarget.dataset.group_id,
        })
        return;
      }
      if (Math.abs(that.data.clientXStart - that.data.clientXMove) > 100 / 2) {
        listLeft[e.currentTarget.dataset.index] = -100;
        hoverKey[e.currentTarget.dataset.index] = false;
        that.setData({
          listLeft: listLeft,
          hoverKey: hoverKey,
          clientXMove: 100
        })
      } else {
        listLeft[e.currentTarget.dataset.index] = 0;
        hoverKey[e.currentTarget.dataset.index] = true;
        that.setData({
          listLeft: listLeft,
          hoverKey: hoverKey,
          clientXMove:0
        })
      }
    }else{
      if (that.data.clientXMove == 100) {
        listLeft[e.currentTarget.dataset.index] = 0;
        hoverKey[e.currentTarget.dataset.index] = true;
        that.setData({
          listLeft: listLeft,
          hoverKey: hoverKey,
          clientXMove: 0
        })
        return;
      }
      if (Math.abs(that.data.clientXStart - that.data.clientXMove) < 100 / 2) {
        listLeft[e.currentTarget.dataset.index] = -100;
        hoverKey[e.currentTarget.dataset.index] = false;
        that.setData({
          listLeft: listLeft,
          hoverKey: hoverKey,
          clientXMove: 100
        })
      } else {
        listLeft[e.currentTarget.dataset.index] = 0;
        hoverKey[e.currentTarget.dataset.index] = true;
        that.setData({
          listLeft: listLeft,
          hoverKey: hoverKey,
          clientXMove: 0
        })
      }
    }
   

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  delTap:function(e){
    let that= this;
    console.log(e.currentTarget.dataset.group_id);
    wx.showModal({
      title: '提示',
      content: '您确定要退出讨论组',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.suitius.com/tp5/public/quitdis',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              user_id: that.data.userInfo.user_id,
              group_id: e.currentTarget.dataset.group_id
            },
            success: function (res) {
              console.log(res)
              if (res.data.code){
                wx.showToast({
                  title: res.data.info,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                that.onLoadData();
              }else{
                wx.showToast({
                  title: res.data.info,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
              }
              // that.coordinate();
            }
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })
   
   
  },
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
            userInfo: res.data
          });
          that.onLoadData();
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