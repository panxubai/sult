 // pages/homeDetail/homeDetail.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */
  data: { 
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-房源详情', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},//获取用户姓名和头像
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      iconPath: "../../resources/restImg/ic_map_sign.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 43
    }],
    tempFilePaths: [],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    showMap:true, //true显示地图
    tipsWindownMenuIsShow:false,//遮罩层true出现
    genderIndex:1,//1是男 ，0是女
    petIndex:0,//1是有 ，0是无
    ageLitterValue:'',//年龄小
    ageBigValue: '',//年龄小
    questionShow:false,//点击问号弹出层
    taolunzuShow:true,//控制选择讨论组成员的显示
    chumListWidth: 1280,//讨论组成员在一排显示宽度160*数据长度
    homeArray:[],//后台信息保存
    addressData:"",//房屋地址
    peopleArr:[],//选择讨论组成员的数组
    selectArr:[],//选择用户
    optionsId:0,
    panduanTlz:true,//true表示没有选择室友
    arrId:[],//用户选择的好友
    reportShow:false,//显示举报
    reportIndex:0,//显示选中的举报方案
    sectionInput:"",//意见存放处
    collectIndex:0,//收藏
  },
  //轮播显示当前页
  // swiperChange: function (e) {
  //   this.setData({
  //     swiperCurrent: e.detail.current + 1
  //   }) 
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //console.log(options.id)
  //地图显示房屋坐标
    
    //详情
   
    that.setData({
      optionsId: options.id
    })
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        })
        that.onLoadData(options.id);
      },
      fail: function () {
        that.onLoadData(options.id);
      }
    })
   
  },

    onLoadData:function(id){
      let that = this;
      wx.showLoading({
        title: '正在加载...',
        icon: 'loading',
        mask: true,
      })
     // console.log(that.data.userInfo.user_id ? that.data.userInfo.user_id : 0)
      wx.request({
        url: 'https://www.suitius.com/tp5/public/houseInfo',
        data: {
          id:id,
          userId: that.data.userInfo.user_id ? that.data.userInfo.user_id:0
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log(res)
        
          that.setData({
            homeArray: res.data,
            collectIndex: res.data.isCollected,
            addressData:'上海市'+ res.data.house_info.ward + res.data.house_info.road + res.data.house_info.village 
          })
          wx.hideLoading();
          that.coordinate();
         
        }
      })
    },



  //把地址转换成坐标显示在地图上
  coordinate:function(){
    let that = this; 
   //console.log(that.data.addressData)
    var qqmapsdk = new QQMapWX({
      key: 'PNZBZ-WVL3P-2PTDE-L4IXO-W7U3E-7SF2T' // 必填
    });
    // 调用接口
    qqmapsdk.geocoder({
      address: that.data.addressData,
      success: function (res) {
        //console.log(res);
        var markers = that.data.markers;
        markers[0].latitude = res.result.location.lat,
        markers[0].longitude = res.result.location.lng,
        that.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          markers: markers
        })
      //  console.log(that.data.markers)
      },
      fail: function (res) {
        console.log(res);
      },
    });

  },
  //预览图片
  swiperImgTap: function (e) {
    let that = this;
   // console.log(that.data.homeArray.house_img);
    let arrImg = [];
    for (let i = 0; i < that.data.homeArray.house_img.length;i++){
      arrImg.push(that.data.homeArray.house_img[i])
    }
    wx.previewImage({
      current: arrImg[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: arrImg // 需要预览的图片http链接列表
    })
   },
  //点击设定出现遮罩层
  showtapSd:function(){
    let that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })


        } else {
          //暂时关闭筛选室友功能  直接开启然后下面请求删除
          // that.setData({
          //   showMap: false,
          //   tipsWindownMenuIsShow: true
          // })
          wx.request({
            url: 'https://www.suitius.com/tp5/public/setting',
            data: {
              house_id: that.data.optionsId,
              user_id: that.data.userInfo.user_id
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              let arr = [];
               console.log(res)
              for (let i = 0; i < res.data.length; i++) {
                arr.push(0)
              }
              that.setData({
                peopleArr: res.data,
                selectArr: arr,
                taolunzuShow: false,
                chumListWidth: 160 * res.data.length
              });

            }
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
  //点击阴影消失
  hidenTipTap:function(){
    let that = this;
    that.setData({
      showMap: true,
      tipsWindownMenuIsShow: false,
      questionShow: false
    })
  },
  //点击提交
  jointBtnTap:function(){
    let that = this;
    let ageLitterValue;
    let ageBigValue;
    if (that.data.ageLitterValue == "" && that.data.ageBigValue == "" ){
      ageLitterValue = "";
      ageBigValue = "";
    }else if (that.data.ageLitterValue == "") {
      ageLitterValue = "";
      ageBigValue = that.data.ageBigValue;
    } else if (that.data.ageBigValue == "") {
      ageLitterValue = that.data.ageLitterValue;
      ageBigValue = "";
    }else if (that.data.ageLitterValue > that.data.ageBigValue) {
      ageLitterValue = that.data.ageBigValue;
      ageBigValue = that.data.ageLitterValue
    } else {
      ageLitterValue = that.data.ageLitterValue;
      ageBigValue = that.data.ageBigValue;
    }
   let data = {
      sex: that.data.genderIndex,
        ageMin: ageLitterValue,
          ageMax: ageBigValue,
            pet: that.data.petIndex
    };
   // console.log(data)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/setting',
      data: {
        sex: that.data.genderIndex,
        ageMin: ageLitterValue,
        ageMax: ageBigValue,
        pet: that.data.petIndex,
        user_id: that.data.userInfo.user_id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        let arr = [];
       // console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          arr.push(0)
        }
        that.setData({
          peopleArr: res.data,
          selectArr: arr,
          showMap: true,
          tipsWindownMenuIsShow: false,
          taolunzuShow:false,
          chumListWidth: 160 * res.data.length
        });
       
      }
    })
    // that.setData({
    //   showMap: true,
    //   tipsWindownMenuIsShow: false,
    //   taolunzuShow:false
    // })
  },
  //点击头像选人
  selsctPeopleTap:function(e){
    let that=this;
    console.log(e.currentTarget.dataset.index);
    let selectArr = that.data.selectArr;
    if (that.data.selectArr[e.currentTarget.dataset.index] != 0){
      selectArr[e.currentTarget.dataset.index] = 0
      that.setData({
        selectArr: selectArr
      })
      }else{
        selectArr[e.currentTarget.dataset.index] = e.currentTarget.dataset.id
          that.setData({
            selectArr: selectArr
          })
      }
    let arrId = [];
    for (let i = 0; i < that.data.selectArr.length; i++) {
      if (that.data.selectArr[i] != 0) {
        arrId.push(that.data.selectArr[i])
        that.setData({
          panduanTlz: false,
        })
      }
    }
    that.setData({
      arrId: arrId,
    })

  },
  //跳转讨论组
  discussionTap:function(){
    let that = this;
   // console.log(that.data.arrId)
    if (that.data.arrId.length == 0){
      wx.showModal({
        title: '提示',
        content: '请选择小伙伴哦',
      })
    } else if (that.data.arrId.length > 10){
      wx.showModal({
        title: '提示',
        content: '最多选择9个小伙伴哦',
      })
   }else{

      wx.request({
        url: 'https://www.suitius.com/tp5/public/creatDisc',
        data: {
          house_id: that.data.optionsId,
          user_id: that.data.userInfo.user_id,
          id: that.data.arrId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
        //  console.log(res);
          if(res.data.code){
            wx.showToast({
              title: res.data.info,
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
            wx.navigateTo({
              url: '../discussion/discussion?group_id=' + res.data.group_id,
          })
          }, 1000) 
          }else{
            wx.showToast({
              title: res.data.info,
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          }
          
          
        }
      })
   }
    
    
  },
  //选择男女
  genderTap:function(e){
    let that = this;
    if (that.data.genderIndex == e.currentTarget.dataset.index){
      return;
    }else{
      if (that.data.genderIndex == 0){
        that.setData({
          genderIndex: 1
        })
      }else{
        that.setData({
          genderIndex: 0
        })
      }  
    }
  },
  //选择是否有宠物
  petTap: function (e) {
    let that = this;
    if (that.data.petIndex == e.currentTarget.dataset.index) {
      return;
    } else {
      if (that.data.petIndex == 0) {
        that.setData({
          petIndex: 1
        })
      } else {
        that.setData({
          petIndex: 0
        })
      }
    }
  },
  //输入年龄小
  ageLitterInput:function(e){
    var that = this;
    that.setData({
      ageLitterValue:e.detail.value
    })
  },
  //输入年龄大
  ageBigInput: function (e) { 
    var that = this;
    that.setData({
      ageBigValue: e.detail.value
    })
  },
  //点击问号弹出层
  questionTap:function(){
    var that = this;
    that.setData({
      questionShow: true,
      showMap: false
    })
  },
  //点击知道了 和差号 关闭
  yesTapCh:function(){
    var that = this;
    that.setData({
      showMap: true,
      questionShow: false
    })
  },
  //跳转到联系业主页面
  relationTap:function(e){
    let that =this;
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
            url: '../relationFD/relationFD?id=' + e.currentTarget.dataset.id,
          })
        }
      },
      fail: function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
   
   // console.log(e.currentTarget.dataset.id)
   
  },
  //点击举报
  reportTapCh:function(){
    this.setData({
      reportShow: true,
      showMap:false
    })
  },
  //点击取消举报
  reportTap:function(){
    this.setData({
      reportShow: false,
      showMap: true
    })
  },
  //点击选择举报类型
  listTypeTap:function(e){
   // console.log(e.currentTarget.dataset.index)
    this.setData({
      reportIndex: e.currentTarget.dataset.index
    })
  },
  //意见
  sectionInput: function (e) {
    this.setData({
      sectionInput: e.detail.value
    })
  }, 
  //点击确定给后台传数据
  confirmRTap: function(){
    let that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          let reasons;
          if (that.data.reportIndex == 0){
            reasons = "房源信息有误"
          } else if (that.data.reportIndex == 1){
            reasons = "房源已出租"
          } else if (that.data.reportIndex == 2){
            reasons = "不是房东"
          }else{
            reasons = "其他"
          }
          //console.log(that.data.userInfo.user_id, that.data.optionsId, reasons, that.data.sectionInput)
          wx.request({
            url: "https://www.suitius.com/tp5/public/report",
            method: "POST",
            data: {
              userId: that.data.userInfo.user_id,
              houseId: that.data.optionsId,
              reasons: reasons,
              others: that.data.sectionInput
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
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
  //点击收藏
  collectTap:function(){
    let that = this;
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        //console.log(res)
        if (res.data == undefined) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          wx.request({
            url: "https://www.suitius.com/tp5/public/preference",
            data: {
              userId: that.data.userInfo.user_id,
              houseId: that.data.optionsId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              //console.log(res.data.message)
              if (that.data.collectIndex == 0) {
                that.setData({
                  collectIndex: 1
                })
              } else {
                that.setData({
                  collectIndex: 0
                })
              }
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
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
  tiaozhuans:function(){
    let that = this;
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: that.data.latitude,//要去的纬度-地址
      longitude: that.data.longitude,//要去的经度-地址
      name: that.data.homeArray.house_info.ward + "-" + that.data.homeArray.house_info.village,
      address: that.data.addressData
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
    // wx.getStorage({
    //   key: 'sultOpenId',
    //   success: function (res) {
    //     // console.log(res)
    //     that.setData({
    //       userInfo: res.data
    //     })
       
    //   },
    // })
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