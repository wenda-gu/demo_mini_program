// components/user-info-card/user-info-card.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    userName: String,
    userTitle: String,
    avatarUrl: String,
    isNewUser: Boolean,
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

    onSignUp(e) {
      this.triggerEvent("signUp", e.detail);
    }
  }
})