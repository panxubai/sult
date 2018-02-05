// pages/searchs/searchs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    hotSearch: ["上大路", "徐汇", "金桥", "宝山", "杨浦", "上大路"],
    historySearch: ["上大路", "徐汇", "金桥", "宝山", "杨浦", "上大路"],
    top:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //输入框事件
  searchEndChange:function(e){
    let that = this;
    that.setData({
      inputVal: e.detail.value
    })
  },
  //点击差号事件
  eliminateTap:function(){
    let that = this;
    that.setData({
      inputVal: ""
    })
  },
  //删除历史搜索
  removeHistorySearch:function(){
    //告诉后台清空历史
    this.setData({
      historySearch:[]
    })
  },
  //点击带入参数进去首页搜索
  bindtapa:function(e){
    wx.redirectTo({
      url: '../index/index?addressId='+e.currentTarget.dataset.text
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