//初始化域名
const basename ="https://m.yaojunrong.com/";
//封装请求函数
const MyFetch={
  http(url,method,data){
    return new Promise((reslove,reject)=>{
      let token=wx.getStorageSync("token");//取到token
      let header={ 'content-type': 'application/json',}
      if (token)
      {
        header.token=token; //将token设置到请求头中每一次请求时带上token
      }
      wx.request({
        url: basename+url,
        method,
        data,          /**注意是使用data进行传递数据 */
        //dataType: JSON, 添加此属性返回回来的数据是字符串一会查
        header,
        success(res) {
          if(res.header.Token) //如果有token就将token保存起来
          {
            wx.setStorageSync("token", res.header.Token);
          }
          reslove(res.data);//会将请求完的数据默认命名为data
        },
        fail(err)
        {
          reject(err);
        }
      })
    });
  },
  get(url,data)
  {
    return this.http(url,"GET",data);
  },
  post(url,data)
  {
    return this.http(url,"post",data)
  },
  delete(url, data) {
    return this.http(url, "DELETE", data);
  },
  
};
const login=()=>{
  wx.login({
    success(res){
      MyFetch.post("/login",{
        code:res.code,
        appid: "wx90d432fb8892a0e0",
        secret:"3dc253c951bced9cc5f0091cdf663a39"

      }).then(res=>{
        console.log(res);
      })
    }
  });
}
const updateTime = (t)=>{
  let nowTime = +new Date();
  let time = +new Date(t)
  let timeLag = Math.floor((nowTime - time) / 60000)
  let timeStr = ''
  if (timeLag < 1) {
    timeStr = '刚刚'
  } else if (timeLag >= 1 && timeLag < 60) {
    timeStr = timeLag + '分钟前'
  } else if (Math.floor(timeLag / 60) >= 1 && Math.floor(timeLag / 60) < 24) {
    timeStr = Math.floor(timeLag / 60) + '小时前'
  } else if (Math.floor(timeLag / 1440) >= 1 && Math.floor(timeLag / 1440) < 60) {
    timeStr = Math.floor(timeLag / 1440) + '天前'
  } else if (Math.floor(timeLag / 86400) >= 1 && Math.floor(timeLag / 86400) < 12) {
    timeStr = Math.floor(timeLag / 86400) + '月前'
  } else {
    timeStr = '很久'
  }
  return timeStr
}
exports.MyFetch = MyFetch;
exports.login=login;
exports.updateTime = updateTime;