import { MyFetch, updateTime} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     readList:[],
    isLoading: false,/**控制加载页 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getReadList();
  },
  /**
   * 获取读过的书籍
   */
  getReadList()
  { 
    this.setData({
      isLoading:true,
    })
    MyFetch.get("/readList").then(res =>{
    let precent="";  
    let Data=res.data;
    for(let i=0;i<Data.length;i++)
    {
      let a = Data[i].title.index+1;
      let b = Data[i].title.total ;
      precent=(a/b)*100;
      Data[i].precent = precent.toFixed(1);/**给数据添加属性 保留一位小数 */
     let strTime = updateTime(Data[i].updatedTime);
      Data[i].newDate = strTime;
    }
      console.log(Data);
     this.setData({
       readList: Data,
       isLoading: false,
     });
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 定义继续阅读函数
   */
  jumpBookDetail(e)
  { 
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${e.currentTarget.dataset.id}&bookID=${e.currentTarget.dataset.bookid}&index=${e.currentTarget.dataset.index}`,
    })
  },
  /**
   * 定义查看书籍
   */
  jumpBook(e)
  {
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id}`,
    })
  }
})