
// static/utils/storageAction.js

import { verboseError, verboseLog } from "./logging";

// upload file
function uploadFile(data) {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile(data)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

// upload file
function deleteFile(files) {
  return new Promise((resolve, reject) => {
    verboseLog("here:", (typeof files == "string"))
    var data = {fileList: files};
    if (typeof files == "string") {
      data = {fileList: [files]};
    }
    wx.cloud.deleteFile(data)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

export default {
  uploadFile: uploadFile,
  deleteFile: deleteFile
}