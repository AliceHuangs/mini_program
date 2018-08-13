// pages/detail/detail.js
let datas = require("../../datas/list-data.js");//获取数据之后，页面要使用数据是从当前面页面的data中去获得，因此去data中间数据初始化
console.log(datas);
//5.11
let appDatas = getApp();//5.11.1 返回值是个初始化的data对象（就是前面在app.js中注册小程序的文件中data数据里面初始化的哪些属性data:{ isPlay: false, pageIndex: null, moviesArr: Array(0) }）。此时需要考虑的是什么时候应该去读取这些数据？
console.log(appDatas, typeof appDatas);//5.11.2


Page({

  /**
   * 页面的初始数据
   */
  data: {//初始化数据
    //页面要使用数据是从当前面页面的data中去获得
    detailObj:{},
    index:null,//
    isCollected:false,//初始化显示为置灰，没有收藏
    isMusicPlay: false,//5.1初始化显示为标识是否打开背景音乐
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);/*当list以 wx.navigateTo({
      url: '/pages/detail/detail?index='+index,
    })传参数过来的时候，这里打印出来的options就是当前点击的list目的元素的index,也就是url: '/pages/detail/detail?index='+index,里面的index，并且以对象的形式将获得的传过来的参数存起来。{index: "0"}。2.当url: '/pages/detail/detail'这样没有传参过来的时候，这里打印结果就是个空对象{} 。因此在此处可以直接获取参数值index，获得下标之后可以通过对应的下标去获取datas中 list_data数组中对应的下标的对象数据，先求引入模块datas*/
    //获取参数值
    let index = options.index;

    //更新data中的detailObj状态
    this.setData({
      detailObj:datas.list_data[index],
      index
    });//此时去点击一下list去查看调试工具的AppData(可以看到	detailObj		{15}和index:0证明可以拿到对应的数据)，此时比可以把detail.wxml页面写成动态页面，面上图片是在实际开发中是不会把图片放在本地的而是放到数据库中部署在服务器上
    
    //3.根据本地缓存的数据判断用户是否收藏当前的文章、

    //3.1使用同步读取，先去本地缓存读取一些数据，wx.getStorageSync(KEY)从本地缓存中同步获取指定 key 对应的内容。这同步读取的方法没有回调函数也就是说会返回一个值，在是使用的时候，可以通过声明一个变量去把值存储起来
    let detailStorage = wx.getStorageSync("isCollected");

    console.log(detailStorage);//{0:true,3:true}//3.1.2这个数据是一进来（页面一加载）就可以拿到的加载的数据，不需要通过点击事件触发

 //4.解决方法，最后完整的收藏功能完成
 //将获得的本地的缓存的数据读取判断是否为空
    if (!detailStorage){//如果为空就进入
    //在缓存中初始化空对象(使用同步)
      wx.setStorageSync("isCollected", {})
  //重新操作一次前面一次的操作，首次点击进入之后产生一个空对象，随后点击收藏便可以看到收藏的缓存数据通过Storage查看

 }




    //3.2拿到数据（根据本地缓存的数据判断用户是否收藏当前的文章的数据）之后，根据当前页面的index

    //3.3判断用户是否收藏
    if (detailStorage[index]) {//3.5 为true证明收藏过当前这篇文章
      //3.4 detailStorage[index]的值有3种情况：1.true，2.false,3. undefined(当第一次点击进来，之前从来没有点击过的时候，也就是{}对象里面没有元素，没有缓存内容的时候，)，也就是说，不管是undefined还是false都可以判断用户没有收藏这篇文章，

      this.setData({//3.6解决当前存在的问题之后，点击清理缓存，可以看到当将数据缓存清空之后，保存之后再点击编译，点击进去到详情页面，点击收藏按钮，发现界面显示的隐藏和显示（置灰和高亮是正常的），但是查看Storage的时候看不到缓存的数据，在console中可以看到打印出来一个空白行是由console.log(detailStorage);3.1.2打印出来结果的，也就是一上来如果没有收藏的话，这里就是一个空数组,这是问题之后所致，还有一个根本很重要的致因子，在缓存数据到本地里面 wx.getStorage读取数据的成功回调函数读取的data为空，那么当点击的时候还想从中获取读取数据（此时缓存中并没有缓存到数据），是不可能的还想通过 obj[index] = isCollected;将其党最哦哦对象去操作。中，也就是，所以一上来就应该 先判断是否有数据，解决方式看4 所示
      isCollected:true
    })



    }

    //5.9 实现对背景音乐的监视并且同步更新背景音乐的

    // 5.9.1监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放');
      // 修改isMusicPlay状态值
      this.setData({
        isMusicPlay: true
      });

      // 修改appDatas中额数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;

    });

    // 判断音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      // 修改isMusicPlay状态值
      this.setData({
        isMusicPlay: true
      });
    }


    // 监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      // 修改isMusicPlay状态值
      this.setData({
        isMusicPlay: false
      });

      // 修改appDatas中额数据
      appDatas.data.isPlay = false;
      // appDatas.data.pageIndex = index;
    })



  },

  handleCollection () {
    //获取当前状态数据并且
    let isCollected = !this.data.isCollected;
    //更新数据状态
    this.setData({
      isCollected

    });

    //提示用户
    //这里是根据收藏的状态去决定显示的文本的内容是什么
    let title = isCollected?"收藏成功":"取消成功";
    wx.showToast({
      title,
      icon:"success"
    });

    //缓存数据到本地(调试工具，通过Storage去查看缓存数据)
    //wx.setStorage({})这个里面的data应该是个对象{key是下标：value是boolean值}，也就是{1:true,2:false}

    //获取index
    let {index} = this.data;
    //1.1声明一个空对象去存储（在方式1中出现的效果是，当切换其他的界面的详情的时候，出现的效果是，当切换到第二个界面的时候，上一个界面的缓存的转态数据消失，二此时的缓存的状态数据是当前页面的，也就是说前面的会被后面的页面的数据所覆盖掉，也正是因为初始值的给对象初始化为空对象造成的这个只保存一组状态数据的结果。而我们应该做到的是在上一个页面的状态保存的前提下，再去保存下一个要切换到的页面的状态的数据（前面一个页面的状态数据依然保存在对象中，也就是后面哟啊保存的数据不会去覆盖掉前面的数据），去看方式2中的解决方法。）

    //不可行的,会覆盖掉之前的状态
    // let obj = {};//{0:true,2:true}

//2.1 这里此时obj应该去本地存取中去读取一次数据状态，（因为刚才这里是使用异步获取wx.setStorage(OBJECT)的因此这里读取wx.getStorage(OBJECT)也应该是异步）
    wx.getStorage({
      key: "isCollected",//2.2.2这里的key值必须和wx.setStorage(OBJECT)中的ke值保存一致，也就是要与2.2.1的key值一样
      //成功回调函数，获取本地缓存中数据
      success: (datas) => {//2.3
        console.log(datas,typeof datas); 
        //2.4获取数据之后，要给obj赋值，执行（由于是异步的，如果）

//2.5将这部分逻辑代码放在wx.getStorage({})里面的成功回调函数里面，保证数据的获取，由于异步的读取，如果放在他外面，不一定可以读取到数据 //这里实现到原始数据的读取和当前数据的获取，成功缓存状态数据，那么应该在什么时候显示当回退的之后欧在此点击进入之后，收藏状态回到上一次最后退出前的状态（也就是保存的状态）的显示，应该在何时显示何处写这个代码，何时？最好是在当页面刚刚渲染的同时去进行也就是在生命周期的的onLoad 生命周期函数--监听页面加载这个阶段的时候较好看3.所示
        //2.3
        //2.5.1在读取的成功回调函数里面保证能够获取数据，
        let obj = datas.data;// {0:true,1:true}

        //1.2给这个对象添加属性index。，当要给一个对象添加一个属性这个属性时候一个变量的时候，应该如何添加？对象[变量]= xxx;
        obj[index] = isCollected;

        wx.setStorage({
          key: "isCollected",//2.2.1
          // data:xx,//这个data的数据应该如何
          // data: isCollected,
          /*这个data的数据应该如何设置？当是收藏的状态的值时候，会出现这种情况，当点击的和回退之后再次进入点击的都是同一个页面详情的时候，这个data的写法是可以达到效果，但是当回退之后再次点击进入的是另外一个页面的详情的的时候在此显示的初始状态和点金的新页面的收藏的初始状态不一定想符合，因为缓存中保留只是上一个界面详情收藏上的最后一个状态，而新点击进去的界面的转态并没有用保存在，也就是说没有考虑到多个页面缓存的情况，在设置data属性的属性值的时候，此时就是多个页面共用一个状态去显示收藏的状态值。因此处理需要收藏状态的标示值之外还需要一个标识是哪个页面的数据，也就是index，我们需要存储的是每个页面的收藏状态的，需要在data中初始化数据index:null，和 isCollected:false 。*/
          data: obj,//1.3
          success: () => {
            console.log("缓存成功。。。");
          }

        });


      }

    })
    // //2.3
    // let obj = {};

    // //1.2给这个对象添加属性index。，当要给一个对象添加一个属性这个属性时候一个变量的时候，应该如何添加？对象[变量]= xxx;
    // obj[index] = isCollected;

    // wx.setStorage({
    //   key:"isCollected",//2.2.1
    //   // data:xx,//这个data的数据应该如何
    //   // data: isCollected,
    //   /*这个data的数据应该如何设置？当是收藏的状态的值时候，会出现这种情况，当点击的和回退之后再次进入点击的都是同一个页面详情的时候，这个data的写法是可以达到效果，但是当回退之后再次点击进入的是另外一个页面的详情的的时候在此显示的初始状态和点金的新页面的收藏的初始状态不一定想符合，因为缓存中保留只是上一个界面详情收藏上的最后一个状态，而新点击进去的界面的转态并没有用保存在，也就是说没有考虑到多个页面缓存的情况，在设置data属性的属性值的时候，此时就是多个页面共用一个状态去显示收藏的状态值。因此处理需要收藏状态的标示值之外还需要一个标识是哪个页面的数据，也就是index，我们需要存储的是每个页面的收藏状态的，需要在data中初始化数据index:null，和 isCollected:false 。*/
    //   data:obj,//1.3
    //   success:() => {
    //     console.log("缓存成功。。。");
    //   }

    // });



  },

  //5.4声明绑定点击事件的函数，处理音乐播放（这里需要做到的是通过绑定点击事件的声明的函数处理音乐的播放或暂停：当点击轮播图位置上图片上面的暂停或播放的图标的时候，点击开始，那么在背景音乐播放的时候，点击Lbt位置的暂停按钮可以暂停，同时背景音乐界面也显示暂停，也就是lbt上面的停放是可以被背景音乐的界面处监视得到并且同步状态（值5.8可以执行完成的功能），但是当背景音乐的关闭或打开的时候，是lbt处监视不到并且不能够同步更新状态的情况，这里需要我们去通过去实现5.9处实现对背景音乐的监视并且同步更新背景音乐的。此时要哦解决一个问题是应该在何时进行监听？因为用户会在一看到这个播放按钮图标的时候就有可能去点击，那么应该在此时之前去监听，也就是说在onload生命周期函数去监听，越早越好）
  handleMusicPlay() {
    // 5.5 处理音乐播放(显示的播放或暂停的图标，点击可以正常切换)
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });


    //5.6 控制音乐播放
    if (isMusicPlay) {
      //5.7 播放音乐
      let { dataUrl, title } = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      //5.8 暂停音乐
      wx.pauseBackgroundAudio()
    }

  },

  //6.处理点击分享功能

  handleShare() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到qq空间', '分享到微博'
      ]
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