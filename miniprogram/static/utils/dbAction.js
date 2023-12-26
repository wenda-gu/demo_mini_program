// static/utils/dbAction.js

import logging from "logging.js";

// Methods
function getAllInvoiceTitles(){
  return new Promise((resolve, reject) => {
    logging.verboseLog("dbAction.getAllInvoiceTitles()");
    wx.cloud.database().collection("invoice-title").get().then(res => {
      var ret = res.data;
      logging.verboseLog("dbAction.getAllInvoiceTitles() gets invoice title(s):", ret);
      resolve(ret);
    }).catch((err) => {
      logging.verboseError("dbAction.getAllInvoiceTitles() failed:", err);
      reject(err);
    });
  });
}

// Exporting methods
export default {
  getAllInvoiceTitles: getAllInvoiceTitles,
}
