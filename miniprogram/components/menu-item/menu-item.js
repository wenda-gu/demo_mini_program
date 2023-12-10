// components/menu-item/menu-item.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    itemName: {
      type: String,
      value: 'Default Title'
    },
    route:{
      type: String,
      value: ''
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
    onTapNavTo: function() {
      const r = this.properties.route;
      if (r) {
        wx.navigateTo( {url: r,} );
      }
    },
  }
})
