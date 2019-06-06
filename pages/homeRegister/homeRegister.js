// pages/homeRegister/homeRegister.js
const app = getApp();
var animation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-房屋登记', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    DayIsShow: false,//显示选择框
<<<<<<< HEAD
    questionShow:false,//房屋提醒
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    animationDay: {},//动画
    arrayDay: ["简装", "精装", "毛坯"],
    arrayTime1: ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室','9室'],
    arrayTime2: ['0厅','1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅'],
    arrayTime3: ['1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫'],
    timeVal: 1,//1调用装修,2调用户型
    dayVal1: 0,//装修的索引
    dayVal2: 0,//几室的索引
    dayVal3: 0,//几卫的索引
    dayVal4: 0,//几厅的索引
    fitmentText:"简装",
    houseText1:"1室",
    houseText2: "0厅",
    houseText3: "1卫",
    value1: [0],
    value2: [0, 0,0],
    userInfo:{},
<<<<<<< HEAD
    tempFilePaths:[],//房屋图片propertyImg
    propertyImg: [],//房产证图片
    serverImg:[],//存放服务器上的图片
    serverProImg:[],//存放服务器上的房产证图片
=======
    tempFilePaths:[],//房屋图片
    propertyImg:"",//房产证图片
    serverImg:[],//存放服务器上的图片
    serverProImg:"",//存放服务器上的房产证图片
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    chumListWidth:0,
    codeText:"获取验证码",
    areaText:"",//面积
    nameText:"",
    plotText: "",
    addessText: "",
    photoNumber: "",
    codeNumber: "",
    photoTap:false,
    yanzhengma:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    this.animation = animation;
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
  //点击装修
  fitmentTap:function(){
    var that = this;
    that.setData({
      timeVal: 1
    });
    that.startAddressAnimation(true)
  },
  //点击户型
  houseTap: function () {
    var that = this;
    that.setData({
      timeVal: 2
    });
    that.startAddressAnimation(true)
  },
  //点击阴影,取消
  hideSelected: function (e) {
    //console.log(e)
    this.startAddressAnimation(false)
  },

  //滚动选择
  cityChange: function (e) {
    let that = this;
    console.log(e.detail)
    let val = e.detail.value[0];
    let val1 = e.detail.value[1];
    let val2 = e.detail.value[2];
    if (that.data.timeVal == 1) {
      that.setData({
        dayVal1: val
      })
    } else if (that.data.timeVal == 2) {
      that.setData({
        dayVal2: val,
        dayVal3: val1,
        dayVal4: val2
      })
    }
  },
  //点击确定
  daySure: function () {
    var that = this
    if (that.data.timeVal == 1) {
      var array1 = [];
      array1.push(that.data.dayVal1);
      that.setData({
        fitmentText: that.data.arrayDay[that.data.dayVal1],
        value1: array1
      });
    }else{
      var array2 = [];
      array2.push(that.data.dayVal2);
      array2.push(that.data.dayVal3);
      array2.push(that.data.dayVal4);
      that.setData({
        houseText1: that.data.arrayTime1[that.data.dayVal2],
        houseText2: that.data.arrayTime2[that.data.dayVal3],
        houseText3: that.data.arrayTime3[that.data.dayVal4],
        value2: array2
      })
    }
    this.startAddressAnimation(false)
  },

  //点击删除
  tapaa:function(e){
   // console.log(e.currentTarget.dataset.index);
    var arr = this.data.tempFilePaths;
    arr.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      tempFilePaths:arr
    })
  },
  //点击拍照房屋
  tapPhoto:function(){
    let that = this;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
<<<<<<< HEAD
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        var arra = that.data.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          if (res.tempFiles[i].size <= 2000000) {
            var arrs = arra.push(tempFilePaths[i])
          } else {
            wx.showToast({
              title: '上传图片不能大于2M!',  //标题
              icon: 'none'       //图标 none不使用图标，详情看官方文档
            })
          }
          
=======
        var tempFilePaths = res.tempFilePaths;
        var arra = that.data.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          var arrs = arra.push(tempFilePaths[i])
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        }
       // console.log(arra);
        that.setData({
          tempFilePaths: arra,
        })
     
      }
    })
  },
  //点击上传房产证
  tapproperty:function(){
    let that = this;
<<<<<<< HEAD
    if (that.data.propertyImg.length == 0){
      that.setData({
        questionShow: true,
      })
    }else{
      that.bindYesTap();
    }

  },
  //点击知道了 调用图片
  bindYesTap:function(){
    let that = this;
    that.setData({
      questionShow: false,
    })
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths1 = res.tempFilePaths;
        var arra1 = that.data.propertyImg;
        for (var i = 0; i < tempFilePaths1.length; i++) {
          if (res.tempFiles[i].size <= 2000000) {
            arra1.push(tempFilePaths1[i])
          }else{
            wx.showToast({
              title: '上传图片不能大于2M!',  //标题
              icon: 'none'       //图标 none不使用图标，详情看官方文档
            })
          }
          
        }
        // console.log(arra);
        that.setData({
          propertyImg: arra1
=======
    wx.chooseImage({
      count: 1, 
      success: function (res) {
     //   console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          propertyImg: res.tempFilePaths[0],
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        })
      }
    })
  },
  //删除房产证
