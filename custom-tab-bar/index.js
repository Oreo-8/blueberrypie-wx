// components/custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [
      {
        "url": "/pages/main/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "/pages/my-page/index",
        "icon": "search",
        "text": "我的文章"
      },
      {
        "url": "/pages/my-edit/index",
        "icon": "edit",
        "text": "写文章"
      },
      {
        "url": "/pages/my-dtl/index",
        "icon": "user-circle-o",
        "text": "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      console.log(e,'e')
      this.setData({ active: e.detail });
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
   },
   init() {
       const page = getCurrentPages().pop();
       this.setData({
      　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
       });
    }
  }
})
