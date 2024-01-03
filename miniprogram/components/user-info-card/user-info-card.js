// components/user-info-card/user-info-card.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    userName: String,
    userTitle: String,
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChooseAvatar(e) {
      this.setData(e.detail);
      this.triggerEvent("chooseAvatar", e.detail);
    },
  }
})