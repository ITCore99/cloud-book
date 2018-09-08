import { MyFetch, updateTime} from "../../utils/util.js"
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
      let newbookContent = res;
      let NewDate =updateTime(res.data.updateTime);
      newbookContent.NewDate = NewDate;
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
  },
  /**
   * 定义添加收藏的函数
   */
  addCollect()
  {
    MyFetch.post("/collection",{bookId:this.data.bookID}).
    then(res=>{
      if(res.code==200)
      {
        wx.showToast({
          title: '收藏成功',
          icon: "success"
        })
      }
      let obj = this.data.bookContent
      Object.assign(obj,{ isCollect:1});
      this.setData({
        bookContent: obj, 
      })
    }).catch(err=>{
     wx.showToast({
       title: '发生未知错误',
       icon:"none"
     })
      console.log(err);
    })
  },
  /**
   * 分享的函数
   *
   */
  onShareAppMessage:function()
  { 
    return{
      title:this.data.bookContent.data.title,
      path:`/pages/book/book? id=${this.data.bookID}`,
      imgeUrl:"this.data.bookContent.data.img"
    }
  }

 
})