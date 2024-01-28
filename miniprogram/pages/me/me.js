// pages/me/me.js
import { verboseLog, verboseError } from "../../static/utils/logging";
import dbAction from "../../static/utils/dbAction.js";
import storageAction from "../../static/utils/storageAction.js";
import validation from "../../static/utils/validation.js";


const userLogin = getApp().userLogin
const global = getApp().globalData;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: String,
    userInfo: Object,
    avatarUrl: String,
    loggedin: false,
  },

  handleChooseAvatar(e) {
    var tempAvatar = e.detail.avatarUrl, newAvatar, oldAvatar;
    if (tempAvatar) {
      storageAction.uploadFile({
        // cloudPath: `avatar/aaa`,
        cloudPath: `avatar/${global.personalInfoDocId}_${Number(new Date())}`,
        filePath: tempAvatar,
      }).then((res) => {
        newAvatar = res.fileID;
        oldAvatar = this.data.avatarUrl;
        this.setData({
          avatarUrl: newAvatar,
        });
        global.avatarUrl = newAvatar;
        dbAction.editAvatarUrl(global.personalInfoDocId, newAvatar).then((res) => {
          verboseLog("me.handleChooseAvatar() editAvatarUrl() update avatarUrl success.");
        }).catch((err) => {
          verboseError("me.handleChooseAvatar() editAvatarUrl() update avatarUrl failed:", err);
        });
        if (!validation.isDefaultAvatar(oldAvatar)) {
          storageAction.deleteFile(oldAvatar).catch(err => {
            verboseError("me.handleChooseAvatar() deleteFile() delete old avatarUrl failed:", err);
          });
        }
        verboseLog("me.handleChooseAvatar() uploadFile() upload avatar success.");
      }).catch((err) => {
        verboseError("me.handleChooseAvatar() uploadFile() upload avatar failed:", err);
      });
      
    }
  },

  setupPage() {
    var title = global.personalInfo.companyName + global.personalInfo.department;
    if (global.personalInfo.isHealthcareWorker) {
      title += global.personalInfo.title;
    }
    else {
      title += global.personalInfo.position;
    }
    this.setData({
      title: title,
      userInfo: global.personalInfo,
      avatarUrl: global.avatarUrl,
      loggedin: true,
    });
  },

  navToPersonalInfo() {
    if (!this.data.loggedin) {
      verboseError("me.navToPersonalInfo() user not logged in. Retry later.");
      return;
    }
    var destination = '/pages/personal-info/personal-info?item=' + JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: destination,
    }).then(res => {
      verboseLog("me.navToPersonalInfo() nav to personal-info:", destination);
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
    if ( global.loggedin ) {
      this.setupPage();
      verboseLog("me.onLoad() already logged in, success.");
    }
    else {
      verboseLog("me.onLoad()");
      userLogin().then((res) => {
        this.setupPage();
        verboseLog("me.onLoad() logged in success.");
      }).catch((err) => {
        verboseError("me.onLoad() failed:", err);
      });
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