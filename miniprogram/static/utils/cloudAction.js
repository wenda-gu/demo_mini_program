
// static/utils/cloudAction.js

import dbAction from "./dbAction.js";
import { verboseError, verboseLog } from "./logging";

// Wrapper for wx.cloud.callFunction with no param other than name
function wxcallCloudFunction(name) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

// Get basic user info: openid, appid, unionid
function wxgetBasicUserInfo() {
  return new Promise((resolve, reject) => {
    wxcallCloudFunction("test")
    .then((res) => {
      resolve(res.result);
    }).catch((err) => {
      reject(err);
    });
  });
}

// Get openid from wxgetBasicUserInfo()
function wxgetOpenId() {
  return new Promise((resolve, reject) => {
    wxgetBasicUserInfo().then((res) => {
      resolve(res.OPENID);
    }).catch((err) => {
      reject(err);
    });
  });
}

// 
function isNewUser() {
  return new Promise((resolve, reject) => {
    dbAction.getPersonalInfo().then((res) => {
      var data = res.data;
      verboseLog("cloudAction.isNewUser() res.data:", data);
      // data length is 1, exists
      if (data.length) {
        resolve({
          isNewUser: false,
          data: data[0],
        });
      }
      // data length is 0, new user
      else {
        resolve({
          isNewUser: true,
        });
      }
    }).catch((err) => {
      verboseError("cloudAction.isNewUser() failed:", err);
      reject(err);
    });
  });
}


export default {
  wxcallCloudFunction: wxcallCloudFunction,
  wxgetOpenId: wxgetOpenId,
  wxgetBasicUserInfo: wxgetBasicUserInfo,
  isNewUser: isNewUser,
}