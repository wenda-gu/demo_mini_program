// components/conference-item/conference-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    itemName: {
      type: String,
      value: 'Default Title'
    },
    route: {
      type: String,
      value: ''
    },
    itemDate: {
      type: Date,
      value: ''
    },
    itemIsComplete: {
      type: Boolean,
      value: false
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

  }
})