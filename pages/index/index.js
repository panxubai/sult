//index.js 
//获取应用实例
//想要再次发起授权成功后再次调用用户信息
  // wx.openSetting({
  //    success: (res) => {
  //  console.log(res)
  // }
  // })
const app = getApp();
var animation;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({
  data: {
    nvabarData: {
      showCapsule: false, //是否显示左上角图标
      title: 'SUIT', //导航栏 中间的标题
    },
    height: app.globalData.height + 44,  
    userInfo: {},//获取用户姓名和头像
    Rentin:true,//点击我要租房
    landlord:false,//切换房主
    arrayCity: ["上海"],
    budgetLitter: ["不限", 2000, 3000, 4000, 5000, 6000],
    budgetbig: ["不限", 2000, 3000, 4000, 5000, 6000, 7000,8000],
    styleFishs: [" 简装", " 精装", " 毛坯", "不限"],
    relationArr: ["单身", "情侣", "家庭", "朋友", "其他"],
    numberArr1: [1,2,3,4,5,6,7,8,9,10],
    numberArr2: [0,1, 2, 3],
    cityYes:"上海",//地点*
    addressId: "",//首页地址搜索*
    budgetMinrYes: "不限",//预算小*
    budgetMaxrYes: "不限",//预算大*
    styleFishYes: "不限",//风格*
    relationYes: "单身",//关系*
    numberYes1: 1,//成人数量*
    numberYes2: 0,//儿童数量*
    cityVal: 0,//选择城市
    budgetMinVal:0,//选择预算小
    budgetMaxVal: 0,//选择预算大
    styleVal: 3,//选择装修
    relationVal: 0,//选择关系
    numberVal1: 0,//选择成人
    numberVal2: 0,//选择儿童
    activeShow: 0,//0城市，1预算小,2预算大，3装修选择,4关系，5成人，6儿童
    addressMenuIsShow: false,
    cityShow:false,
    isVisible:false,
    showArticleList:[],//文章列表
    animationData: {},
    encryptedData:"",
    array1:[0],//对应的是每个选择框的value
    array2: [0],
    array3: [0],
    array4: [3],
    array5: [0], 
    array6: [0],
    array7: [0],
    noticeShadowShow:false,//合作须知
    ownerFirstShow:false,//业主认证
    codeText: "获取验证码",
    photoNumber: "",//用户手机号
    codeNumber: "",//用户验证码
    photoTap: false,//是否能点击收到验证码
    addressType:"",//地址类型
    arrNumber1:'',//我的红点
    arrNumber2:'',//消息红点
  },
  //事件处理函数

  onLoad: function (options) {
    //console.log(wx.canIUse('button.open-type.getUserInfo'))
    //获取手机型号
    // wx.getSystemInfo({
    //   success: function (res) {
    //    console.log(res)
    //   }
    // }) 
    // if (wx.canIUse("getSetting")){
    //     console.log(231321)
    //   }


    let that = this;
    //调用获取用户openid
    //获取用户姓名头像
   // this.sultNameImg();  
    //请求文章列表
    this.articleList();
    //调取本地用户远的数据
   this.setStorageList();
  //首页地址栏传参
   //console.log(options)
    if (options.addressId == undefined){
      wx.getStorage({
        key: 'addressYes',
        success: function (res) {
          that.setData({
            addressId: res.data.text,
            addressType: res.data.type
          });
        },
        fail:function(){
          that.setData({
            addressId: "您想住哪里",
          })
        }
      });
      
    }else{
      let addressId = options.addressId.split("-");
      this.setData({
        addressId: addressId[0],
        addressType: addressId[1],
      })
    };    
      // 初始化动画变量
    var animation = wx.createAnimation({
      duration:300,
      timingFunction: 'ease',
    });
    this.animation = animation;

    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //防止后台报错
        if (res.data.code == 'false') {
          console.log(res)
          wx.navigateTo({
            url: '../login/login',
          })
        }else{
          that.setData({
            userInfo: res.data
          });
        }
        
        that.indexJiekou1()
        that.tapRentin()
      }
    })
  },

