// pages/searchs/searchs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapYesNo:true,//一次存 一次不存
    scrollY:0,//就是存上次点击的位置
    top:1,//评论上边界到屏幕的距离
    windowHeight:0,//屏幕的高度
    sumHeight:0,//总高度
    pinlunHeight:0,//评论的高度
    articleId:0,//文章id
    contentMain:[],//文章内容存放

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    });
    var that =this;
    //吧id给data
    that.setData({
      articleId: options.id
    });
    //调用详情页内容
    this.articleMain();
    var query = wx.createSelectorQuery()
    query.select('.container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) { 
      that.setData({
        sumHeight: res[0].height
      })
      console.log(res[0].height)
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    }) 

  },
  //获取详情页内容
  articleMain:function(){
    var that = this;
      wx.request({
        url: "https://www.suitius.com/tp5/public/artinfo",
        data:{
          id: that.data.articleId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
          that.setData({
            contentMain:res.data
          })
          //loging消失
          wx.hideToast();
          console.log(that.data.contentMain);
        }
      })
  },
  //监听页面滚动
  onPageScroll:function(e){
    //console.log(e.scrollTop)
  },
  //点击评论
  tap:function(){
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('.commentSum').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) { 
      if (that.data.tapYesNo){
        console.log("存")
        that.setData({
          top: res[0].top,
          scrollY: res[1].scrollTop,
          pinlunHeight: res[0].height,
          tapYesNo:false
        })
      }else{
        console.log("不存")
        that.setData({
          top: res[0].top,
          pinlunHeight: res[0].height,
          tapYesNo: true
        })
      }

      if (that.data.top < that.data.windowHeight) {
        console.log("在评论区", that.data.scrollY + that.data.windowHeight, that.data.sumHeight - that.data.pinlunHeight)
        //在评论区
        console.log(that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight)//滚动到内容底部
        if (that.data.scrollY + that.data.windowHeight>=that.data.sumHeight - that.data.pinlunHeight){
          wx.pageScrollTo({
            scrollTop: that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight
          })
        }else{
          wx.pageScrollTo({
            scrollTop: that.data.scrollY
          })
        }
     } else {
       //不在评论区
        that.setData({
          top: res[0].top,
          scrollY: res[1].scrollTop,
          pinlunHeight: res[0].height,
          tapYesNo: false
        })
        console.log("不在评论区")
        wx.pageScrollTo({
          scrollTop: that.data.sumHeight - that.data.pinlunHeight
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