let ajaxTimes=0;
import Notify from '@vant/weapp/notify/notify';
export const request=(params)=>{

  let header={...params.header};
  if(wx.getStorageSync("token")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }

  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  const baseUrl="https://blueberrypie.cn";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success:(result)=>{
        if (result.data.code === 403) {
          Notify({ type: 'danger', message: result.data.msg });
        }
        resolve(result.data);
      },
      fail:(err)=>{
        var message;
        console.log(err);
        if (err.response.status == 504) {
            message = '连接超时'
        } else {
            message = err.message
        }
        Notify({ type: 'danger', message: message });
        reject(err);
      },
      complete:()=>{
       ajaxTimes--;
       if(ajaxTimes===0){
         //  关闭正在等待的图标
         wx.hideLoading();
       }
      }
     });
  })
}