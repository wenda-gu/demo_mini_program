// pages/registration-select-package/registration-select-package.js

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
    packages: Object,
    chosenPackage: String,
    isEditing: true,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },

  handlePackageChange(e) {
    this.setData({
      chosenPackage: e.detail.value,
    });
  },

  async saveAndExit() {
    try {
      showSaving();
      this.toggleIsEditing();
      verboseLog("registration-select-package.saveAndExit()");

      await dbAction.selectConferencePackage(this.data.personalInfoDocId, this.data.conferenceId, this.data.chosenPackage);
      await updatePersonalInfo();

      wx.hideLoading();
      showSaveSuccess();
      reLaunch("../index/index");
    } catch (err) {
      console.error("registration-select-package.saveAndExit() failed:\n", err);
      wx.hideLoading();
      showSaveFailed();
      this.toggleIsEditing();
    }
  },

  async btnSubmit() {
    try {
      showSubmitting();
      this.toggleIsEditing();
      verboseLog("registration-select-package.btnSubmit()");

      await dbAction.selectConferencePackageAndUpdateStatus(this.data.personalInfoDocId, this.data.conferenceId, this.data.chosenPackage);
      await updatePersonalInfo();

      wx.hideLoading();
      showSubmissionSuccess();
      navTo("../registration-select-accommodation/registration-select-accommodation", {
        conferenceId: this.data.conferenceId,
        personalInfoDocId: this.data.personalInfoDocId,
      });
    } catch (err) {
      console.error("registration-select-package.btnSubmit() failed:\n", err);
      wx.hideLoading();
      showSubmissionFailed();
      this.toggleIsEditing();
    }
  },

  calculatePrice() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      wx.enableAlertBeforeUnload({
        message: '尚未保存，是否返回',
      });
      wx.setNavigationBarTitle({ title: '大会报名' });
      if (options.item == null || options.item == "") {
        console.error("registration-select-package no input");
        wx.navigateBack();
        return;
      }
      const item = JSON.parse(options.item), chosenPackage = await dbAction.getConferenceRegistrationChosenPackage(item.conferenceId);
      console.log("here", item)
      this.setData({
        personalInfoDocId: item.personalInfoDocId,
        conferenceId: item.conferenceId,
        packages: await dbAction.getConferencePackages(item.conferenceId),
        chosenPackage: (chosenPackage == undefined ? '' : chosenPackage),
      });
      verboseLog("registration-select-package.onLoad() set data:", this.data);
    } catch (err) {
      console.error("registration-select-package.onLoad() failed:\n", err);
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