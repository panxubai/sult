// pages/relationFD/relationFD.js
var animation;
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-联系业主', //导航栏 中间的标题
    },
    height: app.globalData.height + 44,  
    userInfo: {},//获取用户姓名和头像
    DayIsShow:false,//显示选择框
    animationDay:{},//动画
    arrayDay:["不设定","今天","明天"],
    arrayTime1: [],
    arrayTime3: [],
<<<<<<< HEAD
    arrayTime2: ["00"],
=======
    arrayTime2: ["00", "30"],
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    timeVal:1,//1调用day,2调用time
    dayVal1:0,//day的索引
    dayVal2: 0,//time小时的索引
    dayVal3:0,//分钟的索引
    dayText:"不设定",//默认今天 *
<<<<<<< HEAD
    timeHour:"08",//小时* 
    timeMinute:"00",//分钟*
    textareaVal:"",//用户输入内容
=======
    timeHour:"08",//小时*
    timeMinute:"00",//分钟*
    textareaVal:"业主您好，想跟几个小伙伴租您的房子，望沟通",//用户输入内容
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    value1:[0],
    value2: [0,0],
   // phptoInput:"",//用户手机号
    optionsId:0,//房屋id
    dataHome:[],
    timeMin:8.0,
    timeMax:22.0,
    visit_time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首次加载时的逻辑
    let that = this;
    var myDate = new Date();
   // console.log(myDate.getHours());
    if (21 < myDate.getHours() && myDate.getHours() < 23){
      this.setData({
        dayText: "明天",
      })
    } else if (myDate.getHours() + 1 == 24){
      this.setData({
        dayText: "明天",
      })
    } else if (myDate.getHours() < 8){
        
    }else{
      this.setData({
        timeHour: myDate.getHours()+1
      })
    }
    
  // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    this.animation = animation;


    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data,
          optionsId: options.id
        });
        that.dataArr(options.id)
      }
    })
    
  },

  dataArr:function(id){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visit',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id:id
      },
      success: function (res) {
        console.log(res.data);
        let timeMin, timeMax;
        if (res.data.visit_time == ""){
          that.setData({
            dataHome: res.data,
            visit_time: res.data.visit_time
          })
        }else{
          let arrTime = res.data.visit_time.split("--");
          let timeMinArr = arrTime[0].split(":");
          let timeMaxArr = arrTime[1].split(":");
          timeMin = parseInt(timeMinArr[0]) + '.' + parseInt(timeMinArr[1]);
          timeMax = parseInt(timeMaxArr[0]) + '.' + parseInt(timeMaxArr[1]);
          that.setData({
            dataHome: res.data,
            timeMin: timeMin,
            timeMax: timeMax,
            visit_time: res.data.visit_time
          })
        }
        
       
      }
    })
  },
