// pages/amendHome/amendHome.js
var animation;
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
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    // areaText: "",//面积
    // plotText: "",//小区
    // addessText: "",//详细地址
    adultText:"",//成人数量
    childText: "",//儿童数量
    moneyText:"",//租金
    textareaVal:"",//房屋介绍
    arrayCity: ["待租", "已租"],
    budgetLitter: ["押一", "押二", "押三"],
    budgetbig: ["付一", "付二", "付三"],
    styleFishs: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    linkOnline:[3,5,10,"不限"],
    relationArr: ["00", "30"],
    cityYes: "待租",//待租状态*
    budgetMinrYes: "押一",//押一*
    budgetMaxrYes: "付一",//付一*
    styleFishYes1: "08",//预约时间小时小*
    styleFishYes2: "00",//预约时间分钟小*
    relationYes1: "22",//预约时间小时大*
    relationYes2: "00",//预约时间分钟大*
    linkOnlineYes: '不限',//预约人数上限(userMax)
    cityVal: 0,//选择状态索引
    budgetMinVal: 0,//押一
    budgetMaxVal: 0,//付一
    styleVal1: 0,//预约时间小时小
    styleVal2: 0,//预约时间分钟小
    relationVal1: 14,//预约时间小时大
    relationVal2: 0,//预约时间小时大
    linkOnlineVal: 3,//预约人数上限
    activeShow: 0,//0状态，1押一,2付一，3预约时间小,4预约时间大,5最大预约人数
    addressMenuIsShow: false,
    array1: [0],//对应的是每个选择框的value
    array2: [0],//押金方式
    array3: [0],
    array4: [0, 0],
    array5: [99, 0],
    array6: [3],//预约人数上限
    petIndex:0,//0,是，1否
    rentingIndex:0,//0整租，1合租2,皆可
    facilitiesArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//设施顺序排列0未选中，1选中
    typeArray: [0, 0, 0, 0, 0],//租客类型顺序排列0未选中，1选中
    homeArr:[],
    optionsId:0

  },
  //提交修改
  submitTap: function () {
    let that = this;
//    let  data={
//      dataSum: {
//        'rent': that.data.moneyText, 'status': that.data.cityVal, 'pet': that.data.petIndex, 'share': that.data.rentingIndex, 'children': that.data.childText, 'adult': that.data.adultText, "describes": that.data.textareaVal},
//      id: that.data.optionsId,       
//           pay_way: [that.data.budgetMinVal, that.data.budgetMaxVal],//0~3 
//                 user_type: { "single": that.data.typeArray[0], "couple": that.data.typeArray[1], "family": that.data.typeArray[2], "friend": that.data.typeArray[3], "user_other": that.data.typeArray[3] },
//   visit_time: [that.data.styleVal1, that.data.styleVal2, that.data.relationVal1, that.data.relationVal2],
//   fitment: { "kongt": that.data.facilitiesArr[0], "tv": that.data.facilitiesArr[1], "cupboard": that.data.facilitiesArr[2], "washer": that.data.facilitiesArr[3], "fridge": that.data.facilitiesArr[4], "water": that.data.facilitiesArr[5], "bed": that.data.facilitiesArr[6], "sofa": that.data.facilitiesArr[7], "desk": that.data.facilitiesArr[8], "hearth": that.data.facilitiesArr[9], "cooker": that.data.facilitiesArr[10], "chair": that.data.facilitiesArr[11], "bedstand": that.data.facilitiesArr[12], "mattres": that.data.facilitiesArr[13], "wifi": that.data.facilitiesArr[14], "locker": that.data.facilitiesArr[15], "balcony": that.data.facilitiesArr[16], "toilet": that.data.facilitiesArr[17], "garden": that.data.facilitiesArr[18], }
// };
  //  console.log(that.data.rentingIndex)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/changeHouse',
      method: "POST",
      data:{
        dataSum: {
          'rent': that.data.moneyText, 'status': that.data.cityVal, 'pet': that.data.petIndex, 'share': that.data.rentingIndex, 'children': that.data.childText, 'adult': that.data.adultText, "describes": that.data.textareaVal, "pledges": this.data.budgetMinrYes + this.data.budgetMaxrYes, "orderTimeMin": this.data.styleFishYes1 + ':' + this.data.styleFishYes2, "orderTimeMax": this.data.relationYes1 + ":" + this.data.relationYes2, "userMax": this.data.linkOnlineYes == "不限" ? 0 : this.data.linkOnlineYes
        },
        id: that.data.optionsId,
        pay_way: {0:that.data.budgetMinVal, 1:that.data.budgetMaxVal},//0~3 
        user_type: { "single": that.data.typeArray[0], "couple": that.data.typeArray[1], "family": that.data.typeArray[2], "friend": that.data.typeArray[3], "user_other": that.data.typeArray[3] },
        visit_time: {0:that.data.styleVal1, 1:that.data.styleVal2, 2:that.data.relationVal1, 3:that.data.relationVal2},
        fitment: { "kongt": that.data.facilitiesArr[0], "tv": that.data.facilitiesArr[1], "cupboard": that.data.facilitiesArr[2], "washer": that.data.facilitiesArr[3], "fridge": that.data.facilitiesArr[4], "water": that.data.facilitiesArr[5], "bed": that.data.facilitiesArr[6], "sofa": that.data.facilitiesArr[7], "desk": that.data.facilitiesArr[8], "hearth": that.data.facilitiesArr[9], "cooker": that.data.facilitiesArr[10], "chair": that.data.facilitiesArr[11], "bedstand": that.data.facilitiesArr[12], "mattres": that.data.facilitiesArr[13], "wifi": that.data.facilitiesArr[14], "locker": that.data.facilitiesArr[15], "balcony": that.data.facilitiesArr[16], "toilet": that.data.facilitiesArr[17], "garden": that.data.facilitiesArr[18], }
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) { 
        console.log(res)

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
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      optionsId: options.id,
    })
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    this.animation = animation;
    this.onLoadXq(options.id)
  },
  //获取详情的基本信息
  onLoadXq:function(id){
    let that = this;
    wx.request({
      url: "https://www.suitius.com/tp5/public/houseDetail",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: id
      },
      success: function (res) {
        console.log(res)
        let budgetMinrYes = parseInt(res.data.pay_way.slice(0, 1));
        let budgetMaxrYes = parseInt(res.data.pay_way.slice(1, 2));
        let styleVal1 = parseInt(res.data.visit_time.slice(0, 1));
        let styleVal2 = parseInt(res.data.visit_time.slice(1, 2));
        let relationVal1 = parseInt(res.data.visit_time.slice(2, 3));
        let relationVal2 = parseInt(res.data.visit_time.slice(3, 4));
        let linkOnlineYes = res.data.userMax == 0 ? "不限" : res.data.userMax;
        let array6;
         if (res.data.userMax == 3){
          array6 = [0]; 
        } else if (res.data.userMax == 5) {
          array6 = [1];
        } else if (res.data.userMax == 10){
          array6 = [2];
        } else{
          array6 = [3];
        } 
        that.setData({
          homeArr: res.data,
          moneyText: res.data.rent,
          budgetMinrYes: that.data.budgetLitter[budgetMinrYes],
          budgetMaxrYes: that.data.budgetbig[budgetMaxrYes],
          budgetMinVal: budgetMinrYes,
          budgetMaxVal: budgetMaxrYes,
          array2: [budgetMinrYes],
          array3: [budgetMaxrYes],
          petIndex: res.data.pet,
          rentingIndex: res.data.share,
          cityVal: res.data.status,
          array1: [res.data.status],
          cityYes: that.data.arrayCity[res.data.status],
          typeArray: [res.data.user_type.single, res.data.user_type.couple, res.data.user_type.family, res.data.user_type.friend, res.data.user_type.user_other],
          styleVal1: styleVal1,
          styleVal2: styleVal2,
          relationVal1: relationVal1,
          relationVal2: relationVal2,
          array4: [styleVal1, styleVal2],
          array5: [relationVal1, relationVal2],
          styleFishYes1: that.data.styleFishs[styleVal1],
          styleFishYes2: that.data.relationArr[styleVal2],
          relationYes1: that.data.styleFishs[relationVal1],
          relationYes2: that.data.relationArr[relationVal2],
          facilitiesArr: [res.data.fitment.kongt, res.data.fitment.tv, res.data.fitment.cupboard, res.data.fitment.washer, res.data.fitment.fridge, res.data.fitment.water, res.data.fitment.bed, res.data.fitment.sofa, res.data.fitment.desk, res.data.fitment.hearth, res.data.fitment.cooker, res.data.fitment.chair, res.data.fitment.bedstand, res.data.fitment.mattres, res.data.fitment.wifi, res.data.fitment.locker, res.data.fitment.balcony, res.data.fitment.toilet, res.data.fitment.garden],
          textareaVal: res.data.describes,
          adultText: res.data.adult,
          childText: res.data.children,
          linkOnlineYes: linkOnlineYes,
          array6: array6
        });
      
      }
    })
  },
  //预览图片
  swiperImgTap: function (e) {
    let that = this;
    // console.log(that.data.homeArr.img);
    let arrImg = [];
    for (let i = 0; i < that.data.homeArr.img.length; i++) {
      arrImg.push(that.data.homeArr.img[i])
    }
    wx.previewImage({
      current: arrImg[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: arrImg // 需要预览的图片http链接列表
    })
  },
  //成人数量
  adultInput:function(e){
   this.setData({
     adultText: e.detail.value
    })
  },
  //儿童数量
  childInput: function (e) {
    this.setData({
      childText: e.detail.value
    })
  },
  // //面积
  // areaInput: function (e) {
  //   this.setData({
  //     areaText: e.detail.value
  //   })
  // },
  // //小区名称
  // plotInput: function (e) {
  //   this.setData({
  //     plotText: e.detail.value
  //   })
  // },
  // //详细地址
  // addessInput: function (e) {
  //   this.setData({
  //     addessText: e.detail.value
  //   })
  // },
  //租金
  moneyInput: function (e) {
    console.log(e)
    this.setData({
      moneyText: e.detail.value
    })
  }, 
  //房屋介绍框事件
  textareaInput: function (e) {
    this.setData({
      textareaVal: e.detail.value
    })
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
  //点击待租城市
  leftSelectTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 0
    })
    that.startAddressAnimation(true)
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击选择确定按钮
  citySure: function (e) {
    let that = this;
    if (that.data.activeShow == 0) {
      that.setData({
        cityYes: that.data.arrayCity[that.data.cityVal],
        array1: [that.data.cityVal],
      });

    } else if (that.data.activeShow == 1) {//预算小
      that.setData({
        budgetMinrYes: that.data.budgetLitter[that.data.budgetMinVal],
        array2: [that.data.budgetMinVal],
      });

    } else if (that.data.activeShow == 2) {//预算大
      that.setData({
        budgetMaxrYes: that.data.budgetbig[that.data.budgetMaxVal],
        array3: [that.data.budgetMaxVal],
      });

    } else if (that.data.activeShow == 3) {
      var array4 = [];
      array4.push(that.data.styleVal1);
      array4.push(that.data.styleVal2);
      that.setData({
        styleFishYes1: that.data.styleFishs[that.data.styleVal1],
        styleFishYes2: that.data.relationArr[that.data.styleVal2],
        array4: array4
      });

    } else if (that.data.activeShow == 4) {
      var array5 = [];
      array5.push(that.data.relationVal1);
      array5.push(that.data.relationVal2);
      that.setData({
        relationYes1: that.data.styleFishs[that.data.relationVal1],
        relationYes2: that.data.relationArr[that.data.relationVal2],
        array5: array5
      });
 
    } else if (that.data.activeShow == 5) {
      var array6 = [];
      array6.push(that.data.linkOnlineVal);
      that.setData({
        linkOnlineYes: that.data.linkOnline[that.data.linkOnlineVal],
        array6: array6
      });
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
    let val1 = e.detail.value[1];
    if (that.data.activeShow == 0) {
      that.setData({
        cityVal: val
      })
    } else if (that.data.activeShow == 1) {
      that.setData({
        budgetMinVal: val
      })
    } else if (that.data.activeShow == 2) {
      that.setData({
        budgetMaxVal: val
      })
    } else if (that.data.activeShow == 3) {
      that.setData({
        styleVal1: val,
        styleVal2: val1
      })
    } else if (that.data.activeShow == 4) {
      that.setData({
        relationVal1: val,
        relationVal2: val1
      })
    } else if (that.data.activeShow == 5) {
      that.setData({
       linkOnlineVal: val
      })
    }

  },
  //点击用户沟通上限
  linkOnlineTap:function(){
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 5
    })
    that.startAddressAnimation(true)
  },
  //点击押一
  selectYaTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 1
    })
    that.startAddressAnimation(true)
  },
  //点击付一
  selectfuTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 2
    })
    that.startAddressAnimation(true)
  },
  //点击预约时间小
  timeMinTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 3
    })
    that.startAddressAnimation(true)
  },
  //点击预约时间大
  timeMaxTap: function () {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.setData({
      activeShow: 4
    })
    that.startAddressAnimation(true)
  },

//点击选是否有宠物
  petWhatTap:function(e){
    this.setData({
      petIndex: e.target.dataset.index
    })
  },
  
  //点击选是否有整租
  rentingWhatTap:function(e) {
    this.setData({
      rentingIndex: e.target.dataset.index
    })
  },

  //点击设施选中
  facilitiesTap:function(e){
      let that = this;
      var facilitiesArr = that.data.facilitiesArr;
      if (facilitiesArr[e.target.dataset.index] == 1){
        facilitiesArr[e.target.dataset.index] = 0;
      }else{
        facilitiesArr[e.target.dataset.index] = 1;
      }
      that.setData({
        facilitiesArr: facilitiesArr
      })
  },
  //点击选择租客类型
  typeScreetTap:function(e){
    let that = this;
    var typeArray = that.data.typeArray;
    if (typeArray[e.target.dataset.index] == 1) {
      typeArray[e.target.dataset.index] = 0;
    } else {
      typeArray[e.target.dataset.index] = 1;
    }
    that.setData({
      typeArray: typeArray
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