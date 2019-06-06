// pages/searchEnd/searchEnd.js
var animation;
const app = getApp();
Page({ 

  /**
   * 页面的初始数据 
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    addressEnd:"请输入地址地名关键字",
    soltMenuIsShow:false,//排序下面阴影
    screenMenuIsShow: false,//筛选下面阴影
    animationScreenMenu:{},//筛选动画
    animationSoltMenu: {},//排序动画
    sortArr: ["综合", "价格", "便利","舒适"],
    soltIndex:0,//选择排序下面的
    selectIndex:0,//排序和筛选变
    selectMain:"",//用户最后选择什么排序
    compositeArr1: ["整租", "合租", "不限"],
    compositeArr2: ["1500以下", "1500-2500", "2500-3500", "3500-4500", "4500-8000", "8000以上"],
    compositeArr3: ["简装", "精装", "毛坯", "不限"],
    compositeArr4: ["一室", "二室","三室","四室及以上"],
    compositeArr5: ["阳台", "智能锁", "花园"],
    soltIndex1:-1,//综合筛选
    soltIndex2: -1,//预算筛选
    soltIndex3: -1,//装修风格筛选
    soltIndex4: [-1,-1,-1,-1],//户型筛选
    soltIndex5: [-1, -1, -1, -1],//偏好筛选
    selectMain1: "",//用户最后选择筛选项综合
    selectMain2: "",//用户最后选择筛选项预算
    selectMain3: "",//用户最后选择筛选项装修风格
    selectMain4: ["", "", "", ""],//用户最后选择筛选项户型
    selectMain5: ["", "", ""],//用户最后选择筛选项偏好
    homeArray:[],//后台数据存放列表
    searchData:{},//给后台传参
    addressType:"",//类型
    showKong: false,//显示为空
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
   // console.log(options)
    if (options.addressId == undefined) {
      wx.getStorage({
        key: 'addressYes',
        success: function (res) {
          that.setData({
            addressEnd: res.data.text,
            addressType: res.data.type,
          });
        },
        fail: function () {
          that.setData({
            addressEnd: "请输入地址地名关键字",
          })
        }
      });
      that.quchu1();
    }else{
      let addressId = options.addressId.split("-");
      this.setData({
        addressEnd: addressId[0],
        addressType: addressId[1],
      });
      //重选地址
      that.quchu2();
    };
    
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    this.animation = animation;

  
  },

  quchu1:function(){
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        that.setData({
          searchData: res.data
        })
        that.onloadData();
      }
    })
  },
  //重新选择地址
  quchu2: function () {
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data; 
        datas.key = that.data.addressType;
        datas.val = that.data.addressEnd;
        that.setData({
          searchData: datas
        })
        that.onloadData();
      }
    })
  },
  //重新选择排序方式
  quchu3: function (sort) {
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        datas.sort = sort;
        that.setData({
          searchData: datas
        })
        that.onloadData();
      }
    })
  },
  //筛选处理选择排序方式
  quchu4: function () {
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        //综合
        if (that.data.soltIndex1 == -1){
          datas.share = 2;
        }else{
          datas.share = that.data.soltIndex1;
        };
        //价格
        if (that.data.soltIndex2 == -1){
          datas.min = 0;
          datas.max = 0;
        }else{
          if (that.data.soltIndex2 == 0 ) {
            datas.min = 0;
            datas.max = that.data.selectMain2.slice(0, 4);
          } else if (that.data.soltIndex2 == 5){
            datas.min = that.data.selectMain2.slice(0, 4);
            datas.max = 0;
          } else {
            let sortArr = that.data.selectMain2.split("-");
            datas.min = sortArr[0]
            datas.max = sortArr[1]
          }
        }
        //装修风格
        if (that.data.soltIndex3 == -1) {
          datas.style = 3;
        } else {
          datas.style = that.data.soltIndex3;
        };
        //户型
       // let selectMain4 = that.data.selectMain4;
        // if (selectMain4[0] == ""){
        //   selectMain4.splice(0, 1)
        // }
        // if (selectMain4[1] == "") {
        //   selectMain4.splice(1, 1)
        // }
        // if (selectMain4[2] == "") {
        //   selectMain4.splice(1, 1)
        // }
        // console.log(selectMain4.length)
        // for (let i = 0; i < selectMain4.length;i++){
        //   console.log(11111, i)
        //   if (selectMain4[i] == ""){
           
        //     selectMain4.splice(i,1)
        //   }
        // }
        datas.type = that.data.selectMain4;
        //偏好
        // let selectMain5 = that.data.selectMain5;
        // console.log(selectMain5.length)
        // for (let j = 0; j < selectMain5.length; j++) {
        //   console.log(22222, j)
        //   if (selectMain5[j] == "") {
        //     selectMain5.splice(j, 1)
        //   }
        // }
        datas.like = that.data.selectMain5;
        that.setData({
          searchData: datas
        })
        that.onloadData();
      }
    })
  },
  //条件不限
  quchu5: function (sort) {
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        datas.share = 2;
        datas.min = 0;
        datas.max = 0;
        datas.style = 3;
        datas.type = [];
        datas.like = [];
        that.setData({
          searchData: datas,
          soltIndex1: -1,//综合筛选
          soltIndex2: -1,//预算筛选
          soltIndex3: -1,//装修风格筛选
          soltIndex4: [-1, -1, -1, -1],//户型筛选
          soltIndex5: [-1, -1, -1, -1],//偏好筛选
          selectMain1: "",//用户最后选择筛选项综合
          selectMain2: "",//用户最后选择筛选项预算
          selectMain3: "",//用户最后选择筛选项装修风格
          selectMain4: ["", "", "", ""],//用户最后选择筛选项户型
          selectMain5: ["", "", ""],//用户最后选择筛选项偏好
        })
        that.onloadData();
      }
    })
  },
  //取消地址
  quchu6: function (sort) {
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        datas.key = "";
        datas.val = "";
        that.setData({
          searchData: datas,
        })
        
        that.onloadData();
      }
    })
  },
  onloadData:function(){
    let that =this;
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
  //  console.log(that.data.searchData)
     wx.request({
      url: "https://www.suitius.com/tp5/public/searchForm",
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: that.data.searchData,
      success: function (res) {
         console.log(res)
        // console.log(that.data.searchData);
        that.setData({
          homeArray: res.data,
          showKong: true
        });
        wx.setStorage({
          key: "searchData",
          data: that.data.searchData
        })
        wx.hideLoading()
      }
    })
  },
  //下拉加载专用通道
  onloadData1: function (index) {
    let that = this;
    //console.log(that.data.searchData)
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    //  console.log(that.data.searchData)
    wx.request({
      url: "https://www.suitius.com/tp5/public/searchForm",
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: that.data.searchData,
      success: function (res) {
       // console.log(res)
        if (index == 0){
          that.setData({
            homeArray: res.data,
            showKong: true
          });
        }else{
        
            let homeArray = that.data.homeArray;
            for (let i = 0; i < res.data.length; i++) {
              homeArray.push(res.data[i])
            }
            that.setData({
              homeArray: homeArray,
              showKong: true
            });
         
        }
        
        wx.setStorage({
          key: "searchData",
          data: that.data.searchData
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.length == 0){
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none',
            duration: 2000
          })
        }
       
      }
    })
  },
  //点击排序
  soltTap:function(){ 
    var that = this;
   
    if (that.data.soltMenuIsShow) {
      that.startSoltAnimation(false)
      that.setData({
        selectIndex: 0
      })
      return;
    }
    if (that.data.selectIndex == 0) {
      that.startSoltAnimation(true)
    } else if (that.data.selectIndex == 2) {
      that.startSoltAnimation(true);
      that.startScreenAnimation(false)
    }
    that.setData({
      selectIndex: 1
    })
  
  },
  //点击筛选
  screenTap:function(){
    var that = this;
    if (that.data.screenMenuIsShow) {
      that.startScreenAnimation(false)
      that.setData({
        selectIndex: 0
      })
      return
    }
    if (that.data.selectIndex == 0){
      that.startScreenAnimation(true)
    } else if (that.data.selectIndex == 1){
      that.startSoltAnimation(false);
      that.startScreenAnimation(true)
    }
    that.setData({
      selectIndex:2
    })
   
   
  },
  //点击阴影消失
  maskTap:function(){
    this.startSoltAnimation(false)
    this.setData({
      selectIndex: 0
    })
  },
  //点击筛选阴影
  maskTapScreen: function () {
    this.startScreenAnimation(false)
    this.setData({
      selectIndex: 0
    })
  },
  //筛选动画
  startScreenAnimation: function (isShow) {
    //console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.top(188 + 'rpx').step()
    } else {
      that.animation.top(-700 + 'rpx').step()
    }
    that.setData({
      animationScreenMenu: that.animation.export(),
      screenMenuIsShow: isShow,
    })
  },
  //排序动画
  startSoltAnimation: function (isShow) {
    //console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.top(188 + 'rpx').step()
    } else {
      that.animation.top(-300 + 'rpx').step()
    }
    that.setData({
      animationSoltMenu: that.animation.export(),
      soltMenuIsShow: isShow,
    })
  },
  //点击选择排序
  soltTapSure:function(e){
    let that = this;
    let sort ;
    that.setData({
      soltIndex: e.currentTarget.dataset.index,
      selectMain: e.currentTarget.dataset.mian,
      selectIndex: 0,
      homeArray:[],
      showKong: false
    })
    that.startSoltAnimation(false); 
    if (e.currentTarget.dataset.mian == "综合"){
      sort="zonghe"
      that.quchu3(sort);
    } else if (e.currentTarget.dataset.mian == "价格"){
      sort = "rent"
      that.quchu3(sort);
    } else if (e.currentTarget.dataset.mian == "便利") {
      sort = "easy"
      that.quchu3(sort);
    } else if (e.currentTarget.dataset.mian == "舒适") {
      sort = "suit"
      that.quchu3(sort);
    }
    
  },
  //点击差号取消地址搜索
  eliminateTap:function(){
    var that = this;
    wx.removeStorage({
      key: 'addressYes',
    });
    that.quchu6();
    that.setData({
      addressEnd: "请输入地址地名关键字"
    })
  },
  //点击综合筛选
  screenTapSure1:function(e){
   // console.log(e)
    let that = this;
    if (that.data.soltIndex1 == e.currentTarget.dataset.index) {
      that.setData({
        soltIndex1: -1,
        selectMain1: "",
      })
    } else {
      that.setData({
        soltIndex1: e.currentTarget.dataset.index,
        selectMain1: e.currentTarget.dataset.mian,
      })
    }
  },
  //点击预算筛选
  screenTapSure2: function (e) {
    let that = this;
    if (that.data.soltIndex2 == e.currentTarget.dataset.index) {
      that.setData({
        soltIndex2: -1,
        selectMain2: "",
      })
    }else{
      that.setData({
        soltIndex2: e.currentTarget.dataset.index,
        selectMain2: e.currentTarget.dataset.mian,
      })
    }
   
  },
  //点击装修筛选
  screenTapSure3: function (e) {
    let that = this;
    if (that.data.soltIndex3 == e.currentTarget.dataset.index){
      that.setData({
        soltIndex3: -1,
        selectMain3: "",
      })
    }else{
      that.setData({
        soltIndex3: e.currentTarget.dataset.index,
        selectMain3: e.currentTarget.dataset.mian,
      })
    }
   
  },
  //点击户型筛选
  screenTapSure4: function (e) {
    let that = this;

    let arr = that.data.soltIndex4;
    let arrMain = that.data.selectMain4;
    if (arr[e.currentTarget.dataset.index] == e.currentTarget.dataset.index){
      arr[e.currentTarget.dataset.index] = -1;
      arrMain[e.currentTarget.dataset.index] = "";
      that.setData({
        soltIndex4: arr,
        selectMain4: arrMain,
      })
    }else{
      arr[e.currentTarget.dataset.index] = e.currentTarget.dataset.index;
      arrMain[e.currentTarget.dataset.index] = '%' + e.currentTarget.dataset.mian +'%';
      that.setData({
        soltIndex4: arr,
        selectMain4: arrMain,
      })
    }
   
  },
  //点击偏好筛选
  screenTapSure5: function (e) {
    let that = this;
    let arr = that.data.soltIndex5;
    let arrMain = that.data.selectMain5;
    if (arr[e.currentTarget.dataset.index] == e.currentTarget.dataset.index){
      arr[e.currentTarget.dataset.index] = -1;
      arrMain[e.currentTarget.dataset.index] = "";
      that.setData({
        soltIndex5: arr,
        selectMain5: arrMain,
      })
    }else{
      arr[e.currentTarget.dataset.index] = e.currentTarget.dataset.index;
      if (e.currentTarget.dataset.mian == "阳台"){
        arrMain[e.currentTarget.dataset.index] = "balcony";
      } else if (e.currentTarget.dataset.mian == "智能锁"){
        arrMain[e.currentTarget.dataset.index] = "locker";
      } else if (e.currentTarget.dataset.mian == "花园") {
        arrMain[e.currentTarget.dataset.index] = "garden";
      }
     
      that.setData({
        soltIndex5: arr,
        selectMain5: arrMain,
      })
    }
    
  },
  //点击条件不限
  hidenUnlimited:function(){
    let that = this;
    that.quchu5();
    that.setData({
      selectIndex: 0
    })
    this.startScreenAnimation(false)
  },
    //点击确定
  showConfirm: function () {
    let that = this;
    that.quchu4();
    that.setData({
      selectIndex: 0
    })
    this.startScreenAnimation(false)
   // console.log(that.data.selectMain1)
  },
  //点击跳转到搜索
  searchPages: function () {
    wx.navigateTo({
      url: '../searchs/searchs?id=1',
    })
  },
  //跳转房源详情
  homeDetailTap: function (e) {
   // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../homeDetail/homeDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //  onPullDownRefresh: function () { 
  //    console.log("上啦")
  //   },
  // onReachBottom: function () {
  //   console.log("下拉")
  // },

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
    var that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        datas.page = 1;
        that.setData({
          searchData: datas
        })
        that.onloadData1(0);
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    wx.getStorage({
      key: 'searchData',
      success: function (res) {
        let datas = res.data;
        datas.page = datas.page+1;
        that.setData({
          searchData: datas
        })
        that.onloadData1(1);

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})