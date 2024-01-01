// pages/personal-info/personal-info.js

import validation from "../../static/utils/validation.js";
import {verboseLog, verboseError} from "../../static/utils/logging.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: String,
    // 0 is F, 1 is M, 2 is not set
    isMale: Number,
    phonePersonal: Number,
    emailPersonal: String,
    personalId: String,
    companyName: String,
    address: String,
    phoneCompany: Number,
    isApplicable: true,
    department: String,
    title: String,
    position: String,
    isEditing: false,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },
  toggleApplicablity() {
    this.setData({
      isApplicable: !this.data.isApplicable,
    });
  },


  handleName(e) {
    this.setData({
      name: e.detail
    });
  },
  handleGender(e) {
    this.setData({
      isMale: e.detail
    });
  },
  handlePhonePersonal(e) {
    this.setData({
      phonePersonal: e.detail
    });
  },
  handleEmailPersonal(e) {
    this.setData({
      emailPersonal: e.detail
    });
  },
  handlePersonalId(e) {
    this.setData({
      personalId: e.detail
    });
  },
  handleCompanyName(e) {
    this.setData({
      companyName: e.detail
    });
  },
  handleAddress(e) {
    this.setData({
      address: e.detail
    });
  },
  handlePhoneCompany(e) {
    this.setData({
      phoneCompany: e.detail
    });
  },
  handleDepartment(e) {
    this.setData({
      department: e.detail
    });
  },
  handleTitle(e) {
    this.setData({
      title: e.detail
    });
  },
  handlePosition(e) {
    this.setData({
      position: e.detail
    });
  },
  
  

  


  btnSubmit() {
    verboseLog("personal-info.btnSubmit()");
    this.toggleIsEditing();
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