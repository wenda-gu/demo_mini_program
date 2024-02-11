// static/utils/dbAction.js

import {verboseLog, verboseError} from "logging.js";
// Methods

// INVOICE
async function addInvoiceTitle(formData) {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("invoice-title").add({
      data: formData,
    }).then((res) => {
      resolve("dbAction.addInvoiceTitle() success.")
    }).catch((err) => {
      reject({
        errMsg: "dbAction.addInvoiceTitle() failed.",
        err,
      });
    });
  });
}

async function deleteInvoiceTitleById(id) {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("invoice-title").doc(id).remove()
    .then((res) => {
      resolve("dbAction.deleteInvoiceTitle() success.");
    }).catch((err) => {
      reject({
        errMsg: "dbAction.deleteInvoiceTitle() failed.",
        err,
      });
    });
  });
}

async function editInvoiceTitleById(id, formData) {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("invoice-title").doc(id).update({
      data: formData,
    }).then(res => {
      resolve("dbAction.editInvoiceTitleById() success.");
    }).catch((err) => {
      reject({
        errMsg: "dbAction.editInvoiceTitleById() failed.",
        err,
      });
    });
  });
}

// Get all invoice titles that matches the user openid
async function getAllInvoiceTitles() {
  return new Promise((resolve, reject) => {
    verboseLog("dbAction.getAllInvoiceTitles()");
    wx.cloud.database().collection("invoice-title").get().then(res => {
      var ret = res.data;
      verboseLog("dbAction.getAllInvoiceTitles() gets invoice title(s):", ret);
      resolve(ret);
    }).catch((err) => {
      reject({
        errMsg: "dbAction.getAllInvoiceTitles() failed.",
        err,
      });
    });
  });
}



// Personal Info
async function getPersonalInfo() {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("personal-info").get().then((res) => {
      verboseLog("dbAction.getPersonalInfo() success:", res);
      resolve(res);
    }).catch((err) => {
      reject({
        errMsg: "dbAction.getPersonalInfo() failed.",
        err,
      });
    });
  });
}

async function addPersonalInfo(formData) {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("personal-info").add({
      data: formData,
    }).then((res) => {
      verboseLog("dbAction.editPersonalInfo() success:", res);
      resolve(res);
    }).catch((err) => {
      reject({
        errMsg: "dbAction.editPersonalInfo() failed.",
        err,
      });
    });
  });
}

async function editPersonalInfo(id, formData) {
  return new Promise((resolve, reject) => {
    verboseLog("This is id:", id)
    wx.cloud.database().collection("personal-info").doc(id).update({
      data: formData,
    }).then((res) => {
      verboseLog("dbAction.editPersonalInfo() success:", res);
      resolve(res);
    }).catch((err) => {
      reject({
        errMsg: "dbAction.editPersonalInfo() failed.",
        err,
      });
    });
  });
}

async function editAvatarUrl(id, url) {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection("personal-info").doc(id).update({
      data: {
        avatarUrl: url,
      },
    }).then((res) => {
      verboseLog("dbAction.editAvatarUrl() success:", res);
      resolve(res);
    }).catch((err) => {
      reject({
        errMsg: "dbAction.editAvatarUrl() failed.",
        err,
      });
    });
  });
}

// Exporting methods
export default {
  addInvoiceTitle: addInvoiceTitle,
  deleteInvoiceTitleById: deleteInvoiceTitleById,
  editInvoiceTitleById: editInvoiceTitleById,
  getAllInvoiceTitles: getAllInvoiceTitles,
  getPersonalInfo: getPersonalInfo,
  addPersonalInfo: addPersonalInfo,
  editPersonalInfo: editPersonalInfo,
  editAvatarUrl: editAvatarUrl,
}
