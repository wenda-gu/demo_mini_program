// static/utils/dbAction.js

import {verboseLog} from "logging.js";
import dateTool from "dateTool.js"
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

// registration info
async function getAllRegistrations() {
  try {
    var info = await wx.cloud.database().collection("personal-info").get();
    var items = info.data[0].registrations;
    verboseLog("dbAction.getAllRegistrations() success with registrations:", info.data[0]);
    if (items == undefined)
      return [];
    else {
      var registrations = [];
      for (const element of items) {
        var conference = await wx.cloud.database().collection("conferences").doc(element.conference).get();
        registrations.push({
          conference: conference.data.name_zh,
          date: dateTool.formatDate(conference.data.date_start, 'yyyy/mm/dd'),
          isComplete: element.isComplete,
        });
      }
      return registrations;
    }
  } catch (err) {
    throw new Error("at dbAction.getAllRegistrations()\n" + err);
  }
}

// general get for invoice and registration page
async function getDataWrapper(mode, pageName) {
  try {
    var funcName, loadingTitle, toastTitle;
    if (mode == "show") {
      funcName = `${pageName}.onShow()`;
      loadingTitle = "加载中";
      toastTitle = "加载失败请刷新";
    }
    else {
      funcName = `${pageName}.onPullDownRefresh()`;
      loadingTitle = "刷新中";
      toastTitle = "刷新失败请重试";
    }
    wx.showLoading({
      title: loadingTitle,
      mask: true,
    });
    var items = await this.getData(pageName);
    verboseLog(`${funcName} getData() success.`);
    wx.hideLoading();
    return items;
  } catch (err) {
    wx.hideLoading();
    wx.showToast({
      title: toastTitle,
      icon: 'error',
      duration: 2000,
    });
    throw new Error(`at ${funcName} getDataWrapper()\n` + err);
  }
}

async function getData(pageName){
  try {
    var items;
    if (pageName == "invoice") 
      items = await this.getAllInvoiceTitles();
    else
      items = await this.getAllRegistrations();
    verboseLog(`${pageName}.getData() success with items:`, items);
    return items;
  } catch (err)  {
    throw new Error(`at ${pageName}.getData()\n` + err);
  }
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
  getAllRegistrations: getAllRegistrations,
  getDataWrapper: getDataWrapper,
  getData: getData,
}
