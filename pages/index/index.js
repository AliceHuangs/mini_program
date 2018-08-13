// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'黑加仑子',
    userInfo:{},
    isShow:true,
  
  },
  handleClick() {
    // 点击跳转到list页面
    wx.navigateTo({
      url: '/pages/list/list'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //做一些初始化工作，发送请求，开启定时器
    console.log(this);
    this.getUserInfo();
      
    },

    getUserInfo(){
      //判断用户是否授权
      wx.getSetting({
        success: (data) => {
          if (data.authSetting['scope.userInfo']) {
            //用户已经授权，更新data中的isShow
            this.setData({
              isShow: false
            })

          } else {
            //用户未授权，更新data中的isShow
            this.setData({
              isShow: true
            })
          }

        }

      })

      //获取用户登录信息
      wx.getUserInfo({
        success: (data) => {
          console.log(data);
          //更新data中的userInfo
          this.setData({
            userInfo: data.userInfo
          })
        },
        fail: () => {
          console.log('获取用户信息失败');
        }
      })
    },

  handleGetUserInfo(data) {
    console.log('用户点击了', data);
    // 判断用户点击的是否是允许
    if (data.detail.rawData) {
      // 用户点击的是允许
      this.getUserInfo();
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