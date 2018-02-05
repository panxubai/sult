//index.js
//获取应用实例
const app = getApp()
var animation
Page({
  data: {
    Rentin:true,//点击我要租房
    landlord:false,//切换房主
    arrayCity: ["上海", "北京", "广州", "深圳"],
    budgetLitter: ["不限", 2000, 3000, 4000],
    budgetbig: ["不限", 2000, 3000, 4000,5000,8000],
    styleFishs: ["不限"," 简装(无家具)", " 简装(有家具)", " 精装(无家具)", " 精装(有家具)", "豪华装"],
    relationArr:["单身","情侣","家庭","朋友"],
    numberArr1: [1,2,3,4,5,6],
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
    styleVal: 0,//选择装修
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
    iv:"",
    code:"",
    openId:''
  },
  //事件处理函数

  onLoad: function (options) {
    //调用获取用户openid
    this.sultOpenId();
    //请求文章列表
    this.articleList();
    //调取本地用户远的数据
   this.setStorageList();
  //首页地址栏传参
    if (options.addressId == undefined){
      this.setData({
        addressId: "您想住哪里",
      })
    }else{
      this.setData({
        addressId: options.addressId,
      })
    };
      // 初始化动画变量
    var animation = wx.createAnimation({
      duration:500,
      timingFunction: 'ease',
    });
    this.animation = animation;
  },
  //获取用户openid
sultOpenId:function(){
  let that = this;
  //判断本地有没有openid。是否是第一次进来
  wx.getStorage({
    key: 'sultOpenId',
    success: function (res) {
      that.setData({
        openId: res.data
      })
    },
    fail: function () {
      //不是第一次进来就授权，获取openid
      wx.getUserInfo({
        success: res => {
          that.setData({
            encryptedData: res.encryptedData,
            iv: res.iv
          })
          wx.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求 从后台获取openid
                that.setData({
                  code: res.code
                })
                wx.request({
                  url: 'https://www.suitius.com/tp5/public',
                  data: {
                    encryptedData: that.data.encryptedData,
                    iv: that.data.iv,
                    code: that.data.code
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    wx.setStorage({
                      key: "sultOpenId",
                      data: res.data.openId
                    });
                    that.setData({
                      openId: res.data.openId
                    })
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
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
       that.setData({
         Rentin: true,
         landlord: false
       })
  }, 
   //点击我是房东
  tapLandlord: function (e) {
    let that = this;
    that.setData({
      Rentin: false,
      landlord: true
    })
  },
  //点击跳到个人中心
  tapmine:function(){
      wx.navigateTo({
        url: '../mine/mine',
      })
  },

  //点击选择城市
  selectCity:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      budgetMinVal: 0,//选择预算小
      budgetMaxVal: 0,//选择预算大
      styleVal: 0,//选择装修
      relationVal: 0,//选择关系
      numberVal1: 0,//选择成人
      numberVal2: 0,//选择儿童
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
  // 点击地区选择确定按钮
  citySure: function (e) {
    let that = this;
    if (that.data.activeShow == 0) {
      that.setData({
        cityYes: that.data.arrayCity[that.data.cityVal]
      });
      wx.setStorage({
        key: "cityYes",
        data: that.data.arrayCity[that.data.cityVal]
      })
    } else if (that.data.activeShow == 1){
      that.setData({
        budgetMinrYes: that.data.budgetLitter[that.data.budgetMinVal]
      });
      wx.setStorage({
        key: "budgetMinrYes",
        data: that.data.budgetLitter[that.data.budgetMinVal]
      })
    } else if (that.data.activeShow == 2) {
      that.setData({
        budgetMaxrYes: that.data.budgetbig[that.data.budgetMaxVal]
      });
      wx.setStorage({
        key: "budgetMaxrYes",
        data: that.data.budgetbig[that.data.budgetMaxVal]
      })
    } else if (that.data.activeShow == 3) {
      that.setData({
        styleFishYes: that.data.styleFishs[that.data.styleVal]
      });
      wx.setStorage({
        key: "styleFishYes",
        data: that.data.styleFishs[that.data.styleVal]
      })
    } else if (that.data.activeShow == 4) {
      that.setData({
        relationYes: that.data.relationArr[that.data.relationVal]
      });
      wx.setStorage({
        key: "relationYes",
        data: that.data.relationArr[that.data.relationVal]
      })
    } else if (that.data.activeShow == 5) {
      that.setData({
        numberYes1: that.data.numberArr1[that.data.numberVal1]
      });
      wx.setStorage({
        key: "numberYes1",
        data: that.data.numberArr1[that.data.numberVal1]
      })
    } else if (that.data.activeShow == 6) {
      that.setData({
        numberYes2: that.data.numberArr2[that.data.numberVal2]
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
    console.log(e)
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
      cityVal: 0,//选择城市
      budgetMaxVal: 0,//选择预算大
      styleVal: 0,//选择装修
      relationVal: 0,//选择关系
      numberVal1: 0,//选择成人
      numberVal2: 0,//选择儿童
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
      cityVal: 0,//选择城市
      budgetMinVal: 0,//选择预算小
      styleVal: 0,//选择装修
      relationVal: 0,//选择关系
      numberVal1: 0,//选择成人
      numberVal2: 0,//选择儿童
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
      cityVal: 0,//选择城市
      budgetMinVal: 0,//选择预算小
      budgetMaxVal: 0,//选择预算大
      relationVal: 0,//选择关系
      numberVal1: 0,//选择成人
      numberVal2: 0,//选择儿童
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
      cityVal: 0,//选择城市
      budgetMinVal: 0,//选择预算小
      budgetMaxVal: 0,//选择预算大
      styleVal: 0,//选择装修
      numberVal1: 0,//选择成人
      numberVal2: 0,//选择儿童
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
      cityVal: 0,//选择城市
      budgetMinVal: 0,//选择预算小
      budgetMaxVal: 0,//选择预算大
      styleVal: 0,//选择装修
      relationVal: 0,//选择关系
      numberVal2: 0,//选择儿童
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
      cityVal: 0,//选择城市
      budgetMinVal: 0,//选择预算小
      budgetMaxVal: 0,//选择预算大
      styleVal: 0,//选择装修
      relationVal: 0,//选择关系
      numberVal1: 0,//选择成人
      activeShow: 6
    })
    that.startAddressAnimation(true)
  },
  //点击跳转到搜索
  searchPage:function(){
    wx.navigateTo({
      url: '../searchs/searchs',
    })
  },
  //点击文章进入详情页
  articleTap:function(e){
    wx.navigateTo({
      url: '../article/article?id='+e.currentTarget.dataset.id,
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
      
        that.setData({
          showArticleList: res.data
        });
        console.log(that.data.showArticleList);
      }
    })
  }
})
