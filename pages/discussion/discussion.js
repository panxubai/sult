// pages/discussion/discussion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-讨论组', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    array:[],//聊天内容
    mainInput:"",
    scrollTop:0,
    optionsId:0,//讨论组id
    dataArr:[],
    scrollHeight:0,
    timer:"",
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
    //console.log(options.id)
    this.setData({
      optionsId: options.group_id
    });
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data,
         
        });
        that.onLoadData(options.group_id)
      }
    })
   
    this.scrollHeight();
   
  },
//控制聊天室的高度
  scrollHeight:function(){
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        var query = wx.createSelectorQuery()
        query.select('.fdEndBox').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res1) {
          var query = wx.createSelectorQuery()
          query.select('.inputBox').boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec(function (res2) {
              that.setData({
                scrollHeight: res.windowHeight - res1[0].height - res2[0].height
              })
            }) 
        }) 
      }
    });
   
  },
  //请求页面数据
  onLoadData: function (group_id){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/discuss',
      data: {
        group_id: group_id,
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       // console.log(that.data.dataArr, res.data.comment, that.data.array)
       // if (that.data.dataArr.length == 0){
          //console.log("执行了23123")
        if (that.data.dataArr.length == 0) {
          that.setData({
            dataArr: res.data,
            array: res.data.comment,
            scrollTop: 200 * res.data.comment.length
          })
        }else{
          that.setData({
            dataArr: res.data,
            array: res.data.comment
          })
        }
         
      //  }else{
          //console.log(that.data.dataArr.comment.length, res.data.comment.length)
         // console.log(that.data.dataArr.comment, res.data.comment,that.data.array)
        //   if (that.data.dataArr.comment.length != res.data.comment.length) {
        //     console.log("执行了")
        //     that.setData({
        //       dataArr: res.data,
        //       array: res.data.comment,
        //       scrollTop: 200 * res.data.comment.length
        //     })
        //   }
        // }
        
        wx.hideLoading()
        clearInterval(that.data.timer)
        that.setTimeOut();
        // that.coordinate();
      }
    })
  },
  //轮训请求
  setTimeOut:function(){
    let that = this;
    that.setData({
      timer:setTimeout(function(){
       // console.log(that.data.optionsId)
        that.onLoadData(that.data.optionsId)
      },5000)
    }) 

  },
  //发送的内容
  mainInput:function(e){
    let that =this;
    that.setData({
      mainInput: e.detail.value
    })
  },
  //回到房屋
  houseTap:function(e){
    wx.navigateTo({
      url: '../homeDetail/homeDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //发送消息
  sendTap:function(){    
    let that = this;
    //console.log(that.data.userInfo)
    if (that.data.mainInput == '' || that.data.mainInput.match(/^[ ]*$/)){
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
    }else{
      
      wx.request({
        url: 'https://www.suitius.com/tp5/public/disCom',
        data: {
          group_id: that.data.optionsId,
          user_id: that.data.userInfo.user_id,
          comment: that.data.mainInput
        },
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res);
          if (res.data.code){
            let data = {
              user_id: that.data.userInfo.user_id,
              comment: that.data.mainInput,
              head: that.data.userInfo.data.avatar,
              name: that.data.userInfo.data.name,
            };
            let scrollTop = that.data.scrollTop + 100;
            let array = that.data.array;
            array.push(data);
            that.setData({
              array: array,
              scrollTop: scrollTop,
              mainInput: ""
            });

          }else{
            wx.showToast({
              title: res.data.info,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
          }
         
    
        }
      })
      
    }
  
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
    clearInterval(this.data.timer)
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