import {MyFetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      collectList:[],
      delFlag:false,/**定义变量控制删除ICon是否显示 */
      lock:false,/**定义一个锁解决长按触发 */
      isLoading: false,/**控制加载页 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ delFlag:false})
    this.getData();

  },
  /**
   * 获取收藏书籍的函数
   */
  getData()
  {
    this.setData({
      isLoading: true,
    })
    MyFetch.get("/collection").then(res=>{
      this.setData({
        collectList:res.data,
        isLoading: false,
      });
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 定义跳转功能
   */
  jumpBook(e)
  {  
    if (this.data.lock)
    { 
     this.setData({ lock: false });
     return;
    }
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 定义长按事件
   */
  longTap()
  { 
    this.setData({ lock: true });/**将锁打开 执行顺序是 longtap-tap */
    this.setData({
      delFlag:true,
    });
  },
  /**
   * 点击删除除事件
   */
  delIConTap(e)
  {
    let booKId =e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let that=this;/**保存当前的this对象 */
    wx.showModal({
      title: '提示：',
      content: '确定要删除吗？',
      success:function(res)
      {
        if(res.confirm)
        {
          that.getDelplus(booKId, index);

        }else if(res.cancel)
        {
          that.setData({
            delFlag:false,
          });
        }
      }
    })
  },
/**
* 定义删除函数
*/
getDelplus(id,index)
{
  let newCollectList=[];
  MyFetch.delete(`/collection/${id}`).then(res => {
  for(let i = 0; i < this.data.collectList.length;i++)
  {
    if(i==index){
    }else
    {
      newCollectList.push(this.data.collectList[i]);
    } 
  }
    this.setData({
      collectList: newCollectList,
    });
  }).catch(err => {
    console.log(err);
  })
}
})