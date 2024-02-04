// pages/testPage/testPage.js
import cloudAction from "../../static/utils/cloudAction.js";
import {verboseLog, verboseError} from "../../static/utils/logging.js";
import {medicalDepartmentList} from "../../static/utils/staticData.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: String,
    userInfo: Object,
    items: medicalDepartmentList,
    department: String,
    region: Object,
    customItem: '全部',
    code: String,
    countryCode: Number,
    phoneNumber: Number,
  },
  
  getPhoneNumber (e) {
    cloudAction.cloudGetPhoneNumber(e.detail.cloudID).then((res) => {
      verboseLog("this is res:", res);
    })
  },

  getRealTimePhoneNumber(e) {
    cloudAction.cloudGetPhoneNumber(e.detail.cloudID).then((res) => {
      verboseLog("this is res:", res);
      this.setData({
        countryCode: countryCode,
        phoneNumber: res.purePhoneNumber,
      });
    }).catch((err) => {
      verboseError(err);
    });
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