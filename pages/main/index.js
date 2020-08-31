// pages/main/index.js
import { request } from "../../request/index.js";
Component({
  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    active:0,
    tagList:[]
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let tag = wx.getStorageSync("tag");
      if (!tag) {
        request({url:"/blog/getTag"}).then(r=>{
          wx.setStorageSync('tag',  r.data)
          this.setData({
            tagList: r.data
          })
        })
      }else{
        this.setData({
          tagList: tag
        })
      }
      
      
    },
    detached: function() {
      console.log("detached");
      // 在组件实例被从页面节点树移除时执行
    },
  },

  methods:{
    onChange(e){
      console.log(e);
    }
  }
})