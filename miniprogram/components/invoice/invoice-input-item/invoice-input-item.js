// components/invoice/invoice-input-item/invoice-input-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    isRequired: false,
    placeholder: String,
    name: String,
    value: String,
    type: "text",
    maxlength: 140,
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
    // toggleRequired() {
    //   var v = this.properties.isRequired
    //   this.setData({
    //     isRequired: !v,
    //   });
    // },

    onInput(e) {
      this.triggerEvent('input', e.detail.value);
    }
  },
})