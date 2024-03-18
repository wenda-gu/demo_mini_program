// pages/registration/registration.js

import {verboseLog} from "../../static/utils/logging";
import dbAction from "../../static/utils/dbAction.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: Object,
    registrationExists: true,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '我的报名' })
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
    try {
      var items = await dbAction.getDataWrapper("show", "registration");
      this.setData({
        dataObj: items,
        registrationExists: items.length ? true : false,
      });
      verboseLog("This is dataObj:", this.data.dataObj);
    } catch (err) {
      console.error(err);
    }
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
  async onPullDownRefresh() {
    try {
      wx.startPullDownRefresh();
      var items = await dbAction.getDataWrapper("refresh", "registration");
      wx.stopPullDownRefresh();
      verboseLog("registration.pullDownRefresh() refreshed.");
      this.setData({
        dataObj: items,
      });
    } catch (err)  {
      console.error("at registration.pullDownRefresh()\n", err);
    }
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