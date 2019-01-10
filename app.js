//app.js
//整个项目的目录对应位置，index首页，searchs搜索页，mine个人中心，article文章详情，message消息中心，sultnews系统消息，searchEnd搜索结果页，homeRegister房屋登记，homeDetail房屋详情,questionnaire问卷调差，relationFD联系房东,personalDatag个人资料,discussion讨论组,journeyNews行程消息,journeyList行程列表,discussionList讨论组列表,routeChat行程详情,visitChat到访详情,myHome我的房屋,amendHome修改房屋,cardBag我的卡包,auditStatus审核状态,myVisit我的到访,sultSetting系统设置,asregards关于,feedback意见反馈
App({
  onLaunch: function (options) {
    //console.log(options)
    // 判断是否由分享进入小程序
    // if (options.scene == 1007 || options.scene == 1008) {
    //   this.globalData.share = true
    // } else {
    //   this.globalData.share = false
    // };
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
       // console.log(res)
        this.globalData.height = res.statusBarHeight
      }
    })

  },
  globalData: {
    share: false,  // 分享默认为false
    height: 0,
  },
  // marginH: function () {
  //   var query = wx.createSelectorQuery()
  //   query.select('.nav-capsule').boundingClientRect()
  //   query.selectViewport().scrollOffset()
  //   query.exec(function (res) {
  //     console.log(res)
  //   })
  // },
})