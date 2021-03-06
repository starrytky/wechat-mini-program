// pages/index01/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcome: '开启小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    // } else if(this.data.canIUse){
      //由于 getUserInfo 是网络请求，可能会在Page.onLoad之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.userInfoReadyCallback = res => {
      //   this.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      // }
    } else {
      // 在没有 open-type=getUserInfo 版本兼容处理
      wx.getUserInfo({
        success: res => {
          // app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          }) 
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handlehello(){
    wx.switchTab({
      url: '/pages/list/list',
    })
  }
})