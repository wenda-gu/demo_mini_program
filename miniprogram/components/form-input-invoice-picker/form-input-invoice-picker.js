// components/form-input-invoice-picker/form-input-invoice-picker.js
import { verboseLog } from "../../static/utils/logging";
import {placeholderColorDisabled, placeholderColorEnabled, fieldColorDisabled} from "../../static/utils/staticData";

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
    value: Object,
    range: [],
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeholderColorDisabled: placeholderColorDisabled,
    placeholderColorEnabled: placeholderColorEnabled,
    fieldColorDisabled: fieldColorDisabled,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInvoiceChange(e) {
      this.setData({
        value: this.data.range[e.detail.value],
      });
      this.triggerEvent('input', this.data.value);
    },
  }
})