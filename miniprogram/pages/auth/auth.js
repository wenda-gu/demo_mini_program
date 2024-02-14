// pages/auth/auth.js
import {verboseLog} from "../../static/utils/logging.js";
import cloudAction from "../../static/utils/cloudAction.js";
import validation from "../../static/utils/validation.js";
import {showUseChinesePhoneNumber} from "../../static/utils/wxapi";


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getPhoneNumber(e) {
    try {
      var res = await cloudAction.cloudGetPhoneNumber(e.detail.cloudID);
      verboseLog("this is res:", res);
      if (validation.validateCountryCode(res.countryCode)) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        await wx.navigateBack({delta: 1});
        if (prevPage == undefined || prevPage == null) {
          return;
        }
        else {
          prevPage.setPhonePersonal(res.purePhoneNumber);
        }
      }
      else {
        showUseChinesePhoneNumber();
      }
    } catch (err) {
      console.error(err);
    }
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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