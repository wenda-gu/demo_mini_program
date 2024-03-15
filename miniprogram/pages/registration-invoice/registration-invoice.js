// pages/registration-invoice/registration-invoice.js
import dbAction from "../../static/utils/dbAction";
import {verboseLog} from "../../static/utils/logging";
import { navTo, reLaunch, showSaving, showSaveSuccess, showSaveFailed, showSubmissionSuccess, showSubmissionFailed, showSubmitting, showError } from "../../static/utils/wxapi";
const updatePersonalInfo = getApp().updatePersonalInfo;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoDocId: String,
    conferenceId: String,
    needInvoice: false,
    needInvoiceChoices: [
      {value: false, name: "不需要发票"},
      {value: true, name: "需要发票"},
    ],
    chosenTitle: String,
    invoiceList: [],

    isEditing: true,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },

  handleNeedInvoice(e) {
    var needInvoice = e.detail.value;
    if (needInvoice == "true") {
      this.setData({
        needInvoice: true,
      });
    }
    else {
      this.setData({
        needInvoice: false,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      wx.enableAlertBeforeUnload({
        message: '尚未保存，是否返回',
      });
      wx.setNavigationBarTitle({ title: '开具发票' });
      if (options.item == null || options.item == "") {
        console.error("registration-invoice no input");
        wx.navigateBack();
        return;
      }
      const item = JSON.parse(options.item);
      this.setData({
        personalInfoDocId: item.personalInfoDocId,
        conferenceId: item.conferenceId,
        invoiceList: await dbAction.getDataWrapper("show", "invoice"),
      });
      verboseLog("registration-invoice.onLoad() got data:", this.data);
    } catch (err) {
      console.error("registration-invoice.onLoad() failed:\n", err);
    }
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