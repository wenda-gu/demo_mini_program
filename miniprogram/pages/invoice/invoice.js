// pages/invoice/invoice.js

import {verboseLog} from "../../static/utils/logging";
import dbAction from "../../static/utils/dbAction.js";
import {wxapi, navTo} from "../../static/utils/wxapi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: "",
  },

  handleEditInvoiceTitle(e) {
    navTo('/pages/invoice-add/invoice-add', e.detail);
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
          console.error("invoice.deleteInvoiceTitle() delete success, getData() failed:", err);
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
    navTo('/pages/invoice-add/invoice-add');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
  async onShow() {
    try {
      var items = await dbAction.getDataWrapper("show", "invoice");
      this.setData({
        dataObj: items,
      });
    } catch (err) {
      console.error(err);
    }
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
  async onPullDownRefresh() {
    try {
      wx.startPullDownRefresh();
      var items = await dbAction.getDataWrapper("refresh", "invoice");
      wx.stopPullDownRefresh();
      verboseLog("invoice.pullDownRefresh() refreshed.");
      this.setData({
        dataObj: items,
      });
    } catch (err)  {
      console.error("at invoice.pullDownRefresh()\n", err);
    }
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