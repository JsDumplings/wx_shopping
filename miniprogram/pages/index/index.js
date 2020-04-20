//index.js
const app = getApp()

Page({
  data: {
    swiperImgUrls:[], //swiper滚动的图片
    marquee_content:'这是一个推送走马灯',
    typeTabContents:[
      {
        img:'../../images/man.jpg',
        name:'上身',
        // type:'man',
        classify:'clothes'
      },
      {
        img: '../../images/woman.jpg',
        name: '下身',
        // type:'woman',
        classify:'pants'
      },
      {
        img: '../../images/new.jpg',
        name: '长裙',
        // newStyle:'1',
        classify:'skirt'
      }
    ],
    tweetData:[
      {
        src:'../../images/tweet1.jpg',
        name:'女装',
        type:'woman'
      },
      {
        src: '../../images/tweet2.jpg',
        name: '男装',
        type:'man'
      }
    ],
    recommendData:[], //推荐商品数据
    more:'block'
  },

  onLoad: function() {

    wx.showShareMenu({
      withShareTicket: true
    })

    //调用云函数

    //查询swiper图片
    wx.cloud.callFunction({
      name:'searchData'
    }).then(res=>{
      console.log('res', res)
      this.setData({
        swiperImgUrls: res.result.data
      })
    })

    // 查询推荐商品
    wx.cloud.callFunction({
      name: 'recommendData'
    }).then(res => {
      console.log('res1', res.result.data)
      this.setData({
        recommendData: res.result.data
      })
    })
  },
  location:()=>{
    console.log('位置页面未完成')
  },
  search:()=>{
    console.log('搜索页面未完成')
  },
  /*productList:(event)=>{
    wx.navigateTo({
      url: '../../pages/productList/productList?classify=' + event.currentTarget.dataset.classify,
      success: function (res) {console.log('7777')},
      fail: function (res) { console.log('88',res)},
      complete: function (res) {},
    })
  },*/
  toCommodity: (event) => {
    wx.navigateTo({
      url: "../../pages/commodity/commodity?id=" + event.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    // console.log(event.currentTarget.dataset.id + '商品详情页面未完成')
  },

  //查询更多商品
  onReachBottom:function(){
    const db = wx.cloud.database()
    db.collection('commodity').limit(10).get().then(res =>{
      console.log('点击',res)
      this.setData({
        recommendData: res.data,
        more:'none'
      })
    })
  }
})
