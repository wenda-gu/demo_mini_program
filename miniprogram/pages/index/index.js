// pages/index/index.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据 JSON
   */
  data: {
    dataObj: ""
  },


  getData(){
    db.collection("testdb").get().then(res => {
      this.setData({
        dataObj: res.data,
        show: true
      })
    });
  },

  hideData(){
    setTimeout(function () {
      this.setData({
        show: false
      })
    }.bind(this))
  },

  addData() {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
    db.collection("testdb").add({
      data: {
        name: "王五",
        gender: "男",
        birthday: new Date()
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading();
    });
  },
  
  btnSubmit(res) {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
    var content = res.detail.value;
    db.collection("testdb").add({
      data: content
    }).then(res => {
      console.log(res);
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})