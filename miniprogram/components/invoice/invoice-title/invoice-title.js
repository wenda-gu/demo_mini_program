// components/invoice/invoice-title/invoice-title.js
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
      getApp().verboseLog("onEdit passing back item: " + this.properties.item)
      this.triggerEvent('edit', this.properties.item);
    },
    onDelete(e) {
      getApp().verboseLog("Passing back _id: " + this.properties.item._id)
      this.triggerEvent('delete', this.properties.item._id);
    }
  }
})