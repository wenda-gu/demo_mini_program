// components/form-input-switch/form-input-switch.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    isRequired: {
      type: Boolean,
      value: false
    },
    switchMethod: String,
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false,
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
      this.triggerEvent('VAT');
    },
    isDefault() {
      this.triggerEvent('Default');
    },
    isApplicable() {
      this.triggerEvent('applicable');
    }
  }
})