<<<<<<< HEAD
  delImgPyTap:function(e){
    var arr1 = this.data.propertyImg;
    arr1.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      propertyImg: arr1
=======
  delImgPyTap:function(){
    this.setData({
      propertyImg: ''
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    })
  },
//姓名
  nameInput:function(e){
    this.setData({
      nameText: e.detail.value
    })
  },
  //面积
  areaInput:function(e){
    this.setData({
      areaText: e.detail.value
    })
  },
  //小区
  plotInput: function (e) {
    this.setData({
      plotText: e.detail.value
    })
  },
  //详细地址
  addessInput: function (e) {
    this.setData({
     addessText: e.detail.value
    })
  },
  //手机
  photoInput: function (e) {
    let that = this;
    this.setData({
      photoNumber: e.detail.value
    })
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.photoNumber)) {
      that.setData({
        photoTap: false
      })
    } else {
      that.setData({
        photoTap: true
      })
    }
    
  },
  //验证码
  codeInput: function (e) {
    this.setData({
      codeNumber: e.detail.value
    })
  },
  //获取验证码
  gainCodeTap:function(){
    let that = this;
    if (that.data.photoTap) {
      wx.request({
        url: 'https://www.suitius.com/tp5/public/getCode',
        data: {
          phone: that.data.photoNumber
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
        //  console.log(res)
          that.setData({
            yanzhengma: res.data.verify
          })
          that.timer();
        }
      })

    } else {
      return;
    }
  },
  timer:function() {
    let that = this;
    wx.setStorageSync('sultCodeTime', 60)
    let value = wx.getStorageSync('sultCodeTime') || 60;
    if (value > 0) {
      that.setData({
        codeText: value+'s',
        photoTap: false
      })
    }
		var timer = setInterval(function () {
      if (value > 0) {
        value--;
        that.setData({
          codeText: value + 's',
          photoTap:false
        })
        wx.setStorageSync('sultCodeTime', value)
      } else {
        clearInterval(timer);
        wx.removeStorageSync('sultCodeTime')
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(that.data.photoNumber)) {
          that.setData({
            codeText: '获取验证码',
            photoTap: false
          })
        } else {
          that.setData({
            codeText: '获取验证码',
            photoTap: true
          })
        }
      }
    }, 1000);
  },
  //点击提交
  btnSumTap:function(){
    let that = this;
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
 
<<<<<<< HEAD
    if (that.data.plotText == "" || that.data.addessText == "" || that.data.photoInput == "" || that.data.nameText == "" || that.data.codeNumber == "" || that.data.propertyImg.length == 0 || that.data.areaText == "" || that.data.tempFilePaths.length == 0){
=======
    if (that.data.plotText == "" || that.data.addessText == "" || that.data.photoInput == "" || that.data.nameText == "" || that.data.codeNumber == "" || that.data.propertyImg == "" || that.data.areaText == "" || that.data.tempFilePaths.length == 0){
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
      wx.showToast({
        title: '请把信息填写完整',
        icon: 'none',
        duration: 1000
      })
    } else if (!myreg.test(that.data.photoNumber)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.yanzhengma != that.data.codeNumber){
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '提交后不得修改',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
<<<<<<< HEAD
              title: '正在提交...',
=======
              title: '正在加载...',
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
              icon: 'loading',
              mask: true,
            })
            for (let i = 0; i < that.data.tempFilePaths.length; i++) {
              that.phptoJiekou(i)
            }
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
   
  },
  phptoJiekou:function(i){
    
    let that = this;
    wx.uploadFile({
      url: 'https://www.suitius.com/tp5/public/upload',
      filePath: that.data.tempFilePaths[i],
      name: 'img',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        let serverImg = that.data.serverImg;
        serverImg.push(res.data)
        that.setData({
          serverImg: serverImg
        })
        that.propertyImg()
      }
    })

  },
  //全部信息
  xinxiJiokou:function(){
    let that = this;
    console.log(that.data.serverImg);
<<<<<<< HEAD
    if (that.data.serverProImg.length == that.data.propertyImg.length) {
    //console.log(that.data.serverImg);
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
          wx.request({
            url: 'https://www.suitius.com/tp5/public/savehouse',
      data: {
        id: that.data.userInfo.user_id,
        village: that.data.plotText,
        address: that.data.addessText,
        phone: that.data.photoNumber,
        caller: that.data.nameText,
        verify: that.data.codeNumber,
        area: that.data.areaText,
        style: that.data.dayVal1,
        type: that.data.houseText1 + that.data.houseText2 + that.data.houseText3,
        ownership: that.data.serverProImg,
        img: that.data.serverImg
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        //console.log(res);
        wx.hideLoading()
        if (res.data.code){
          wx.showToast({
            title: '上传成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 1000);
         
        }

        // that.setData({
        //   Rentin: true,
        //   landlord: false
        // })
      }
    })
<<<<<<< HEAD
    }
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
  },
  //房产证图片
  propertyImg:function(){
    let that =this;
    console.log(that.data.serverImg);
    if (that.data.serverImg.length == that.data.tempFilePaths.length){
<<<<<<< HEAD
      for (let i = 0; i < that.data.propertyImg.length; i++) {
        wx.uploadFile({
          url: 'https://www.suitius.com/tp5/public/upload',
          filePath: that.data.propertyImg[i],
          name: 'ownership',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            let serverProImg = that.data.serverProImg;
            serverProImg.push(res.data)
            that.setData({
              serverProImg: serverProImg
            })
            that.xinxiJiokou()
          }
        })
      }
      
=======
      wx.uploadFile({
        url: 'https://www.suitius.com/tp5/public/upload',
        filePath: that.data.propertyImg,
        name: 'ownership',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          that.setData({
            serverProImg: res.data
          })
          that.xinxiJiokou()
        }
      })
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    }else{
      return;
    }

  },
  //点击上传到服务器

<<<<<<< HEAD

  //点击阴影消失
  hidenTipTap: function () {
    let that = this;
    that.setData({
      showMap: true,
      questionShow: false
    })
  },
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
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