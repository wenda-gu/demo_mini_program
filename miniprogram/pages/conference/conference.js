import { verboseLog } from "../../static/utils/logging";
import {comingSoonPage} from "../../static/utils/staticData";
import {navTo} from "../../static/utils/wxapi";


// pages/conference/conference.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conference: Object,
  },

  navToComingSoon() {
    navTo(comingSoonPage);
  },

  handleWelcome() {
    navTo('../welcome-letter/welcome-letter', this.data.conference.welcome_letter);
  },
  handleOrganizers() {
    this.navToComingSoon();
  },
  handleSpeakers() {
    this.navToComingSoon();
  },
  handleRegistration() {

  },
  handleAgenda() {
    this.navToComingSoon();
  },
  handleAccommodationInfo() {
    this.navToComingSoon();
  },
  handleSurvey() {
    this.navToComingSoon();
  },
  handleDownload() {
    navTo('../download-files/download-files', this.data.conference.downloads);
  },
  handleSponsor() {
    this.navToComingSoon();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.item == null || options.item == "") {
      console.error("conference no input");
      wx.navigateBack();
      return;
    }
    verboseLog(options.item);
    const item = JSON.parse(options.item);
    this.setData({
      conference: item,
    });
    wx.setNavigationBarTitle({
      title: this.data.conference.name_zh,
    });
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