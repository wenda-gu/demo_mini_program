// components/form-input-phone/form-input-phone.js
import {placeholderColorDisabled} from "../../static/utils/staticData"
import cloudAction from "../../static/utils/cloudAction.js";
import validation from "../../static/utils/validation.js";

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
    async getPhoneNumber(e) {
      try {
        var res = await cloudAction.cloudGetPhoneNumber(e.detail.cloudID);
        if (validation.validateCountryCode(res.countryCode)) {
          this.triggerEvent('changePhone', res.purePhoneNumber);
        }
        else {
          showUseChinesePhoneNumber();
        }
      } catch (err) {
        console.error(err);
      }
    },
  }
})