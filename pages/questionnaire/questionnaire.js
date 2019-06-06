// pages/questionnaire/questionnaire.js
var animation;
const app = getApp();
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1960; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-问卷调查', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo:{},
    DayIsShow: false,//显示选择框
<<<<<<< HEAD
    timeVal: 1,//1调用职业,2调用生日,3调用学历
=======
    timeVal: 1,//1调用职业,2调用生日
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    animationDay: {},//动画
    years: years,//数组年
    months: months,//数组月
    //days: days,//数组日
    value1: [0],
    value2: [30, 0],//value2: [0, 0],
    year: 30,
    month: 0,
    //day: 0,
    occupationVal:0,
<<<<<<< HEAD
    scrollVal:0,
    arrayDay: ["金融", "销售", "IT互联网", "教育培训", "电商", "硬件", "学生", "老板", "其他"],
    scrollArr: ['中专','大专','本科','硕士','博士','其它'],
    occupationText:"",//选择职业
    schoollText:"",//选择学校
=======
    arrayDay: ["金融", "销售", "IT互联网", "教育培训", "电商", "硬件", "学生", "老板", "其他"],
    occupationText:"",//选择职业
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    yearText:"",//选择年
    monthText: "",//选择月
    //dayText: "",//选择日
    genderIndex:0,//0，未选择，1，男    0，女
    restsIndex: 0,//0，未选择，1，是    0，否
    inputVal:""//学校
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 初始化动画变量
    var animation = wx.createAnimation({
<<<<<<< HEAD
      duration: 300,
=======
      duration: 500,
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
      timingFunction: 'ease',
    });
    this.animation = animation;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //   console.log(res)
        that.setData({
          genderIndex: res.data.data.sex,
          userInfo: res.data
        });
      }
    })
  },
  //调用动画
  startAddressAnimation: function (isShow) {
    //console.log(isShow)
<<<<<<< HEAD
    //console.log(111)
=======
    console.log(111)
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
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
  //点击职业
  occupationTap: function () {
    var that = this;
    that.setData({
      timeVal: 1
    });
    that.startAddressAnimation(true)
  },
<<<<<<< HEAD
  //点击学历
  schoollTap: function () {
    var that = this;
    that.setData({
      timeVal: 3
    });
    that.startAddressAnimation(true)
  },
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
  //点击生日
  birthdayTap: function () {
    var that = this;
    that.setData({
      timeVal: 2
    });
    that.startAddressAnimation(true)
  },
  //填写学校
  inputVal:function(e){
    //console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    })
  },
  //点击阴影,取消
  hideSelected: function (e) {
    //console.log(e)
    this.startAddressAnimation(false)
  },
  //滚动选择
  cityChange: function (e) {
    let that = this;
    let val = e.detail.value;
    if (that.data.timeVal == 1) {
      that.setData({
        occupationVal: val[0]
      })
    } else if (that.data.timeVal == 2) {
      that.setData({
        year: val[0],
        month: val[1],
       // day: val[2],
      })
<<<<<<< HEAD
    } else if (that.data.timeVal == 3){
      that.setData({
        scrollVal: val[0]
      })
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    }
  },
  //点击确定
  daySure: function () {
    var that = this
    if (that.data.timeVal == 1) {
      that.setData({
        occupationText: that.data.arrayDay[that.data.occupationVal],
        value1: [that.data.occupationVal]
      })
    } else if (that.data.timeVal == 2) {
      var array2 = [];
      array2.push(that.data.year);
      array2.push(that.data.month);
     // array2.push(that.data.day);
      that.setData({
        yearText: that.data.years[that.data.year],
        monthText: that.data.months[that.data.month],
        //dayText: that.data.days[that.data.day],
        value2: array2
      })
<<<<<<< HEAD
    } else if (that.data.timeVal == 3){
      console.log(that.data.scrollArr[that.data.scrollVal])
      that.setData({
        schoollText: that.data.scrollArr[that.data.scrollVal],
        value3: [that.data.scrollVal]
      })
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    }
    this.startAddressAnimation(false)
  },
  //选择男女
  genderTap:function(e){
    console.log(e.target.dataset.index)
    this.setData({
      genderIndex: e.target.dataset.index
    })
  },
  //选择是否
  restsTap: function (e) {
    console.log(e.target.dataset.index)
    this.setData({
      restsIndex: e.target.dataset.index
    })
  },
  //提交
  submitWjTap:function(){
      let that = this;
<<<<<<< HEAD
    if (that.data.occupationText == "" || that.data.yearText == "" || that.data.schoollText == "" ){
      //|| that.data.inputVal.match(/^[ ]*$/)
=======
      if (that.data.occupationText == "" || that.data.yearText == "" || that.data.inputVal == "" || that.data.inputVal.match(/^[ ]*$/)){
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        wx.showModal({
          title: '提示',
          content: '请把信息填写完整',
        })

      }else{
        wx.request({
          url: 'https://www.suitius.com/tp5/public/question',
          data: {
            user_id: that.data.userInfo.user_id,
            birth: that.data.yearText + '年'+that.data.monthText+'月',
            sex: that.data.genderIndex,
            job: that.data.occupationText,
<<<<<<< HEAD
            school: that.data.schoollText,
=======
            school: that.data.inputVal,
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
            pet: that.data.restsIndex
            
            },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res);
            if (res.data.code) {
              wx.showToast({
                title: res.data.data,
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../index/index'
                })
              }, 1000)
            } else {
              wx.showToast({
                title: res.data.data,
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