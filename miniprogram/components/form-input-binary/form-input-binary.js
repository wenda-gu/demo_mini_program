const { verboseLog } = require("../../static/utils/logging");

// components/form-input-binary/form-input-binary.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: "性别",
    },
    isRequired: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    switchMethod: {
      type: String,
      value: '',
    },
    first: {
      type: String,
      value: "是",
    },
    second: {
      type: String,
      value: "否",
    },
    // 0 is Second, 1 is First, 2 is not set
    firstFlag: {
      type: Boolean,
    },
    classNameFirst: {
      type: String,
      value: "",
    },
    classNameSecond: {
      type: String,
      value: "",
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
    onTapFirst() {
      this.setData({
        firstFlag: true,
        classNameFirst: "blue-btn",
        classNameSecond: '',
      });
      this.triggerEvent(this.data.switchMethod, true);
    },

    onTapSecond() {
      this.setData({
        firstFlag: false,
        classNameFirst: '',
        classNameSecond: "blue-btn",
      });
      this.triggerEvent(this.data.switchMethod, false);
    },
  }
})