import {MyFetch} from "../../utils/util.js"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    catalogID:"",
    bookID:"",
    catalogName:"",
    BookContent:"",
    catalogData:[],
    isShow:false,/**通过变量控制目录与遮罩层的显示 */
    isLoading:false,/**控制加载页的实现 */
    index:"", /**记录当前的索引值 */
    font:40,/**设置字体默认的大小 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      catalogID: options.id, 
      bookID: options.bookID, 
    });
    this.getData();
    this.getCatalog();
  },
  /**
   * 获取内容数据
   */
  getData()
  { 
    this.setData({
      isLoading: true,
    });
    MyFetch.get(`/article/${this.data.catalogID}`).then(res=>{
      // let data = app.towxml.toJson(res.data.article.content,"markdown");
     this.setData({
       BookContent:res.data.article.content,
       catalogName:res.data.title,
       isLoading: false,
       index:res.data.article.index,
     });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 获取目录
   */
  getCatalog()
  { 
    this.setData({
      isLoading: true,
    });
    MyFetch.get(`/titles/${this.data.bookID}`).then(res => {
      this.setData({
        catalogData: res.data,
        isLoading: false,
      });
    }).catch(err => {
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 定义目录切换函数
   */
  toggleCatalog()
  {
    let isShow=!this.data.isShow;
    this.setData({
      isShow,
    });
  },
  /**
   * 定义目录点击函数
   */
  handGet(e)
  {
      let id=e.currentTarget.dataset.id;
      this.setData({
        catalogID:id,
     });
     this.getData(); //注意尽量应变量表示
  },
  /**
   * 定义前后翻页的函数
   */
  handerPage(e)
  {
    let index = this.data.index;
    if(e.currentTarget.dataset.id)
     {
       if (this.data.catalogData[index + 1]) {
         this.setData({
           catalogID: this.data.catalogData[index + 1]._id,
         });
         this.getData();
       } else {
         wx.showModal({
           title: '温馨提示：',
           content: '亲，已是最后一章了',
           showCancel: false,
         })
       }
     }else
     {
       if(this.data.catalogData[index-1])
       {
          this.setData({
            catalogID:this.data.catalogData[index-1]._id,
          });
          this.getData();
       }else
       {
         wx.showModal({
           title: '温馨提示：',
           content: '亲，已是第一章了',
           showCancel:false,
         })
       }
     }  
  },
  /**
   * 定义字体的缩放
   */
  fontChange(e)
  { 
    console.log(e);
    let font = this.data.font;
    if(e.currentTarget.dataset.flag)
    {
       this.setData({
         font:font+3,
       });
    }else
    {  
      if (font<32)
      {
        wx.showModal({
          title: '温馨提示：',
          content: '亲，字体太小会视力！',
          showCancel:false,
        })
      }else
      {
        this.setData({
          font: font-3,
        });
      }
    }
  }
})