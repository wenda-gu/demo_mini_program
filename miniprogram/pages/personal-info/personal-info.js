// pages/personal-info/personal-info.js

import validation from "../../static/utils/validation.js";
import {verboseLog, verboseError} from "../../static/utils/logging.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: String,
    personalId: String,
    isMale: Boolean,
    phonePersonal: Number,
    emailPersonal: String,
    companyName: String,
    department: String,
    title: String,
    address: String,
    phoneCompany: Number,
    isEditing: false,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: true,
    });
  },
  test() {
    var b = validation.validateNumNotEmpty('');
    verboseLog("test:", b);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '我的信息' })
    if (options.item == null) return;
    const item = JSON.parse(options.item);
    verboseLog("personal-info.onLoad() got item:", item);
    // TODO: check if field is undefined
    // TODO: set data properly
    this.setData({
      name: String,
      personalId: String,
      isMale: Boolean,
      phonePersonal: Number,
      emailPersonal: String,
      companyName: String,
      department: String,
      address: String,
      phoneCompany: Number,
      isEditing: false,
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