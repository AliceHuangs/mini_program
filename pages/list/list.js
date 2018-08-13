// pages/list/list.js

let datas = require("../../datas/list-data.js");
console.log(datas, typeof datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listArr:datas.list_data
    })
  
  },
  //点击对应list跳转到detail详情页
  toDetail (event) {
    console.log(event);
    //获取点击跳转对应的下标
    let index = event.currentTarget.dataset.index;



    //！！注意区别：1.wx.navigateTo({})保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。2. wx.redirectTo({})关闭当前页面，跳转到应用内的某个页面。

    wx.navigateTo({
      url: '/pages/detail/detail?index='+index,
    })

    // wx.redirectTo({
    //   url: '/pages/detail/detail',
    // })
    
  },

//点击轮播图跳转到

  carouselToDetail (event) {
/*这里涉及的传参数问题，这里不能够在代理事件者身上传， <swiper catchtap='carouselToDetail'  indicator-dots indicator-color='blueviolet' indicator-active-color='blue'>，也就是说不能够通过像前面绑定	<view catchtap='toDetail' data-index="{{index}}">通过data-index="{{index}}"的方式去传递参数Index。因为这里是通过父元素事件代理他子元素，而要获取的是点击的子元素的信息，那么就不能够通过data-index="xx"的方式去传递参数，若在父元素data-aa="bb"，那么不管点击那个轮播图的哪一张都是同样的bb的值，确定不来点击的是那张图片。2.因此，这里需要把data-index设置在全部的image身上，由于数量少，可以这样写。3.这里要搞清楚真正除服事件的是谁，是子元素image，在事件委托中可以通过event.target找到事件的触发者，事件绑定是在父元素swiper身上。而前面绑定	<view catchtap='toDetail' data-index="{{index}}">，事件的绑定和事件的触发都是在业务逻辑目的元素身上，所以点击的元素就是本身，直接在本身上传递数据，直接是通过current.target访问,也就说current.target指向的是当前元素（捕获事件的元素）。event.target指向的是触发事件的元素。*/

    console.log(event);

    let index = event.target.dataset.index

    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
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
    console.log("页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面卸载");
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