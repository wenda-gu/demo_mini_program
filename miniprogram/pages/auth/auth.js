// pages/auth/auth.js
import {verboseLog} from "../../static/utils/logging.js";
import cloudAction from "../../static/utils/cloudAction.js";
import validation from "../../static/utils/validation.js";
import {sleep, showUseChinesePhoneNumber, navTo, redirectTo} from "../../static/utils/wxapi";
import dbAction from "../../static/utils/dbAction.js";

const global = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loggedin: false,
    isNewUser: true,
    disabled: false,
    conferenceId: String,
  },

  async handleNav() {
    try {
      var status = await dbAction.getConferenceRegistrationStatus(this.data.conferenceId);
      verboseLog("auth.handleNav() this is status:", status);
      switch (status) {
        case "personalInfo":
          let data = global.personalInfo;
          data.conferenceId = this.data.conferenceId;
          navTo("../registration-personal-info/registration-personal-info", data);
          break;
        case "selectPackage":
          navTo("../registration-select-package/registration-select-package", {
            conferenceId: this.data.conferenceId,
            personalInfoDocId: global.personalInfoDocId,
          });
          break;
        case "selectAccommodation":
          navTo("../registration-select-accommodation/registration-select-accommodation", {
            conferenceId: this.data.conferenceId,
            personalInfoDocId: global.personalInfoDocId,
          });
          break;
        case "payment":
          navTo("../registration-payment/registration-payment", {
            conferenceId: this.data.conferenceId,
            personalInfoDocId: global.personalInfoDocId,
          });
          break;
        case "invoice":
          navTo("../registration-invoice/registration-invoice", {
            conferenceId: this.data.conferenceId,
            personalInfoDocId: global.personalInfoDocId,
          });
          break;
      }
    } catch (err) {
      console.error("auth.handleNav() failed:\n", err);
    }
    
  },

  setDisabled(b) {
    this.setData({
      disabled: b,
    });
  },

  async getPhoneNumber(e) {
    this.setDisabled(true);
    try {
      var res = await cloudAction.cloudGetPhoneNumber(e.detail.cloudID);
      verboseLog("this is res:", res);
      if (validation.validateCountryCode(res.countryCode)) {
        redirectTo('/pages/registration-personal-info/registration-personal-info', {
          phonePersonal: res.purePhoneNumber,
        });
      }
      else {
        this.setDisabled(false);
        showUseChinesePhoneNumber();
      }
    } catch (err) {
      console.error("auth.getPhoneNumber() failed:\n", err);
      this.setDisabled(false);
    }
  },

  handleDisagree(e) {
    wx.navigateBack();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.setNavigationBarTitle({ title: '用户登录' });
    if (options.item == null || options.item == "") {
      console.error("auth no input");
      await wx.navigateBack();
      return;
    }
    this.setData({
      conferenceId: JSON.parse(options.item),
    });
    verboseLog("auth.onLoad() got conferenceId:", this.data.conferenceId);
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
    while ( !global.loggedin ) {
      await sleep(10);
    }
    if (global.isNewUser) {
      this.setData({
        isNewUser: true,
        loggedin: true,
      });
    }
    else {
      this.handleNav();
    }
    verboseLog("auth.onShow() already logged in, success.");
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