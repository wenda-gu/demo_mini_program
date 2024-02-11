// components/form-input-phone/form-input-phone.js
import {placeholderColorDisabled} from "../../static/utils/staticData"

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
      value: true,
    },
    value: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeholderColorDisabled: placeholderColorDisabled,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      this.triggerEvent('changePhone', e);
    }
  }
})