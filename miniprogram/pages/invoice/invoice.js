// pages/invoice/invoice.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: "",
    show: false,
  },

  handleEditInvoiceTitle(e) {
    getApp().verboseLog(e);
    const item = e.detail;
    var destination = '/pages/invoice-add/invoice-add?item=' + JSON.stringify(item);
    wx.navigateTo({
      url: destination,
    }).then(res => {
      getApp().verboseLog("nav edit success: " + destination)
    });
  },

  handleDeleteInvoiceTitle(e) {
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#FF0000",
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            const idToDelete = e.detail
            db.collection("invoice-title").doc(idToDelete).remove().then(res => {
              getApp().verboseLog("delete handler removed passed id successfully: " + idToDelete)
              this.getData()
            })
        }
      },
      fail (res) {
        getApp().verboseLog("delete cancelled.")
      }
    });
  },

  navigateToInvoiceAdd() {
    wx.navigateTo( {url: '/pages/invoice-add/invoice-add',} );
  },

  getData(){
    getApp().verboseLog("in getData")
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    db.collection("invoice-title").where({
      personalKey: 18916718618,
    }).get().then(res => {
      getApp().verboseLog("invoice page gets invoice title(s): ", res.data)
      this.setData({
        dataObj: res.data,
        show: true
      })
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getApp().verboseLog("This is invoice onLoad")
    wx.setNavigationBarTitle({ title: '开票信息' })
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
    getApp().verboseLog("This is invoice onShow")
    this.getData()
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
    // wx.reLaunch({
    //   url: '/pages/me/me',
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.startPullDownRefresh()
    getApp().verboseLog("Refreshing")
    this.getData()
    wx.stopPullDownRefresh()
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