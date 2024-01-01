// components/form-input-gender/form-input-gender.js
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
    // 0 is F, 1 is M, 2 is not set
    isMale: {
      type: Number,
      value: 2,
    },
    classNameMale: {
      type: String,
      value: "",
    },
    classNameFemale: {
      type: String,
      value: "",
    },
    hoverClassNameMale: {
      type: String,
      value: "",
    },
    hoverClassNameFemale: {
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
    onTapMale() {
      this.setData({
        isMale: 1,
        classNameMale: "blue-btn",
        classNameFemale: '',
        hoverClassNameMale: '',
        hoverClassNameFemale: '',
      });
      this.triggerEvent('changeGender', 1);
    },

    onTapFemale() {
      this.setData({
        isMale: 0,
        classNameMale: '',
        classNameFemale: "blue-btn",
        hoverClassNameMale: '',
        hoverClassNameFemale: '',
      });
      this.triggerEvent('changeGender', 0);
    },
  }
})