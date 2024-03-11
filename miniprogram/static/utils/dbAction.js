// static/utils/dbAction.js

import {verboseLog} from "logging.js";
import {formatDate} from "dateTool";
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
  try {
    await wx.cloud.database().collection("personal-info").add({
      data: formData,
    });
    verboseLog("dbAction.addPersonalInfo() success.");
  } catch (err) {
    throw new Error("at dbAction.addPersonalInfo()\n" + err);
  }
}

async function editPersonalInfo(id, formData) {
  verboseLog("This is id:", id);
  try {
    await wx.cloud.database().collection("personal-info").doc(id).update({
      data: formData,
    });
    verboseLog("dbAction.editPersonalInfo() success.");
  } catch (err) {
    throw new Error("at dbAction.editPersonalInfo()\n" + err);
  }
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
async function getAllRegistrationsRaw() {
  try {
    var info = await wx.cloud.database().collection("personal-info").get();
    return info.data[0].registrations;
  } catch (err) {
    throw new Error("at dbAction.getAllRegistrationsRaw()\n" + err);
  }
}

async function getAllRegistrations() {
  try {
    var items = await getAllRegistrationsRaw();
    verboseLog("dbAction.getAllRegistrations() success with registrations:", items);
    if (items == undefined)
      return [];
    else {
      var registrations = [];
      const keys = Object.keys(items);
      for (const key of keys) {
        var conference = await wx.cloud.database().collection("conferences").doc(key).get();
        registrations.push({
          conference: conference.data.name_zh,
          date: formatDate(conference.data.date_start, 'yyyy/mm/dd'),
          isComplete: (items[key].status == "complete" ? true : false),
        });
      }
      return registrations;
    }
  } catch (err) {
    throw new Error("at dbAction.getAllRegistrations()\n" + err);
  }
}

async function updateConferenceRegistrationHelper(id, conferenceId, updateList) {
  try {
    var items = await getAllRegistrationsRaw();
    const keys = Object.keys(items);
    for (const key of keys) {
      if (key == conferenceId) {
        for (const element of updateList) {
          items[key][element[0]] = element[1];
        }
        break;
      }
    }
    console.log("here", items)
    await wx.cloud.database().collection("personal-info").doc(id).update({
      data: {
        registrations: items,
      },
    });
  } catch (err) {
    throw new Error("at dbAction.updateConferenceRegistrationHelper()\n" + err);
  }
}

async function updateConferenceRegistrationStatus(id, conferenceId, status) {
  try {
    await updateConferenceRegistrationHelper(id, conferenceId, [
      ["status", status]
    ]);
  } catch (err) {
    throw new Error("at dbAction.updateConferenceRegistrationStatus()\n" + err);
  }
}

async function selectConferencePackage(id, conferenceId, chosenPackage) {
  try {
    await updateConferenceRegistrationHelper(id, conferenceId, [
      ["chosenPackage", chosenPackage]
    ]);
  } catch (err) {
    throw new Error("at dbAction.selectConferencePackage()\n" + err);
  }
}

async function selectConferencePackageAndUpdateStatus(id, conferenceId, chosenPackage) {
  try {
    await updateConferenceRegistrationHelper(id, conferenceId, [
      ["chosenPackage", chosenPackage], 
      ["status", "selectAccommodation"]
    ]);
  } catch (err) {
    throw new Error("at dbAction.selectConferencePackageAndUpdateStatus()\n" + err);
  }
}

async function getConferenceRegistrationHelper(conferenceId, field) {
  try {
    const reg = await getAllRegistrationsRaw();
    if (reg != undefined) {
      const keys = Object.keys(reg);
      for (const key of keys) {
        if (key == conferenceId) {
          return reg[key][field];
        }
      }
    }
    else {
      return "personalInfo";
    }
  } catch (err) {
    throw new Error("at dbAction.getConferenceRegistrationHelper()\n" + err);
  }
}

async function getConferenceRegistrationStatus(conferenceId) {
  try {
    return await getConferenceRegistrationHelper(conferenceId, "status");
  } catch (err) {
    throw new Error("at dbAction.getConferenceRegistrationStatus()\n" + err);
  }
}

async function getConferenceRegistrationChosenPackage(conferenceId) {
  try {
    return await getConferenceRegistrationHelper(conferenceId, "chosenPackage");
  } catch (err) {
    throw new Error("at dbAction.getConferenceRegistrationChosenPackage()\n" + err);
  }
}

async function selectAccommodationPackage(id, conferenceId, chosenPackage) {
  try {
    await updateConferenceRegistrationHelper(id, conferenceId, [
      ["chosenAccommodationPackage", chosenPackage]
    ]);
  } catch (err) {
    throw new Error("at dbAction.selectAccommodationPackage()\n" + err);
  }
}

async function selectAccommodationPackageAndUpdateStatus(id, conferenceId, chosenPackage) {
  try {
    await updateConferenceRegistrationHelper(id, conferenceId, [
      ["chosenAccommodationPackage", chosenPackage], 
      ["status", "payment"]
    ]);
  } catch (err) {
    throw new Error("at dbAction.selectAccommodationPackageAndUpdateStatus()\n" + err);
  }
}

async function getAccommodationRegistrationChosenPackage(conferenceId) {
  try {
    const reg = await getAllRegistrationsRaw();
    const keys = Object.keys(reg);
    for (const key of keys) {
      if (key == conferenceId) {
        return reg[key]["accommodation"];
      }
    }
  } catch (err) {
    throw new Error("at dbAction.getAccommodationRegistrationChosenPackage()\n" + err);
  }
}

// conference info
async function getAllConferencesOnRelease() {
  try {
    return await wx.cloud.database().collection("conferences").where({release: true}).get();
  } catch (err) {
    throw new Error("at dbAction.getAllConferences()\n" + err);
  }
}

async function getConferencePackages(conferenceId) {
  try {
    const conference = await wx.cloud.database().collection("conferences").doc(conferenceId).get();
    return conference.data.conference_page.registration.packages;
  } catch (err) {
    throw new Error("at dbAction.getConferencePackages()\n" + err);
  }
}

async function getAccommodations(conferenceId) {
  try {
    const conference = await wx.cloud.database().collection("conferences").doc(conferenceId).get();
    return conference.data.conference_page.accommodations;
  } catch (err) {
    throw new Error("at dbAction.getConferencePackages()\n" + err);
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

  getAllRegistrationsRaw: getAllRegistrationsRaw,
  getAllRegistrations: getAllRegistrations,
  updateConferenceRegistrationStatus: updateConferenceRegistrationStatus,
  selectConferencePackage: selectConferencePackage,
  selectConferencePackageAndUpdateStatus: selectConferencePackageAndUpdateStatus,
  getConferenceRegistrationStatus: getConferenceRegistrationStatus,
  getConferenceRegistrationChosenPackage: getConferenceRegistrationChosenPackage,
  selectAccommodationPackage: selectAccommodationPackage,
  selectAccommodationPackageAndUpdateStatus: selectAccommodationPackageAndUpdateStatus,
  getAccommodationRegistrationChosenPackage: getAccommodationRegistrationChosenPackage,

  getAllConferencesOnRelease: getAllConferencesOnRelease,
  getConferencePackages: getConferencePackages,
  getAccommodations: getAccommodations,

  getDataWrapper: getDataWrapper,
  getData: getData,
}
