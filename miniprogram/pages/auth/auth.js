// pages/auth/auth.js
import {verboseLog, verboseError} from "../../static/utils/logging.js";
import {cloudAction} from "../../static/utils/cloudAction.js";
import {defaultAvatarUrl} from "../../static/utils/staticData.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: Number,
    verificationCode: Number,
  },



  sendVerificationCode() {
    cloudAction.wxCloudApi('sendVerificationCode', {
      phone: this.data.phoneNumber
    }).then(res => {
      verboseLog(res);
    }).catch(err => {
      verboseError(err);
    });
  },

  inputVerificationCode(e) {
    this.setData({
      verificationCode: e.detail.value
    });
  },

  // TODO: verification success or fail handler
  // TODO: verification cloud functions need to be finished
  signup() {
    cloudAction.wxCloudApi('checkVerificationCode', {
      phone: this.data.phoneNumber,
      code: this.data.verificationCode,
    }).then(res => {
      verboseLog(res);
    }).catch(err => {
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