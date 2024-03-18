// components/conference-item/conference-item.js
import {navTo} from "../../static/utils/wxapi";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    conference: String,
    conferenceId: String,
    route: {
      type: String,
      value: "../auth/auth",
    },
    conferenceDate: String,
    status: String,
    registration: Object,
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
      navTo(this.data.route, this.data.conferenceId);
    }
  }
})