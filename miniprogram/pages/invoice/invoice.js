// pages/invoice/invoice.js

import {verboseLog, verboseError} from "../../static/utils/logging.js";
import dbAction from "../../static/utils/dbAction.js";
import {wxapi} from "../../static/utils/wxapi.js";

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
      verboseLog("invoice.handleEditInvoiceTitle() nav to invoice-add as edit success:", destination);
    });
  },

  handleDeleteInvoiceTitle(e) {
    wxapi("showActionSheet", {
      itemList: ['删除'],
      itemColor: "#FF0000",
    }).then((res) => {
      switch(res.tapIndex) {
        case 0:
          this.deleteInvoiceTitle(e).then((res) => {
            verboseLog("invoice.handleDeleteInvoiceTitle() deleteInvoiceTitle() success:", res);
            wx.showToast({
              title: '删除成功',
              duration: 800,
            });
          }).catch((err) => {
            verboseLog("invoice.handleDeleteInvoiceTitle() deleteInvoiceTitle() failed:", err);
            wx.showToast({
              title: '删除失败请重试',
              icon: 'error',
              duration: 2000,
            });
          });
      }
    }).catch((err) => {
      verboseLog("invoice.handleDeleteInvoiceTitle() delete cancelled.");
    });
  },

  deleteInvoiceTitle(e) {
    return new Promise((resolve, reject) => {
      const idToDelete = e.detail
      dbAction.deleteInvoiceTitleById(idToDelete).then((res) => {
        this.getData().then((res) => {
          resolve(res);
        }).catch((err) => {
          verboseError("invoice.deleteInvoiceTitle() delete success, getData() failed:", err);
          reject(err);
        });
      }).catch((err) => {
        this.getData().then((res) => {
          reject(err);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },

  navigateToInvoiceAdd() {
    wx.navigateTo( {url: '/pages/invoice-add/invoice-add',} );
  },

  getData(){
    return new Promise((resolve, reject) => {
      verboseLog("invoice.getData()");
      dbAction.getAllInvoiceTitles().then((items) => {
        verboseLog("invoice.getData() got invoice title(s):", items);
        this.setData({
          dataObj: items,
          show: true,
        });
        verboseLog("invoice.getData() success.");
        resolve("invoice.getData() success.");
      }).catch((err) => {
        verboseError("invoice.getData() failed:", err);
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
      verboseLog(funcName);
      wx.showLoading({
        title: loadingTitle,
        mask: true,
      });
      this.getData().then((res) => {
        wx.hideLoading();
        verboseLog(`${funcName} getData() success.`);
        resolve(`${funcName} getData() success.`);
      }).catch((err) => {
        verboseError(`${funcName} getData() failed:`, err);
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
    verboseLog("invoice.onLoad()");
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
      verboseLog("invoice.onPullDownRefresh() refreshing...");
      this.getDataWrapper("refresh").then((res) => {
        wx.stopPullDownRefresh();
        verboseLog("invoice.onPullDownRefresh() getDataWrapper() refreshed.");
        resolve("invoice.onPullDownRefresh() getDataWrapper() refreshed.");
      }).catch((err) => {
        verboseError("invoice.onPullDownRefresh() getDataWrapper() failed:", err);
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