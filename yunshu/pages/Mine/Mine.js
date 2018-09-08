import {MyFetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:"",
    isLoading: false,/**控制加载页 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      isLoading: true,
    });
     wx.getUserInfo({
       success:(data)=>
       {
         this.setData({
           userInfo: data.userInfo
         })
         this.setData({
           isLoading: false
         });
       }
     });
    this.getData();
  },
  /**
   * 获取收藏书籍数目
   */
  getData()
  {
    MyFetch.get("/collection/total").then(res=>{
         this.setData({
           collectNum:res.data,
         });
    })
  },
  /**
   * 定义跳转
   * 
   */
  jumpCollect()
  {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  /**
   * 定义UNdo函数
   */
  UNDO()
  {
    wx.showToast({
      title: '程序员正在努力开荒中.....',
      duration:2000,
      mask: false,
      icon: "none",
    });
  },
  onShow: function () {
    this.getData();
  },
  onShareAppMessage: function () {
  
  }
})