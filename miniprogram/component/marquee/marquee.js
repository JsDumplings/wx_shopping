// component/marquee/marquee.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueePace:1,
    marqueeDistance:0,
    interval:30,
    size:14,
    animation:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _marquee:function(){
      var _this = this
      var timer = setInterval(function(){
        if (_this.data.marqueeDistance < -_this.data.length) {
          clearInterval(timer)
          _this.setData({
            marqueeDistance:_this.data.windowWidth
          })
          _this._marquee()
        }else{
          _this.setData({
            marqueeDistance:_this.data.marqueeDistance - _this.data.marqueePace
          })
        }
      },_this.data.interval)
    },
  },

  // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  ready:function(){
    var _this = this
    this.setData({
      length: _this.data.text.length * _this.data.size, //文字的长度
      windowWidth:(wx.getSystemInfoSync().windowWidth - 20) * 0.85 //字体父级的宽度
    })
    _this._marquee()
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.version)
      },
    })
  }
})
