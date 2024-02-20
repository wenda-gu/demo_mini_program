// pages/index/index.js

import {verboseLog} from "../../static/utils/logging.js";
import dbAction from "../../static/utils/dbAction.js";
import {formatDate} from "../../static/utils/dateTool";

Page({

  /**
   * 页面的初始数据 JSON
   */
  data: {
    conferences: [],
  },

  handleEnterDetail(e) {
    for (let i = 0; i < this.data.conferences.length; i++) {
      if (this.data.conferences[i]._id == e.detail) {
        var data = this.data.conferences[i].conference_page;
        data.name_zh = this.data.conferences[i].name_zh;
        data._id = this.data.conferences[i]._id;
        verboseLog("this is data:", data);
        wx.navigateTo({
          url: '../conference/conference?item=' + JSON.stringify(data),
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      var conferences = await dbAction.getAllConferencesOnRelease();
      conferences = conferences.data;
      for (let i = 0; i < conferences.length; i++) {
        if (conferences[i].date_start_string == undefined) {
          conferences[i].date_start_string = formatDate(conferences[i].date_start, 'yyyy/mm/dd');
          conferences[i].date_end_string = formatDate(conferences[i].date_end, 'yyyy/mm/dd');
        }
        // 如果有date_start_string，为时间待定会议
        else conferences[i].date_end_string = "";
      }
      verboseLog("Current conferences:", conferences);
      this.setData({
        conferences: conferences,
      });
    } catch (err) {
      console.error("index.onLoad() failed:\n", err);
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