//处理到访时间的逻辑
    loadTime:function(){
      let that = this;
      //console.log(that.data.dayText);
      var myDate = new Date();
     // console.log(myDate.getHours());
      if (21 < myDate.getHours() && myDate.getHours() < 23){
     //   console.log(1)
        wx.showModal({
          title: '提示',
          content: '该时段业主休息啦,可预约明天哦',
        })
      } else if (myDate.getHours()+1 ==24){
        //console.log(2)
        wx.showModal({
          title: '提示',
          content: '该时段业主休息啦,可预约明天哦',
        })
      }else{
      //  console.log(3)
          if (myDate.getHours()+1 < 8){
            var arrayDay = [];
            for (let i = 8; i <= 22; i++) {
              if(i == 8){
                arrayDay.push('0' + i)
              }else if(i == 9){
                arrayDay.push('0' + i)
              }else{
                arrayDay.push(i)
              }     
            }
            this.setData({
              arrayTime1: arrayDay,
              identifying: true
            })
          }else{
            var arrayDay = [];
            for (let i = 1; i <= 22 - myDate.getHours(); i++) {
              arrayDay.push(myDate.getHours() + i)
            }
            this.setData({
              arrayTime1: arrayDay,
              identifying: true
            })
          }
          that.setData({
            timeVal: 2
          });
          that.startAddressAnimation(true)
      }
     
    },
  //点击day
  dayTap:function(){
    var that = this;
    that.setData({
      timeVal: 1
    });
    that.startAddressAnimation(true)
  },
  //点击time
  timeTap: function () {
    console.log(111111)
    var that = this;
    if (that.data.dayText == "不设定"){

    }else if (that.data.dayText == "今天"){
      that.loadTime();
    }else{
      var arrayDay = [];
      for (let i = 8; i <= 22; i++) {
        if (i == 8) {
          arrayDay.push('0' + i)
        } else if (i == 9) {
          arrayDay.push('0' + i)
        } else {
          arrayDay.push(i)
        }
      }
      this.setData({
        arrayTime1: arrayDay,
      })
      that.setData({
        timeVal: 2
      });
      that.startAddressAnimation(true)
    }
   
   
  },
  //调用动画
  startAddressAnimation: function (isShow) {
    //console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationDay: that.animation.export(),
      DayIsShow: isShow,
    })
  },
  //点击阴影,取消
  hideSelected: function (e) {
    //console.log(e)
    this.startAddressAnimation(false)
  },
 //点击确定
  daySure:function(){
   
    var that = this
    if (that.data.timeVal == 1) {
      var array1 = [];
      array1.push(that.data.dayVal1);
      that.setData({
        dayText: that.data.arrayDay[that.data.dayVal1],
        value1: array1
      });
      that.timeTap();
      that.setData({
        timeHour: that.data.arrayTime1[0],
        timeMinute: that.data.arrayTime2[0],
        dayVal2: 0,
        dayVal3: 0,
        value2: [0,0]
      })
    } else if (that.data.timeVal == 2) {
      var array2 = [];
      array2.push(that.data.dayVal2);
      array2.push(that.data.dayVal3);
      that.setData({
        timeHour: that.data.arrayTime1[that.data.dayVal2],
        timeMinute: that.data.arrayTime2[that.data.dayVal3],
        value2: array2
      })
    }
    this.startAddressAnimation(false)
  },
  //滚动选择
  cityChange: function (e) {
    let that = this;
    let val = e.detail.value[0];
    let val1 = e.detail.value[1];
    if (that.data.timeVal == 1) {
      that.setData({
        dayVal1: val
      })
    } else if (that.data.timeVal == 2) {
      that.setData({
        dayVal2: val,
        dayVal3: val1
      })
    }
  },
  //手机号输入
  // bindKeyInput:function(e){
  //   this.setData({
  //     phptoInput: e.detail.value
  //   })
  // },
  //输入框事件
  textareaInput:function(e){ 
    this.setData({
      textareaVal: e.detail.value
    })
  },
  //用户提交申请按钮
  submitTap:function(){
    let that = this;
    var time = util.formatTime(new Date());
  //  console.log(new Date().getMonth()+1, new Date().getDate());
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    let timeFd = parseFloat(that.data.timeHour + '.' + that.data.timeMinute);
    //console.log(timeFd, parseFloat(that.data.timeMin), parseFloat(that.data.timeMax))
    if (that.data.textareaVal == ""){
      wx.showModal({
        title: '提示',
<<<<<<< HEAD
        content: '请给对方打个招呼',
=======
        content: '请给业主打个招呼',
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
      })
    }else{
     let data;
     if (that.data.dayText == "不设定"){
       data = 0;
     }else{
if (parseFloat(that.data.timeMin) > timeFd || parseFloat(that.data.timeMax) < timeFd) {
         wx.showModal({
           title: '提示',
           content: '业主的预约时间为' + that.data.visit_time,
         })
         return;
       }else{
          if (that.data.dayText == "今天") {
            data = Date.parse(new Date());
          } else {
            data = Date.parse(new Date()) + 86400000;
          }
       }
      
     } 
     //console.log(data)
      wx.request({
        url: 'https://www.suitius.com/tp5/public/visitApply',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method:"POST",
        data: {
          house_id: that.data.optionsId,
          user_id: that.data.userInfo.user_id,
          access_date: data,
          access_time: that.data.dayText == "不设定"?"":that.data.timeHour+"："+that.data.timeMinute,
          //phone: that.data.phptoInput,
          message: that.data.textareaVal
        }, 
        success: function (res) {
        console.log(res)
          if (res.data.code){
            wx.showToast({
              title: res.data.info,
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) 
        }else{
            wx.showModal({
              title: '提示',
              content: res.data.info,
            })
        }
         
        }
      })
    }
  },
  homeDetailTap:function(e){
    wx.navigateBack({
      delta: 1
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