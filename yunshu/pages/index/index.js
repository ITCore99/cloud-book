//轮播图数据请求
const app = getApp();
import {
  MyFetch, login, updateTime
} from "../../utils/util.js";
Page({
  data: {
    swiperData: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    previousMargin: 0,
    nextMargin: 0,
    catalogList: [],
    isLoading: false,/**控制加载页 */
    hasMore: true,/**判断服务器是否有数据 */
    pn: 1,/**数据库的页数 */
    loadDone:false,/**定义骶部到尽头的显示 */
    initTest:false,/**定义骶部整个view显示*/
    
  },
  onLoad: function() {
    login();
    Promise.all([this.getData(true), this.getDataCatalog()]).then
    (res=>{
        this.setData({
          initTest:true,
        });
    });
  },
  /**
   * 获取轮播图数据
   */
  getData(flag) {
    if (flag) {
      this.setData({
        isLoading: true,
      });
    }
    return new Promise((resolve, reject) => {
      MyFetch.get("/swiper").then(res => {
        resolve();
        this.setData({
          swiperData: res.data
        });
      }).catch(err => {
        reject();
        console.log(err);
        this.setData({
          isLoading: false,
        });
      })
    });
  },
  /**
   * 获取目录列表数据
   */
  getDataCatalog() {
    return new Promise((resolve, reject) => {
      MyFetch.get("/category/books").then(res => {
        let newcatalogList=res.data;
        for (let i = 0; i < newcatalogList.length;i++)
        {
          for (let j = 0; j < newcatalogList[i].books.length;j++)
          {
            let str = updateTime(newcatalogList[i].books[j].updateTime);
            newcatalogList[i].books[j].NewDate = str;
          }
        }
        resolve();
        this.setData({
          catalogList: newcatalogList,
          isLoading: false,
        });
      }).catch(err => {
        reject();
        console.log(err);
        this.setData({
          isLoading: false,
        });
      })
    })
  },
  /**
   * 定义点击事件
   */
  jumpBook(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/book/book?id=${id}`,
    })
  },
  /**
   * 定义数据完全加载完函数
   */
  getAllData() {
    return Promise.all([this.getData(false), this.getDataCatalog()])
  },
  /**
   * 下拉刷新函数
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading(); /**设置导航栏加载动画 */
    this.setData({
      hasMore:true,
      loadDone: false,    
      pn:1,
       
    });
    this.getAllData().then(res => {
      wx.hideNavigationBarLoading(); /**关闭导航栏加载动画 */
      wx.stopPullDownRefresh(); /**关闭刷新 */
    })
  },
  /**
   * 定义加载更多函数
   */
  getMoreContent() {
    return new Promise((resolve, reject) => {
      console.log(this.data.pn);
      MyFetch.get("/category/books",{pn:this.data.pn}).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  /**
   * 上拉加载函数
   */
  onReachBottom()
   {
    if (this.data.hasMore) 
    {
       this.setData({
          pn: this.data.pn + 1,
        });
        this.getMoreContent().then(res => {
         console.log(res);
        /**进行拼接数据 */
        let NewContent = [...this.data.catalogList, ...res.data];
        /**判断服务器是否有数据 */
        if (res.data.length < 2) {
            this.setData({
              hasMore: false,
              loadDone:true,
            });
          } 
        this.setData({
          catalogList: NewContent,
        });
      })
    }
  }
})