// pages/auth/auth.js
import {verboseLog} from "../../static/utils/logging.js";
import cloudAction from "../../static/utils/cloudAction.js";
import validation from "../../static/utils/validation.js";
import {sleep, showUseChinesePhoneNumber, navTo, redirectTo} from "../../static/utils/wxapi";

const global = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loggedin: false,
    isNewUser: true,
    disabled: false,

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
        redirectTo('/pages/personal-info/personal-info', {phonePersonal: res.purePhoneNumber});
      }
      else {
        this.setDisabled(false);
        showUseChinesePhoneNumber();
      }
    } catch (err) {
      console.error(err);
      this.setDisabled(false);
    }
  },

  handleDisagree(e) {
    wx.navigateBack();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '登录' });
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
      navTo("../registration-personal-info/registration-personal-info");
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