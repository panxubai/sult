// pages/discussion/discussion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-行程详情', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
        selectShow:true,//选择完成后的显示，隐藏
        questionShow:false,//拒绝弹出层
        showNumber:1,//1a,2b,3c
        numberSect:1,//1待处理，2同意，3拒绝
        userInfo: {},//获取用户姓名和头像
        id: 0,
        visit_id: 0,
        status: 0, 
        dataArr: [],
        scrollTop: 0,
        array: [],//聊天内容
        mainInput: "",
        scrollHeight: 0,
        timer: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
<<<<<<< HEAD
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
=======
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
    console.log(options);
    let addressId = options.id.split("-");
    this.setData({
      id: addressId[0],
      visit_id: addressId[1],
      status: addressId[2],
    })
    //获取用户信息
    wx.getStorage({
      key: 'sultOpenId',
      success: function (res) {
        // console.log(res)
        that.setData({
          userInfo: res.data
        });
        that.dataArrs();
      }
    })
    this.scrollHeight();
  },
  //控制聊天室的高度
  scrollHeight: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        var query = wx.createSelectorQuery()
        query.select('.fdEndBox').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res1) {
          var query = wx.createSelectorQuery()
          query.select('.inputBox').boundingClientRect()
          query.selectViewport().scrollOffset()
          query.exec(function (res2) {
            var query = wx.createSelectorQuery()
            query.select('.visitTime').boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec(function (res3) {
              that.setData({
                scrollHeight: res.windowHeight - res1[0].height - res2[0].height - res3[0].height
              })
            })
          })
        })
      }
    });

  },
  dataArrs() {
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visitInfo',
      data: {
        house_id: that.data.id,
        visit_id: that.data.visit_id,
        status: that.data.status,
        user_id: that.data.userInfo.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       // console.log(res)
        if (that.data.dataArr.length == 0) {
          that.setData({
            dataArr: res.data,
            array: res.data.comment,
            scrollTop: 200 * res.data.comment.length
          });
        }else{
          that.setData({
            dataArr: res.data,
            array: res.data.comment
          });
        }
<<<<<<< HEAD
        wx.hideLoading()
=======
        
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        clearInterval(that.data.timer)
        that.setTimeOut();
      }
    })
  },

  //轮训请求
  setTimeOut: function () {
    let that = this;
    that.setData({
      timer: setTimeout(function () {
        that.dataArrs()
      }, 5000)
    })

  },
  // dataArr1() {
  //   let that = this;
  //   wx.request({
  //     url: 'https://www.suitius.com/tp5/public/visitInfo',
  //     data: {
  //       house_id: that.data.id,
  //       visit_id: that.data.visit_id,
  //       status: that.data.status,
  //       user_id: that.data.userInfo.user_id
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
  //         dataArr: res.data,
  //         array: res.data.comment,
  //         scrollTop: 200 * res.data.comment.length
  //       });
  //     }
  //   })
  // },
  //一件发送手机号
  phoneFsTap:function(){
    let that = this;
  //  console.log(that.data.dataArr)
    wx.request({
      url: 'https://www.suitius.com/tp5/public/visitMsg',
      data: {
        visit_id: that.data.visit_id,
        user_id: that.data.userInfo.user_id,
        msg:"手机号："+ that.data.dataArr.phone
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
       // console.log(res);
        if (res.data.code) {
          let data = {
            user_id: that.data.userInfo.user_id,
            msg: "手机号：" + that.data.dataArr.phone,
            head: that.data.userInfo.data.avatar,
            name: that.data.userInfo.data.name,
          };
          let scrollTop = that.data.scrollTop + 100;
          let array = that.data.array;
          if (array == ""){
            array = [];
          }
          array.push(data);
          that.setData({
            array: array,
            scrollTop: scrollTop,
            mainInput: ""
          });

        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'succes',
            duration: 1000,
            mask: true
          });
        }


      }
    })
  },
  //点击拒绝
  refuseTap:function(){
    let that = this;
    that.setData({
      questionShow: true,
    })
    this.scrollHeight();
  },
  //点击同意
  consentTap: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要接受到访吗',
      success: function (res) {
        if (res.confirm) {
          that.abcdef();
          
        } else {
          console.log('用户点击取消')
        }

      }
    })
   
  },
  abcdef:function(){
    let that = this;
    wx.request({
      url: 'https://www.suitius.com/tp5/public/agree?visit_id=' + that.data.visit_id + '&reason=',
      data: {
        // visit_id: that.data.visit_id,
        //  reason: ""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        // that.dataArr1();
        wx.showToast({
          title: res.data.info,
          icon: 'succes',
          duration: 1000,
          mask: true
        });
        that.setData({
          selectShow: false,
          status: res.data.status,
        })
        that.scrollHeight();
      }
    })
  },
  //点击拒绝原因确定
  yesTapCh:function(){
    let that = this;
    let showNumber;
    if (that.data.showNumber == 1){
      showNumber ="房子已经租出去了"
    } else if (that.data.showNumber == 2){
      showNumber = "预约的时间不可行"
    }else{
      showNumber = "其他原因"
    }
    wx.request({
      url: 'https://www.suitius.com/tp5/public/agree',
      data: {
        visit_id: that.data.visit_id,
        reason: showNumber
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        // that.setData({
        //   selectShow: false,
        //   questionShow: false,
        //   numberSect: 3
        // });
        wx.showToast({
          title: res.data.info,
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '../myVisit/myVisit'
          })
        },1000)
      }
    })

    
  },
  //发送的内容
  mainInput: function (e) {
    let that = this;
    that.setData({
      mainInput: e.detail.value
    })
  },
  //发送消息
  sendTap: function () {

    let that = this;
   // console.log(that.data.userInfo)
    if (that.data.status != 2 ) {
      wx.showModal({
        title: '提示',
        content: '同意后才能留言哦',
      })
    }else if (that.data.mainInput == '' || that.data.mainInput.match(/^[ ]*$/)) {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
    } else {
      wx.request({
        url: 'https://www.suitius.com/tp5/public/visitMsg',
        data: {
          visit_id: that.data.visit_id,
          user_id: that.data.userInfo.user_id,
          msg: that.data.mainInput
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
         // console.log(res);
          if (res.data.code) {
            let data = {
              user_id: that.data.userInfo.user_id,
              msg: that.data.mainInput,
              head: that.data.userInfo.data.avatar,
              name: that.data.userInfo.data.name,
            };
            let scrollTop = that.data.scrollTop + 100;
            let array = that.data.array;
            array.push(data);
            that.setData({
              array: array,
              scrollTop: scrollTop,
              mainInput: ""
            });

          } else {
            wx.showToast({
              title: res.data.info,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
          }


        }
      })

    }

  },
  homeDetailTap: function (e) {
    wx.navigateTo({
      url: '../homeDetail/homeDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //点击阴影和差号
  hidenTipTap:function(){
    let that = this;
    that.setData({
      questionShow: false,
    })
  },
  //点击选项
  elsectTap:function(e){
    let that = this;
    that.setData({
      showNumber: e.currentTarget.dataset.index
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
    clearInterval(this.data.timer)
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