import { verboseLog } from "../../static/utils/logging";

// pages/me/me.js
const userLogin = getApp().userLogin
const global = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: String,
    userInfo: Object,
  },

  setupPage() {
    var title = global.personalInfo.companyName;
    if (global.personalInfo.department != '') {
      title += global.personalInfo.department;
    }
    if (global.personalInfo.title != '') {
      title += global.personalInfo.title;
    }
    this.setData({
      title: title,
      userInfo: global.personalInfo,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if ( global.loggedin ) {
      this.setupPage();
      verboseLog("me.onLoad() already logged in, success.");
    }
    else {
      verboseLog("me.onLoad() here.");
      userLogin().then((res) => {
        this.setupPage();
        verboseLog("me.onLoad() logged in success.");
      }).catch((err) => {
        verboseError("me.onLoad() failed:", err);
      });
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