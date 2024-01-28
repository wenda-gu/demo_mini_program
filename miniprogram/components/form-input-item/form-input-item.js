// components/form-input-item/form-input-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    isRequired: {
      type: Boolean,
      value: false,
    },
    placeholder: String,
    name: String,
    value: String,
    type: {
      type: String,
      value: 'text',
    },
    maxlength: {
      type: Number,
      value: 140,
    },
    isApplicable: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
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
    onInput(e) {
      this.triggerEvent('input', e.detail.value);
    }
  },
})