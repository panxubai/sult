// pages/searchs/searchs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-搜索', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    inputVal:"",
    hotSearch: ["宝山区", "杨浦区", "虹口区"],
    historySearch: [],
    top:0,
    options:0,
    historyShow:true,
    showList:false,
    sumData:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options.id
    });
    this.historySearch();
  },
  //历史搜索
  historySearch:function(){
    let that = this;
    var logs = wx.getStorageSync('historySearch') || []
    if (logs == ""){
      that.setData({
        historyShow: false
      });
    }
    that.setData({
      historySearch: logs
    })
  },
  //输入框事件
  searchEndChange:function(e){
    let that = this;
   // console.log(e.detail.value)
    if (e.detail.value == ""){
      that.setData({
        sumData: [],
        showList: false
      })
    }else{
    wx.request({
      url: 'https://www.suitius.com/tp5/public/search',
      data: {
        keyWord:e.detail.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       // console.log(res);
        if (res.data.mall.length == 0 && res.data.village.length == 0 && res.data.ward.length == 0){
          that.setData({
            sumData: res.data,
            showList:true
          })
        }else{
          that.setData({
            sumData: res.data,
            showList: false
          })
        }
        
      }
    })
    }   
  },
  //点击差号事件
  eliminateTap:function(){
    let that = this;
    that.setData({
      inputVal: "",
      sumData:[],
      showList: false
    })
  },
  //删除历史搜索
  removeHistorySearch:function(){
    //告诉后台清空历史
    this.setData({
      historySearch:[],
      historyShow: false
    })
    wx.removeStorageSync('historySearch')
  },
  //点击带入参数进去首页搜索
  bindtapa:function(e){
    let that =this;
   //// console.log(e.currentTarget.dataset)
    var logsArr = that.data.historySearch;
    for (let i = 0; i < logsArr.length; i++) {
      if (logsArr[i].text == e.currentTarget.dataset.text) {
        logsArr.splice(i, 1);
      }
    }
    logsArr.unshift(e.currentTarget.dataset);
    wx.setStorageSync('historySearch', logsArr);
    this.setData({
      historySearch: logsArr
    })
   // console.log(that.data.historySearch)
    if (that.data.options == 0){ 
      wx.redirectTo({
        url: '../index/index?addressId=' + e.currentTarget.dataset.text +"-"+ e.currentTarget.dataset.type
      });

    } else if(that.data.options == 1){
      wx.redirectTo({
        url: '../searchEnd/searchEnd?addressId=' + e.currentTarget.dataset.text + "-" + e.currentTarget.dataset.type
      });
    }
    wx.setStorage({
      key: "addressYes",
      data: e.currentTarget.dataset
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