// components/navigate-button/navigate-button.js
import {navTo} from "../../static/utils/wxapi";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
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
    onTap() {
      navTo(this.data.item.url);
    }
  }
})