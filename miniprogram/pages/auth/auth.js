// pages/auth/auth.js
import {verboseLog, verboseError} from "../../static/utils/logging.js";
import cloudAction from "../../static/utils/cloudAction.js";
import {defaultAvatarUrl} from "../../static/utils/staticData.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerShow: true,
    // isChecked: false,
  },
  // toggleIsChecked() {
  //   this.setData({
  //     isChecked: !this.data.isChecked,
  //   })
  // },
  // openPrivacyContract() {
  //   wx.openPrivacyContract({
  //     success: res => {
  //       console.log('openPrivacyContract success')
  //     },
  //     fail: res => {
  //       console.error('openPrivacyContract fail', res)
  //     }
  //   })
  // },

  async getPhoneNumber(e) {
    try {
      var res = await cloudAction.cloudGetPhoneNumber(e.detail.cloudID);
      verboseLog("this is res:", res);
      if (res.countryCode != "86") {
        wx.showToast({
          title: '请使用国内手机号',
          icon: 'error',
          duration: 2000,
        });
      }
      else {
        wx.redirectTo({
          url: '/pages/personal-info/personal-info?item=' + JSON.stringify({phonePersonal: res.purePhoneNumber}),
        })
      }
    } catch (err) {
      verboseError(err);
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