//消息显示红点
indexJiekou1:function(){
  let that = this;
  // console.log(that.data.userInfo)
  wx.request({
    url: 'https://www.suitius.com/tp5/public/identity',
    data: {
      user_id: that.data.userInfo.user_id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
     //console.log(res)
      that.setData({ 
        arrNumber1: res.data
      });
      that.indexJiekou2()
    }
  })
},
//消息显示红点
indexJiekou2: function () {
  let that = this;
  // console.log(that.data.userInfo)
  wx.request({
    url: 'https://www.suitius.com/tp5/public/message',
    data: {
      user_id: that.data.userInfo.user_id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
    //  console.log(res)
      that.setData({
        arrNumber2: res.data
      });
    }
  })
},
  //点击差号晴空
  eliminateTap:function(){
      wx.removeStorage({
        key: 'addressYes',
      });
      this.setData({
        addressId: "您想住哪里",
        addressType:"",
      })

  },
  //获取用户姓名和头像
  sultNameImg:function(){
    let that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      wx.setStorage({
        key: "sultNameImg",
        data: that.data.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorage({
          key: "sultNameImg",
          data: that.data.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
          wx.setStorage({
            key: "sultNameImg",
            data: that.data.userInfo
          })
        }
      })
    }
 
  },

//获取用户地理位置
sultAddress:function(){
  let that = this;
  var qqmapsdk = new QQMapWX({
    key: 'PNZBZ-WVL3P-2PTDE-L4IXO-W7U3E-7SF2T' // 必填
  });
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (addressRes) {
       console.log(addressRes);
          let addre = addressRes.result.address_component.city;
          let address = addre.split("市").join("");
          that.setData({
            cityYes: address
          })
        }
      })

    }
  })
},
  /**
 * 用户点击右上角分享
 */

  onShareAppMessage: function () {
    
  },
  //点击我要租房
  tapRentin: function(e) {
       let that = this;
       wx.request({
         url: 'https://www.suitius.com/tp5/public/switchUser',
         data: {
           id: that.data.userInfo.user_id
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         success: function (res) {
          // console.log(res)
           that.setData({
             Rentin: true,
             landlord: false
           })
         }
       })
      
  }, 
   //点击我是房东
  tapLandlord: function (e) {
    let that = this;
   
    //console.log(that.data.userInfo)
    //判断本地有没有openid。是否是第一次进来
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {     
        if (res.data == undefined) { 
          wx.navigateTo({
            url: '../login/login',
          })         
        } else {
          that.questFD()
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '../login/login',
        })  
      }
    })
    
   
  },
  //点击我是房东
  questFD:function(){
    let that =this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/switchOwner',
      data: {
        id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
    //    console.log(res);//0是没有认证房东 否则已经认证
        if (res.data.owner == 0) {
          that.setData({
            ownerFirstShow: true
          })

        } else {
          if (res.data.code == "false"){
            wx.showToast({
              title: res.data.info,
              icon: 'none',
              duration: 1000,
              mask: true
            })
            
          }else{
            that.setData({
              Rentin: false,
              landlord: true,
            })
          }
          
        }

      }
    })
  },
  //点击跳到个人中心
  tapmine:function(){
    //判断本地有没有openid。是否是第一次进来
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          wx.navigateTo({
            url: '../mine/mine',
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

  //点击选择城市
  selectCity:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 0
    })
    that.startAddressAnimation(true)
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
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  //本地取出用户选的筛选方式
  setStorageList:function(){
    let that = this;
    wx.getStorage({
      key: 'cityYes',
      success: function (res) {
        that.setData({
          cityYes: res.data
        });
      },
      fail:function(){
        //获取用户地理位置
       // that.sultAddress();
      }
    });
    wx.getStorage({
      key: 'budgetMinrYes',
      success: function (res) {
        that.setData({
          budgetMinrYes: res.data
        });
      }
    });
    wx.getStorage({
      key: 'budgetMaxrYes',
      success: function (res) {
        that.setData({
          budgetMaxrYes: res.data
        });
      }
    });
    wx.getStorage({
      key: 'styleFishYes',
      success: function (res) {
        that.setData({
          styleFishYes: res.data
        });
      }
    });
    wx.getStorage({
      key: 'relationYes',
      success: function (res) {
        that.setData({
          relationYes: res.data
        });
      }
    });
    wx.getStorage({
      key: 'numberYes1',
      success: function (res) {
        that.setData({
          numberYes1: res.data
        });
      }
    });
    wx.getStorage({
      key: 'numberYes2',
      success: function (res) {
        that.setData({
          numberYes2: res.data
        });
      }
    });
  },
  // 点击选择确定按钮
  citySure: function (e) {
    let that = this;
    if (that.data.activeShow == 0) {
      that.setData({
        cityYes: that.data.arrayCity[that.data.cityVal],
        array1: [that.data.cityVal],
      });
      wx.setStorage({
        key: "cityYes",
        data: that.data.arrayCity[that.data.cityVal]
      })
    } else if (that.data.activeShow == 1) {//预算小
      that.setData({
        budgetMinrYes: that.data.budgetLitter[that.data.budgetMinVal],
        array2: [that.data.budgetMinVal],
      });
      wx.setStorage({
        key: "budgetMinrYes",
        data: that.data.budgetLitter[that.data.budgetMinVal]
      })
    } else if (that.data.activeShow == 2) {//预算大
      that.setData({
        budgetMaxrYes: that.data.budgetbig[that.data.budgetMaxVal],
        array3: [that.data.budgetMaxVal],
      });
      wx.setStorage({
        key: "budgetMaxrYes",
        data: that.data.budgetbig[that.data.budgetMaxVal]
      })
    } else if (that.data.activeShow == 3) {
      that.setData({
        styleFishYes: that.data.styleFishs[that.data.styleVal],
        array4: [that.data.styleVal],
      });
      wx.setStorage({
        key: "styleFishYes",
        data: that.data.styleFishs[that.data.styleVal]
      })
    } else if (that.data.activeShow == 4) {
      that.setData({
        relationYes: that.data.relationArr[that.data.relationVal],
        array5: [that.data.relationVal],
      });
      wx.setStorage({
        key: "relationYes",
        data: that.data.relationArr[that.data.relationVal]
      })
    } else if (that.data.activeShow == 5) {
      that.setData({
        numberYes1: that.data.numberArr1[that.data.numberVal1],
        array6: [that.data.numberVal1],
      });
      wx.setStorage({
        key: "numberYes1",
        data: that.data.numberArr1[that.data.numberVal1]
      })
    } else if (that.data.activeShow == 6) {
      that.setData({
        numberYes2: that.data.numberArr2[that.data.numberVal2],
        array7: [that.data.numberVal2],
      });
      wx.setStorage({
        key: "numberYes2",
        data: that.data.numberArr2[that.data.numberVal2]
      })
    }
  
    this.startAddressAnimation(false)
  
  },
  //点击阴影
  hideCitySelected: function (e) {
    //console.log(e)
    this.startAddressAnimation(false)
  },
//滚动选择城市
  cityChange: function (e) {
    let that = this;
   let val = e.detail.value[0];
   if (that.data.activeShow == 0){
     that.setData({
       cityVal: val
     })
   } else if (that.data.activeShow == 1){
     that.setData({
       budgetMinVal: val
     })   
   } else if (that.data.activeShow == 2) {
     that.setData({
       budgetMaxVal: val
     })
   } else if (that.data.activeShow == 3) {
     that.setData({
       styleVal: val
     })
   } else if (that.data.activeShow == 4) {
     that.setData({
       relationVal: val
     })
   } else if (that.data.activeShow == 5) {
     that.setData({
       numberVal1: val
     })
   } else if (that.data.activeShow == 6) {
     that.setData({
       numberVal2: val
     })
   }
  
  },
  //点击预算小
  budgetingMin:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow:1
    })
    that.startAddressAnimation(true)
  },
  //点击预算大
  budgetingMax:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 2
    })
    that.startAddressAnimation(true)
  },
  //点击装修
  styletap:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 3
    })
    that.startAddressAnimation(true)
  },
  //点击关系
  relationtap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 4
    })
    that.startAddressAnimation(true)
  },
  //点击成人
  adultTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 5
    })
    that.startAddressAnimation(true)
  },
  //点击儿童
  childrenTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 6
    })
    that.startAddressAnimation(true)
  },
  //点击跳转到搜索地址
  searchPage:function(){
    wx.navigateTo({
      url: '../searchs/searchs?id=0',
    })
  },
  //点击文章进入详情页
  articleTap:function(e){
    wx.navigateTo({
      url: '../article/article?id=' + e.currentTarget.dataset.id + '&img=' + e.currentTarget.dataset.img,
    })
  },
  //请求文章列表页
  articleList:function(){
    let that = this;
    wx.request({
      url: "https://www.suitius.com/tp5/public/artlist",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         //console.log(res)
        that.setData({
          showArticleList: res.data
        });
      }
    })
  },
  //点击跳转消息中心
  tapMessage:function(){  
    //判断本地有没有openid。是否是第一次进来
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })


        } else {
          wx.navigateTo({
            url: '../message/message',
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
  questionnaireTap:function(){
    let that = this;

    //console.log(that.data.userInfo)
    //判断本地有没有openid。是否是第一次进来
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })


        } else {
          that.questions()
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  //点击跳问卷调查
  questions:function(){
    let  that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/identity',
      data: {
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         //console.log(res)
         if (res.data.question == 1){
           wx.showModal({
             title: '提示',
             content: '您已做过问卷调查,谢谢支持',
            
           })
         }else{
           wx.navigateTo({
             url: '../questionnaire/questionnaire',
           })
         }
        
      }
    })
    
  },
  //点击跳转搜索结果
  tapSearchEnd: function () {
    let that = this;
    let min;
    let max;
    let user_type;
    let val;
    if (that.data.budgetMinrYes == "不限" && that.data.budgetMaxrYes == "不限"){
      min = 0;
      max = 0;
    } else if (that.data.budgetMinrYes == "不限" || that.data.budgetMaxrYes == "不限"){
      if (that.data.budgetMinrYes == "不限"){
          min = 0;
          max = that.data.budgetMaxrYes
      }else{
        max = 0;
        min = that.data.budgetMinrYes;
      }
    } else if (that.data.budgetMinrYes == that.data.budgetMaxrYes ) {
      min = that.data.budgetMinrYes;
      max = that.data.budgetMaxrYes;
    } else if (that.data.budgetMinrYes > that.data.budgetMaxrYes) {
      console.log("要反过来")
      min = that.data.budgetMaxrYes;
      max = that.data.budgetMinrYes;
    }else{
      min = that.data.budgetMinrYes;
      max = that.data.budgetMaxrYes;
    };
    if (that.data.relationYes == "单身"){
      user_type = "single"
    } else if (that.data.relationYes == "情侣"){
      user_type ="couple"
    } else if (that.data.relationYes == "家庭") {
      user_type ="family"
    } else if (that.data.relationYes == "朋友") {
      user_type ="friend"
    } else if (that.data.relationYes == "其他") {
      user_type ="user_other"
    }
    if (that.data.addressId == "您想住哪里"){
        val = "";
    }else{
      val = that.data.addressId
    }
    
    let data = {
      min: min,
        max:max,
          style: that.data.styleVal,
            key: that.data.addressType,
              val: val,
                user_type: user_type,
                  adult: that.data.numberYes1,
                    children: that.data.numberYes2,
                    sort:'zonghe',
                    share:2,
                    type:["","","",""],
                    like: ["", "", ""],
                    page:1
    };
    wx.setStorage({
      key: "searchData",
      data: data
    })
   
    wx.navigateTo({
      url: '../searchEnd/searchEnd',
    })
  },

  //点击合作须知
  noticeShadowTap:function(){
let that =this;
that.setData({
  noticeShadowShow:true
})
  },
  //隐藏合作须知
  noticeShadowHideTap:function(){
    let that = this;
    that.setData({
      noticeShadowShow: false
    })
  },
  //点击登记房屋
  checkHomeTap:function(){
    wx.navigateTo({
      url: '../homeRegister/homeRegister',
    })
  },
  //获取验证码
  gainCodeTap: function () {
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
          console.log(res)
          that.timer();
        }
      })
     
    } else {
      return;
    }
  },
  yesTapCh:function(){
    let that = this;
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.photoNumber)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
      })
    } else if (that.data.codeNumber.match(/^[ ]*$/)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的验证码',
      })
    }else{
      wx.request({
        url: "https://www.suitius.com/tp5/public/phoneCode",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method:"POST",
        data:{
          id: that.data.userInfo.user_id,
          phone: that.data.photoNumber,
          verify: that.data.codeNumber
        },
        success: function (res) {
          console.log(res)
          if(res.data.code){
            that.setData({
                ownerFirstShow: false,
                Rentin: false,
                landlord: true
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.info,
            })
          }
          that.setData({
            //showArticleList: res.data
          });
        }
      })
    }

  },
  timer: function () {
    let that = this;
    wx.setStorageSync('sultCodeTime', 60)
    let value = wx.getStorageSync('sultCodeTime') || 60;
    if (value > 0) {
      that.setData({
        codeText: value + 's',
        photoTap: false
      })
    }
    var timer = setInterval(function () {
      if (value > 0) {
        value--;
        that.setData({
          codeText: value + 's',
          photoTap: false
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
  photoInput: function (e) {
    let that = this;
    this.setData({
      photoNumber: e.detail.value
    })
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.photoNumber)) {
      this.setData({
        photoTap: false
      })
    } else {
      this.setData({
        photoTap: true
      })
    }

  },
  codeInput: function (e) {
    this.setData({
      codeNumber: e.detail.value
    })
  },
  //点击阴影消失
  hidenTipTap: function () {
    let that = this;
    that.setData({
      ownerFirstShow: false
    })
  },
  homeMainTap:function(){
    wx.navigateTo({
      url: '../myHome/myHome',
    })
  },
  auditStatusTap: function () {
    wx.navigateTo({
      url: '../auditStatus/auditStatus',
    })
  },
  onShow:function(){
    let that = this;
   // console.log(1111)
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        });
        that.indexJiekou1()
      }
    })
  }
})
