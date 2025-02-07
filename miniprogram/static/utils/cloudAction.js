
// static/utils/cloudAction.js

import dbAction from "./dbAction.js";
import {verboseLog} from "./logging";

// Wrapper for wx.cloud.callFunction with no param other than name
function wxCloudApi(name, param) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
      data: param
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

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
    wxcallCloudFunction("getBasicUserInfo")
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
      console.error("cloudAction.isNewUser() failed:", err);
      reject(err);
    });
  });
}

// Get basic user info: openid, appid, unionid
function cloudSendVerificationCode(phone) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'sendVerificationCode',
      data: {
        phone: phone
      }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function cloudGetPhoneNumber(cloudID) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "getPhoneNumber",
      data: {
        phoneNumber: wx.cloud.CloudID(cloudID),
      }
    }).then((res) => {
      resolve(res.result.phoneNumber.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function cloudDownload(fileID, downloadToPath) {
  try {
    const temp = await wx.cloud.downloadFile({
      fileID: fileID,
    });
    wx.getFileSystemManager().saveFile({
      tempFilePath: temp.tempFilePath,
      filePath: downloadToPath,
      success: function (res) {
        wx.openDocument({
          filePath: res.savedFilePath,
          showMenu: true,
          success: function (res) {
            return res.savedFilePath;
          }
        });
      },
      fail: function (err) {
        throw new Error("at cloudAction.cloudDownload() wx.getFileSystemManager().saveFile()\n" + err);
      }
    });
  } catch (err) {
    throw new Error("at cloudAction.cloudDownload()\n" + err);
  }
}



export default {
  wxCloudApi: wxCloudApi,
  wxcallCloudFunction: wxcallCloudFunction,
  wxgetOpenId: wxgetOpenId,
  wxgetBasicUserInfo: wxgetBasicUserInfo,
  isNewUser: isNewUser,
  cloudSendVerificationCode: cloudSendVerificationCode,
  cloudGetPhoneNumber: cloudGetPhoneNumber,
  cloudDownload: cloudDownload,
}