//轮播图数据请求
const app = getApp();
import {MyFetch} from "../../utils/util.js";
Page({
  data: {
    swiperData:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    previousMargin:0,
    nextMargin:0,
    catalogList:[],
    isLoading:false,/**控制加载页 */
  },
  onLoad: function () {
  
    this.getData();
    this.getDataCatalog();
  },
  /**
   * 获取轮播图数据
   */
  getData()
  {
    this.setData({
      isLoading: true,
    });
    MyFetch.get("/swiper").then(res=>{
     this.setData({
       swiperData:res.data
     });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 获取目录列表数据
   */
  getDataCatalog()
  {
    MyFetch.get("/category/books").then(res=>{
      this.setData({
        catalogList: res.data,
        isLoading:false,
      });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 定义点击事件
   */
  jumpBook(e)
  { 
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/book/book?id=${id}`,
    })
  }
})
