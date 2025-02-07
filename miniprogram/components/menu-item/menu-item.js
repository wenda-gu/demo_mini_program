// components/menu-item/menu-item.js
import {navTo} from "../../static/utils/wxapi";
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    routeDisabled: {
      type: Boolean,
      value: false,
    },
    itemName: {
      type: String,
      value: 'Default Title',
    },
    route: {
      type: String,
      value: '',
    },
    img: {
      type: String,
      value: '',
    }
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
    navigateTo: function() {
      const r = this.properties.route;
      if (r) navTo(r);
    },
  }
})
