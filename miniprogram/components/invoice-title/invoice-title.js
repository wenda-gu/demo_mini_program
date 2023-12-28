// components/invoice/invoice-title/invoice-title.js

import {verboseLog, verboseError} from "../../static/utils/logging.js";

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    },
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
    onEdit(e) {
      verboseLog("invoice-title.onEdit() passing back item:", this.properties.item);
      this.triggerEvent('edit', this.properties.item);
    },
    onDelete(e) {
      verboseLog("invoice-title.onDelete() passing back item _id:", this.properties.item._id);
      this.triggerEvent('delete', this.properties.item._id);
    }
  }
})