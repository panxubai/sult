<<<<<<< HEAD
// pages/searchs/searchs.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-文章', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo:{},
    tapYesNo:true,//一次存 一次不存
    scrollY:0,//就是存上次点击的位置
    top:1,//评论上边界到屏幕的距离
    windowHeight:0,//屏幕的高度
    sumHeight:0,//总高度
    pinlunHeight:0,//评论的高度
    articleId:0,//文章id
    contentMain:[],//文章内容存放
    commentShow:false,//显示评论输入框
    focus:false,//获取焦点
    commentArray:"",//评论存放处
    mainInput:""//评论内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    });
    var that =this;
    //吧id给data
   // console.log(options)
    that.setData({
      articleId: options.id
    });
    //调用详情页内容
    this.articleMain();
  
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
       // console.log(res)
        that.setData({
          userInfo: res.data
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
       //  console.log(res)
          var article = res.data.content[0].value;
          WxParse.wxParse('article', 'html', article, that);
          that.setData({
            contentMain:res.data,
            commentArray:res.data.comment
          })

          //loging消失
          wx.hideLoading()
         // console.log(that.data.contentMain);
        }
      })
  },

  //监听页面滚动
  onPageScroll:function(e){
    //console.log(e.scrollTop)
  },
  //点击评论
  tap:function(){
    let that = this;
    //获取页面总高度
    var query = wx.createSelectorQuery()
    query.select('.container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
     // console.log(res)
      that.setData({
        sumHeight: res[0].height
      })
      // console.log(res[0].height)
    });
    wx.getSystemInfo({
      success: function (res) {
       // console.log(res);
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  //获取评论总高度
    var query = wx.createSelectorQuery()
    query.select('.commentSum').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) { 
      if (that.data.tapYesNo){
       // console.log("存")
        that.setData({
          top: res[0].top,
          scrollY: res[1].scrollTop,
          pinlunHeight: res[0].height,
          tapYesNo:false
        })
      }else{
       // console.log("不存")
        that.setData({
          top: res[0].top,
          pinlunHeight: res[0].height,
          tapYesNo: true
        })
      }

      if (that.data.top < that.data.windowHeight-50) {
       // console.log("在评论区", that.data.scrollY + that.data.windowHeight, that.data.sumHeight - that.data.pinlunHeight)
        //在评论区
       // console.log(that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight)//滚动到内容底部
        if (that.data.scrollY + that.data.windowHeight>=that.data.sumHeight - that.data.pinlunHeight){
          wx.pageScrollTo({
            scrollTop: that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight+20
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
       // console.log("不在评论区", that.data.sumHeight , that.data.pinlunHeight)
        wx.pageScrollTo({
          scrollTop: that.data.sumHeight - that.data.pinlunHeight
        })
     }
     
    })
  
  },

  //点击评论拉起键盘
  commentTap:function(){ 
    var that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          that.setData({
            userInfo: res.data,
            commentShow: true,
            focus: true
          })
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    
  },
  //点击发布评论
  issueTap:function(){
    var that = this;
    var time = util.formatTime(new Date());
   // console.log(that.data.userInfo)
    if (that.data.mainInput.match(/^[ ]*$/)) {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
    }else{
    wx.request({
          url: "https://www.suitius.com/tp5/public/comment",
          data:{
            id: that.data.articleId,
            user_id: that.data.userInfo.user_id,
            name: that.data.userInfo.data.name,
            head: that.data.userInfo.data.avatar,
            comment: that.data.mainInput
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function (res) {
            console.log(res);
            if (res.data.isForbidden == false){
              wx.showToast({
                title: '你的账号状态异常,请联系客服',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }else{
              let data = {
                id: that.data.articleId,
                user_id: that.data.userInfo.user_id,
                name: that.data.userInfo.data.name,
                head: that.data.userInfo.data.avatar,
                comment: that.data.mainInput,
                time: time
              };
              var commentArray = that.data.commentArray;
              commentArray.unshift(data);
              that.setData({
                commentArray: commentArray,
                mainInput: "",
                commentShow: false,
                focus: false
              });
            }
            
          }
        })
    }
  },
  //点击主题是评论复原
  containerTap:function(){
    var that = this;
    that.setData({
      commentShow: false,
      focus: false
    }) 
  },
  mainInput:function(e){
    var that = this;
    that.setData({
      mainInput: e.detail.value
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
  //转发接口
  onShareLiang:function(){
    let that = this;
    wx.request({
      url: "https://www.suitius.com/tp5/public/forward",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: that.data.articleId
      },
      success: function (res) {
       // console.log(res)
        
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
      return {
        success: (res) => {
         // console.log("转发成功", res);
          that.onShareLiang();
        },
        fail: (res) => {
          //console.log("转发失败", res);
        }
      }
  }
=======
// pages/searchs/searchs.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-文章', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo:{},
    articleImg:"",//用不用解析
    tapYesNo:true,//一次存 一次不存
    scrollY:0,//就是存上次点击的位置
    top:1,//评论上边界到屏幕的距离
    windowHeight:0,//屏幕的高度
    sumHeight:0,//总高度
    pinlunHeight:0,//评论的高度
    articleId:0,//文章id
    contentMain:[],//文章内容存放
    commentShow:false,//显示评论输入框
    focus:false,//获取焦点
    commentArray:"",//评论存放处
    mainInput:""//评论内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    });
    var that =this;
    //吧id给data
   // console.log(options)
    that.setData({
      articleId: options.id,
      articleImg: options.img
    });
    //调用详情页内容
    this.articleMain();
  
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
       // console.log(res)
        that.setData({
          userInfo: res.data
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
       //  console.log(res)
          var article = res.data.content[0].value;
          WxParse.wxParse('article', 'html', article, that);
          that.setData({
            contentMain:res.data,
            commentArray:res.data.comment
          })

          //loging消失
          wx.hideLoading()
         // console.log(that.data.contentMain);
        }
      })
  },

  //监听页面滚动
  onPageScroll:function(e){
    //console.log(e.scrollTop)
  },
  //点击评论
  tap:function(){
    let that = this;
    //获取页面总高度
    var query = wx.createSelectorQuery()
    query.select('.container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
     // console.log(res)
      that.setData({
        sumHeight: res[0].height
      })
      // console.log(res[0].height)
    });
    wx.getSystemInfo({
      success: function (res) {
       // console.log(res);
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  //获取评论总高度
    var query = wx.createSelectorQuery()
    query.select('.commentSum').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) { 
      if (that.data.tapYesNo){
       // console.log("存")
        that.setData({
          top: res[0].top,
          scrollY: res[1].scrollTop,
          pinlunHeight: res[0].height,
          tapYesNo:false
        })
      }else{
       // console.log("不存")
        that.setData({
          top: res[0].top,
          pinlunHeight: res[0].height,
          tapYesNo: true
        })
      }

      if (that.data.top < that.data.windowHeight-50) {
       // console.log("在评论区", that.data.scrollY + that.data.windowHeight, that.data.sumHeight - that.data.pinlunHeight)
        //在评论区
       // console.log(that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight)//滚动到内容底部
        if (that.data.scrollY + that.data.windowHeight>=that.data.sumHeight - that.data.pinlunHeight){
          wx.pageScrollTo({
            scrollTop: that.data.sumHeight - that.data.pinlunHeight - that.data.windowHeight+20
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
       // console.log("不在评论区", that.data.sumHeight , that.data.pinlunHeight)
        wx.pageScrollTo({
          scrollTop: that.data.sumHeight - that.data.pinlunHeight
        })
     }
     
    })
  
  },

  //点击评论拉起键盘
  commentTap:function(){ 
    var that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          that.setData({
            userInfo: res.data,
            commentShow: true,
            focus: true
          })
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    
  },
  //点击发布评论
  issueTap:function(){
    var that = this;
    var time = util.formatTime(new Date());
   // console.log(that.data.userInfo)
    if (that.data.mainInput.match(/^[ ]*$/)) {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
    }else{
    wx.request({
          url: "https://www.suitius.com/tp5/public/comment",
          data:{
            id: that.data.articleId,
            user_id: that.data.userInfo.user_id,
            name: that.data.userInfo.data.name,
            head: that.data.userInfo.data.avatar,
            comment: that.data.mainInput
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function (res) {
            console.log(res);
            let data = {
              id: that.data.articleId,
              user_id: that.data.userInfo.user_id,
              name: that.data.userInfo.data.name,
              head: that.data.userInfo.data.avatar,
              comment: that.data.mainInput,
              time: time
            };
            var commentArray = that.data.commentArray;
            commentArray.unshift(data);
            that.setData({
              commentArray: commentArray,
              mainInput:"",
              commentShow: false,
               focus: false
            });
          }
        })
    }
  },
  //点击主题是评论复原
  containerTap:function(){
    var that = this;
    that.setData({
      commentShow: false,
      focus: false
    }) 
  },
  mainInput:function(e){
    var that = this;
    that.setData({
      mainInput: e.detail.value
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
  //转发接口
  onShareLiang:function(){
    let that = this;
    wx.request({
      url: "https://www.suitius.com/tp5/public/forward",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: that.data.articleId
      },
      success: function (res) {
       // console.log(res)
        
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
      return {
        success: (res) => {
         // console.log("转发成功", res);
          that.onShareLiang();
        },
        fail: (res) => {
          //console.log("转发失败", res);
        }
      }
  }
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
})