// pages/invoice/invoice.js
const db = wx.cloud.database(), App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: "",
    show: false,
  },

  handleEditInvoiceTitle(e) {
    const item = e.detail;
    var destination = '/pages/invoice-add/invoice-add?item=' + JSON.stringify(item);
    wx.navigateTo({
      url: destination,
    }).then(res => {
      App.verboseLog("invoice.handleEditInvoiceTitle() nav to invoice-add as edit success:", destination);
    });
  },

  handleDeleteInvoiceTitle(e) {
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#FF0000",
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            this.deleteInvoiceTitle(e).then((res) => {
              App.verboseLog("invoice.handleDeleteInvoiceTitle() success.");
            }).catch((err) => {
              App.verboseLog("invoice.handleDeleteInvoiceTitle() failed:", err);
            });
        }
      },
      fail (res) {
        App.verboseLog("invoice.handleDeleteInvoiceTitle() delete cancelled.");
      }
    });
  },

  deleteInvoiceTitle(e) {
    return new Promise((resolve, reject) => {
      const idToDelete = e.detail
      db.collection("invoice-title").doc(idToDelete).remove().then((res) => {
        App.verboseLog("invoice.handleDeleteInvoiceTitle() removed:", idToDelete);
        this.getData().then((res) => {
          App.verboseLog("invoice.handleDeleteInvoiceTitle() success.");
          resolve("invoice.handleDeleteInvoiceTitle() success.");
        }).catch((err) => {
          App.verboseLogError("invoice.deleteInvoiceTitle() delete success, getData() failed:", err);
          reject(err);
        });
      }).catch((err) => {
        App.verboseLogError("invoice.deleteInvoiceTitle() failed:", err);
        reject(err);
      });
    });
  },

  navigateToInvoiceAdd() {
    wx.navigateTo( {url: '/pages/invoice-add/invoice-add',} );
  },

  getData(){
    return new Promise((resolve, reject) => {
      App.verboseLog("invoice.getData()");
      App.getAllInvoiceTitles("oUZen5VZ_i-ylfHrUr3RNfTqxypI").then((items) => {
        App.verboseLog("invoice.getData() got invoice title(s):", items);
        this.setData({
          dataObj: items,
          show: true,
        });
        App.verboseLog("invoice.getData() success.");
        resolve("invoice.getData() success.");
      }).catch((err) => {
        App.verboseLogError("invoice.getData() failed:", err);
        reject(err);
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    App.verboseLog("invoice.onLoad()");
    wx.setNavigationBarTitle({ title: '开票信息' });
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
    return new Promise((resolve, reject) => {
      App.verboseLog("invoice.onShow()");
      wx.showLoading({
        title: '加载中',
        mask: true,
      });
      this.getData().then((res) => {
        wx.hideLoading();
        App.verboseLog("invoice.onShow() success.");
        resolve("invoice.onShow() success.");
      }).catch((err) => {
        wx.hideLoading();
        App.verboseLogError("invoice.onShow() failed:", err);
        reject(err);
      });
    });
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
    wx.startPullDownRefresh();
    App.verboseLog("invoice.onPullDownRefresh() page refreshing");
    this.getData();
    wx.stopPullDownRefresh();
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