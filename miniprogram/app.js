// app.js

import {verboseLog, verboseError} from "/static/utils/logging.js";
import {wxapi, wxsetData} from "/static/utils/wxapi.js";
import cloudAction from "/static/utils/cloudAction.js";

App({
  globalData: {
    loggedin: false,
    _openid: String,
    personalInfo: {
      
    },
  },

  onLaunch: function () {
    // Cloud Env
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'bsc-db-6g55uugs8cdb24fc',
        traceUser: true,
      });
      console.log("here")
    }
    if (!this.globalData.loggedin) this.userLogin();
  },

  userLogin: function () {
    return new Promise((resolve, reject) => {
      // if new user, create entry in database and prompt user to set up profile; else, load user info
      cloudAction.isNewUser().then((res) => {
        if (res.isNewUser) {
          verboseLog("App.onLaunch() new user");
          wx.getUserInfo().then((res) => {
            var userInfo = JSON.parse(res.rawData);
            verboseLog("App.onLaunch() wx.getUserInfo() success:", userInfo);
            // TODO: logic for signing up
            userInfo.avatarUrl
            // set login status to true
            this.globalData.loggedin = true;
            resolve("App.onLaunch() new user");
          }).catch((err) => {
            verboseError("App.onLaunch() wx.getUserInfo() failed:", err);
            reject("App.onLaunch() wx.getUserInfo() failed:", err);
          });
        }
        else {
          verboseLog("App.onLaunch() user exists:", res.data);
          var personalInfo = res.data;
          this.globalData._openid = personalInfo._openid;
          delete personalInfo._id;
          delete personalInfo._openid;
          this.globalData.personalInfo = personalInfo;
          verboseLog("App.onLaunch() openid is set:", this.globalData._openid);
          verboseLog("App.onLaunch() personal info is set:", this.globalData.personalInfo);
          // set login status to true
          this.globalData.loggedin = true;
          resolve("App.onLaunch() user exists:", res.data);
        }
      }).catch((err) => {
        verboseError("App.onLaunch() cloudAction.isNewUser() failed:", err);
        reject("App.onLaunch() cloudAction.isNewUser() failed:", err);
      });

    });
  }
  
});
