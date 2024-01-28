// components/form-input-picker/form-input-picker.js
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
    disabled: {
      type: Boolean,
      value: false,
    },

    placeholder: {
      type: String,
      value: "请选择",
    },
    name: String,
    value: String,
    region: Object,
    mode: {
      type: String,
      value: "selector",
    },
    range: Object,
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
    bindPickerChange(e) {
      this.setData({
        value: this.data.range[e.detail.value],
      });
      this.triggerEvent('input', this.data.value);
    },
    bindRegionChange(e) {
      this.setData({
        region: e.detail.value,
      });
      this.triggerEvent('input', this.data.region);
    }
  }
})