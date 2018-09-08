import {MyFetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookID:"",
      catalogData:[],
      isLoading:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookID:options.id,
    });
    this.getData();
  },
  /**
   * 获取目录数据
   */
  getData()
  { 
    this.setData({
      isLoading:true,
    })
    MyFetch.get(`/titles/${this.data.bookID}`).then(res=>{
     this.setData({
       catalogData:res.data,
       isLoading: false,
     });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      })
    })
  },
  /**
   * 定义跳转函数
   */
  JumpDetail(e)
  {
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${id}&bookID=${this.data.bookID}&index=${e.currentTarget.dataset.index}`,
    });
   }

})