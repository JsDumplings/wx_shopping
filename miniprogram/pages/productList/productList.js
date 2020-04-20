// pages/productList/productList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:'',
    tabClassifyIndex:'0',
    nowType:'',
    myShowModalDisplay:'none',//弹窗显示
    tabClassify:[{
        type: 'woman',
        type_name: '女装',
        type_detail: ['上身', '下身', '长裙'],
        type_EngDetail: ['clothes', 'pants', 'skirt']
      }], //tab分类内容
    sortContent: ['综合排序', '按价格由低到高排序','按价格由高到低排序'], //tab排序内容
    content:[], //展示内容数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.setNavigationBarTitle({
      title: '商品列表',
    })
    console.log('1',options)
    const db = wx.cloud.database()
    db.collection('commodity').where({
      classify: options.classify
    }).get().then(res => {
      //获取商品内容
      this.setData({
        content: res.data
      })
      console.log('z',this.data.content)
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

  // 点击tab，切换事件
  clickTab:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },

  // 点击分类下的子tab，控制样式
  clickTabClassify:function(e){
    console.log('b', e.currentTarget.dataset.index)
    this.setData({
      tabClassifyIndex: e.currentTarget.dataset.index
    })
  },
  
  // 隐藏tab的展开内容
  hiddenTabContent:function(){
    this.setData({
      tabIndex:''
    })
  },

  // 按条件查询需要的内容(分类)
  searchContent:function(e){
    const db = wx.cloud.database()
    db.collection('commodity').where({
      classify: e.currentTarget.dataset.classify
    }).get().then(res => {
      console.log('q',res.data)
      //获取商品内容
      this.setData({
        // 关闭tab
        tabIndex: '',
        content: res.data,
        nowType:e.currentTarget.dataset.classify
      })
    })
  },
  // 按条件查询需要的内容(排序)
  sortClick: function (e) {
    let that = this.data
    let index = e.currentTarget.dataset.index
    let sort = ''
    if (that.nowType) { //如果选了分类
      if(index === 0){
        const db = wx.cloud.database()
        db.collection('commodity').where({
          classify: that.nowType
        }).get().then(res => {
          this.setData({
            tabIndex: '',
            content: res.data
          })
        })
      }else{
        if (index === 1) {
          sort = 'asc' //升序
        } else if (index === 2) {
          sort = 'desc' //降序
        }
        const db = wx.cloud.database()
        db.collection('commodity').where({
          classify: that.nowType
        }).orderBy('price', sort).get().then(res => {
          this.setData({
            tabIndex: '',
            content: res.data
          })
        })
      }
    } else {  //如果没选分类
      if(index === 0){
        const db = wx.cloud.database()
        db.collection('commodity').get().then(res => {
          this.setData({
            tabIndex: '',
            content: res.data
          })
        })
      }else{
        if (index === 1) {
          sort = 'asc' //升序
        } else if (index === 2) {
          sort = 'desc' //降序
        }
        const db = wx.cloud.database()
        db.collection('commodity').orderBy('price', sort).get().then(res => {
          this.setData({
            tabIndex: '',
            content: res.data
          })
        })
      }
    }
  },

  //顶部查询功能
  searchFunc:function(e){
    let val = e.detail.value.searchInput
    const db = wx.cloud.database()
    db.collection('commodity').where({
      presentation:{
        $regex:'.*' + val,
        $options:'i'
      }
    }).get().then(res=>{
      this.setData({
        content: res.data
      })
    })
  },

  //转跳到商品详情页
  toCommodity:(event)=>{
    console.log('www', event)
    wx.navigateTo({
      url: '../../pages/commodity/commodity?id=' +event.currentTarget.dataset.id,
      success:(res)=>{},
      fail:(res)=>{},
      complete:(res)=>{}
    })
  }
})