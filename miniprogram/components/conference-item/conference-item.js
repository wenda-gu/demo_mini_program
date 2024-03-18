// components/conference-item/conference-item.js
import {navTo} from "../../static/utils/wxapi";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    conference: String,
    route: {
      type: String,
      value: "../registration-personal-info/registration-personal-info",
    },
    conferenceDate: String,
    isComplete: {
      type: Boolean,
      value: false,
    },
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
      console.log(this.data.registration)
      navTo(this.data.route, this.data.registration);
    }
  }
})