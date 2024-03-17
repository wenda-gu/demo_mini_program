// pages/registration-payment/registration-payment.js
import dbAction from "../../static/utils/dbAction";
import {verboseLog} from "../../static/utils/logging";
import { navTo, reLaunch, showSaving, showSaveSuccess, showSaveFailed, showSubmissionSuccess, showSubmissionFailed, showSubmitting } from "../../static/utils/wxapi";
const updatePersonalInfo = getApp().updatePersonalInfo;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoDocId: String,
    conferenceId: String,
    chosenConferencePackage: String,
    chosenAccommodationPackage: String,
    conferenceChoiceInChosenPackage: [],
    accommodationPrice: Number,
    chooseAccommodation: Boolean,
    totalAmount: Number,
    chosenPaymentMethod: 0,
    paymentMethods: [
      {value: 0, name: "微信钱包"},
      {value: 1, name: "支付宝"},
    ],
    isEditing: true,
  },

  calcTotalAmount() {
    let sum = 0;
    for (const choice of this.data.conferenceChoiceInChosenPackage) {
      sum += choice.price_current;
    }
    sum += this.data.chooseAccommodation ? this.data.accommodationPrice : 0;
    return sum;
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },

  handleChoosePaymentMethod(e) {
    this.setData({
      chosenPaymentMethod: e.detail.value,
    });
  },

  saveAndExit() {
    showSaving();
    this.toggleIsEditing();
    verboseLog("registration-payment.saveAndExit()");
    wx.hideLoading();
    showSaveSuccess();
    reLaunch("../index/index");
  },

  async btnSubmit() {
    try {
      showSubmitting();
      this.toggleIsEditing();
      verboseLog("registration-payment.btnSubmit()");

      // payment logic
      // push this user to conference item
      // await dbAction.selectAccommodationPackageAndUpdateStatus(this.data.personalInfoDocId, this.data.conferenceId, chosenDate, this.data.chosenRoom);
      await dbAction.updateConferenceRegistrationHelper(this.data.personalInfoDocId, this.data.conferenceId, [["status", "invoice"]]);
      await updatePersonalInfo();

      wx.hideLoading();
      showSubmissionSuccess();
      reLaunch("../registration-invoice/registration-invoice", {
        conferenceId: this.data.conferenceId,
        personalInfoDocId: this.data.personalInfoDocId,
      });
    } catch (err) {
      console.error("registration-payment.btnSubmit() failed:\n", err);
      wx.hideLoading();
      this.toggleIsEditing();
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
      wx.setNavigationBarTitle({ title: '支付方式' });
      if (options.item == null || options.item == "") {
        console.error("registration-payment no input");
        wx.navigateBack();
        return;
      }
      const item = JSON.parse(options.item);
      this.setData({
        personalInfoDocId: item.personalInfoDocId,
        conferenceId: item.conferenceId,
        chosenAccommodationPackage: await dbAction.getAccommodationRegistrationChosenPackage(item.conferenceId),
        chosenConferencePackage: await dbAction.getConferenceRegistrationChosenPackage(item.conferenceId),
        conferenceChoiceInChosenPackage: await dbAction.getConferenceChoiceInChosenPackage(item.conferenceId),
        accommodationPrice: await dbAction.getAccommodatioinPrice(item.conferenceId),
      });
      this.setData({
        chooseAccommodation: this.data.chosenAccommodationPackage[0] != "none",
      });
      this.setData({
        totalAmount: this.calcTotalAmount(),
      });
      verboseLog("registration-payment.onLoad() got data:", this.data);
    } catch (err) {
      console.error("registration-payment.onLoad() failed:\n", err);
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