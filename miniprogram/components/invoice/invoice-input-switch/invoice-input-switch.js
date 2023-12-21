// components/invoice/invoice-input-switch/invoice-input-switch.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
    },
    isNecessary: {
      type: Boolean,
      value: false
    },
    switchMethod: {
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
    isVAT() {
      this.triggerEvent('VAT')
    },
  }
})