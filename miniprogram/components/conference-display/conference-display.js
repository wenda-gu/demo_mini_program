// components/conference-display/conference-display.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    conference_id: String,
    poster: String,
    conference: String,
    date_start_string: String,
    date_end_string: String,
    location: String,
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
    onTap(e) {
      this.triggerEvent("enterDetail", this.data.conference_id);
    },
  }
})