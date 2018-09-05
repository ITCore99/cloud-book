import {MyFetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookID:"",
      bookContent:{},
      isLoading:false,
      isToggle: true,/**控制是否收起来 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookID:options.id,
    });
    this.getData()
  },
  /**
   *获取数据
   */
  getData(id)
  {
    this.setData({
      isLoading:true,
    });
    MyFetch.get(`/book/${this.data.bookID}`).then(res=>{
      this.setData({
        bookContent:res,
        isLoading: false,
      });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 跳转函数
   */
  JumpCatalog(e)
  {  
    console.log(e);
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookID}`,
    });
  },
  /**
   * 点击简介的展开与shouqi
   */
  toggle() {
    this.setData({
      isToggle: !this.data.isToggle,
    });
  }

})