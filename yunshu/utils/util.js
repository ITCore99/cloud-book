//初始化域名
const basename ="https://m.yaojunrong.com/";
//封装请求函数
const MyFetch={
  http(url,method){
    return new Promise((reslove,reject)=>{
      wx.request({
        url: basename+url,
        method,
        //dataType: JSON, 添加此属性返回回来的数据是字符串一会查
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          reslove(res.data);//会将请求完的数据默认命名为data
        },
        fail(err)
        {
          reject(err);
        }
      })
    });
  },
  get(url)
  {
    return this.http(url,"GET");
  }
}
exports.MyFetch = MyFetch;