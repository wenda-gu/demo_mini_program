// components/invoice/invoice-input-item/invoice-input-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
    },
    isRequired: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
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
    toggleRequired() {
      var v = this.properties.isRequired
      this.setData({
        isRequired: !v,
      });
    },
  }
})