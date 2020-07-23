// pages/detail/detail.js
let datas = require('../../datas/list-data')
// console.log(datas.list_data)
let appDatas = getApp()
console.log(appDatas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: 0,
    isCollected: false,
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    this.setData({
      detailObj: datas.list_data[index],
      index
    })

    // 获取storage中得值并赋值
    let obj = wx.getStorageSync('isCollected')
    if(!obj){
      wx.setStorageSync('isCollected', {});
    }else {
      let isCollected = obj[index]? true: false;
      this.setData({
        isCollected
      })
    }

    // 音乐播放
    let au = wx.getBackgroundAudioManager();
    au.onPlay(()=>{
      console.log('音乐播放')
      this.setData({
        isPlay: true
      })
      appDatas.data.isPlayMusic = true
      appDatas.data.pageIndex = index
    })

    // 判断音乐是否在播放
    if(appDatas.isPlayMusic && appDatas.pageIndex === index){
      this.setData({
        isPlayMusic: true
      })
    }

    // 音乐暂停
    au.onPause(() => {
      console.log('音乐暂停')
      this.setData({
        isPlay: false
      })
      appDatas.data.isPlayMusic = false
    })
  },
  handleCollection() {
    let isCollected = !this.data.isCollected

    //更新时提示
    let title = isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success'
    })

    wx.getStorage({
      key: 'isCollected',
      success: (res) => {
        console.log(res.data)
        res.data[this.data.index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: res.data
        })
      }
    })
    this.setData({
      isCollected
    })

  },
  musicControl(){
    let isPlay = !this.data.isPlay;
    let {dataUrl, title} = this.data.detailObj.music;
    let au = wx.getBackgroundAudioManager();
    if(isPlay){

      au.title = title
      au.src = dataUrl
      au.play()
    }else {
      au.pause()
    }
    this.setData({isPlay})
  },
  handleShare(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
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