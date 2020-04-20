// pages/commodity/commodity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:'1',
    shopInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    //通过id去取出该商品的信息
    const db = wx.cloud.database()
    console.log('1',options.id)
    db.collection('commodity').where({
      _id:options.id
    }).get().then(res=>{
      console.log('res1',res.data[0])
      this.setData({
        shopInfo:res.data[0]
      })
    })
    wx.setNavigationBarTitle({
      title:'商品详情'
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

  },

  toShop:function(e){
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  toComment: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
})