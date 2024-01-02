// pages/contact/contact.js
import {verboseLog, verboseError} from "../../static/utils/logging.js";
import {wxapi} from "../../static/utils/wxapi.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: 'services@blueseachina.net',
    phoneNumber: '13817510016',
  },

  setClipboard(data) {
    wx.setClipboardData({
      data: data,
    }).then((res) => {
      verboseLog("copy success.");
    }).catch((err) => {
      verboseError("copy failed:", err);
    });
  },

  onTapCopyEmail() {
    this.setClipboard(this.data.email);
  },

  onTapCopyNumber() {
    this.setClipboard(this.data.phoneNumber);
  },

  onTapCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
    }).then((res) => {
      verboseLog("call success.");
    }).catch((err) => {
      verboseError("call failed:", err);
    });
  },

  onTapSms() {
    wxapi("sendSms", {
      phoneNumber: this.data.phoneNumber,
    }).then((res) => {
      verboseLog("sms success.");
    }).catch((err) => {
      verboseError("sms failed:", err);
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '联系我们' })
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