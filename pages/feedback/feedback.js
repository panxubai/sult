// pages/feedback/feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: true, //是否显示左上角图标
      title: 'SUIT-意见反馈', //导航栏 中间的标题
    },
    height: app.globalData.height + 44, 
    userInfo: {},
    rentingIndex: 1,//1产品建议，2功能3,其他
    tempFilePaths: [],//房屋图片
    sectionInput:"",//意见
    phoneEmalInput:"",//联系方式
    serverImg:[]
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
  },
  //点击选是问题类型
  rentingWhatTap: function (e) {
    this.setData({
      rentingIndex: e.target.dataset.index
    })
  },
  //点击删除
  tapaa: function (e) {
    console.log(e.currentTarget.dataset.index);
    var arr = this.data.tempFilePaths;
    arr.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      tempFilePaths: arr
    })
  },
  //点击拍照房屋
  tapPhoto: function () {
    let that = this;
    wx.chooseImage({
      count: 5, 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var arra = that.data.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
<<<<<<< HEAD
          if (res.tempFiles[i].size <= 2000000) {
            var arrs = arra.push(tempFilePaths[i])
          } else {
            wx.showToast({
              title: '上传图片不能大于2M!',  //标题
              icon: 'none'       //图标 none不使用图标，详情看官方文档
            })
          }
          
=======
          var arrs = arra.push(tempFilePaths[i])
>>>>>>> d45642134ce9ca2e58d911eaee66668059754bfb
        }
        that.setData({
          tempFilePaths: arra,
        })

      }
    })
  },
  //意见
  sectionInput:function(e){
      this.setData({
        sectionInput: e.detail.value
      })
  }, 
  //联系方式
  phoneEmalInput: function (e) {
    this.setData({
      phoneEmalInput: e.detail.value
    })
  },
  btnSumBoxTap:function(){
    let that = this;
    if (that.data.sectionInput == ""){
      wx.showToast({
        title: '请填写意见哦',
        icon: 'none',
        duration: 1000,
        mask: true
      })

    }else if (that.data.tempFilePaths.length == 0){
      that.sumSHUju();
    }else{
      for (let i = 0; i < that.data.tempFilePaths.length; i++) {
        that.phptoJiekou(i);
      }
    }
    
  },
  phptoJiekou: function (i) {
    let that = this;
   // console.log(that.data.tempFilePaths[i])
    wx.uploadFile({
      url: 'https://www.suitius.com/tp5/public/upload',
      filePath: that.data.tempFilePaths[i],
      name: 'feedback',
      formData: {
        'user': 'test'
      },
      success: function (res) {
       // console.log(res);
        let serverImg = that.data.serverImg;
        serverImg.push(res.data)
        that.setData({
          serverImg: serverImg
        })
        that.sumSHUju()
      }
    })

  },
  sumSHUju:function(){
    let that = this;
    if (that.data.serverImg.length == that.data.tempFilePaths.length) {
      wx.request({
        url: "https://www.suitius.com/tp5/public/feedBack",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        data: {
          user_id: that.data.userInfo.user_id,
          contact: that.data.phoneEmalInput,
          image: that.data.serverImg,
          type: that.data.rentingIndex,
          suggest: that.data.sectionInput,
        },
        success: function (res) {
          console.log(res)
          if (res.data.code) {
            wx.showToast({
              title: '反馈成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack();
            }, 1000);
          } else {
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
    }else{
      return;
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