// pages/invoice/invoice.js

import logging from "../../static/utils/logging.js";
import dbAction from "../../static/utils/dbAction.js";
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
    const item = e.detail;
    var destination = '/pages/invoice-add/invoice-add?item=' + JSON.stringify(item);
    wx.navigateTo({
      url: destination,
    }).then(res => {
      logging.verboseLog("invoice.handleEditInvoiceTitle() nav to invoice-add as edit success:", destination);
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
              logging.verboseLog("invoice.handleDeleteInvoiceTitle() success.");
            }).catch((err) => {
              logging.verboseLog("invoice.handleDeleteInvoiceTitle() failed:", err);
            });
        }
      },
      fail (res) {
        logging.verboseLog("invoice.handleDeleteInvoiceTitle() delete cancelled.");
      }
    });
  },

  deleteInvoiceTitle(e) {
    return new Promise((resolve, reject) => {
      const idToDelete = e.detail
      db.collection("invoice-title").doc(idToDelete).remove().then((res) => {
        logging.verboseLog("invoice.handleDeleteInvoiceTitle() removed:", idToDelete);
        this.getData().then((res) => {
          logging.verboseLog("invoice.handleDeleteInvoiceTitle() success.");
          resolve("invoice.handleDeleteInvoiceTitle() success.");
        }).catch((err) => {
          logging.verboseError("invoice.deleteInvoiceTitle() delete success, getData() failed:", err);
          reject(err);
        });
      }).catch((err) => {
        logging.verboseError("invoice.deleteInvoiceTitle() failed:", err);
        wx.showToast({
          title: '删除失败请重试',
          icon: 'error',
          duration: 2000,
        });
        reject(err);
      });
    });
  },

  navigateToInvoiceAdd() {
    wx.navigateTo( {url: '/pages/invoice-add/invoice-add',} );
  },

  getData(){
    return new Promise((resolve, reject) => {
      logging.verboseLog("invoice.getData()");
      dbAction.getAllInvoiceTitles().then((items) => {
        logging.verboseLog("invoice.getData() got invoice title(s):", items);
        this.setData({
          dataObj: items,
          show: true,
        });
        logging.verboseLog("invoice.getData() success.");
        resolve("invoice.getData() success.");
      }).catch((err) => {
        logging.verboseError("invoice.getData() failed:", err);
        reject(err);
      });
    });
  },

  getDataWrapper(mode) {
    return new Promise((resolve, reject) => {
      var funcName, loadingTitle, toastTitle;
      if (mode == "show") {
        funcName = "invoice.onShow()";
        loadingTitle = "加载中";
        toastTitle = "加载失败请刷新";
      }
      else {
        funcName = "invoice.onPullDownRefresh()";
        loadingTitle = "刷新中";
        toastTitle = "刷新失败请重试";
      }
      logging.verboseLog(funcName);
      wx.showLoading({
        title: loadingTitle,
        mask: true,
      });
      this.getData().then((res) => {
        wx.hideLoading();
        logging.verboseLog(`${funcName} getData() success.`);
        resolve(`${funcName} getData() success.`);
      }).catch((err) => {
        logging.verboseError(`${funcName} getData() failed:`, err);
        wx.hideLoading();
        wx.showToast({
          title: toastTitle,
          icon: 'error',
          duration: 2000,
        });
        reject(err);
      });
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    logging.verboseLog("invoice.onLoad()");
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
    this.getDataWrapper("show");
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
    return new Promise((resolve, reject) => {
      wx.startPullDownRefresh();
      logging.verboseLog("invoice.onPullDownRefresh() refreshing...");
      this.getDataWrapper("refresh").then((res) => {
        wx.stopPullDownRefresh();
        logging.verboseLog("invoice.onPullDownRefresh() getDataWrapper() refreshed.");
        resolve("invoice.onPullDownRefresh() getDataWrapper() refreshed.");
      }).catch((err) => {
        logging.verboseError("invoice.onPullDownRefresh() getDataWrapper() failed:", err);
        reject(err);
      });
    });
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