// pages/invoice-add/invoice-add.js

import validation from "../../static/utils/validation.js";
import logging from "../../static/utils/logging.js";
import dbAction from "../../static/utils/dbAction.js";
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: String,
    isVAT: false,
    companyName: String,
    taxId: String,
    isDefault: false,
    isDefaultOriginal: false,
    address: String,
    phoneCompany: Number,
    bankName: String,
    bankAccount: Number,
    phoneReceive: Number,
    emailReceive: String,
  },

  handleCompanyName(e) {
    this.setData({
      companyName: e.detail
    })
  },
  handleTaxId(e) {
    this.setData({
      taxId: e.detail
    })
  },
  handleAddress(e) {
    this.setData({
      address: e.detail
    })
  },
  handlePhoneCompany(e) {
    this.setData({
      phoneCompany: e.detail
    })
  },
  handleBankName(e) {
    this.setData({
      bankName: e.detail
    })
  },
  handleBankAccount(e) {
    this.setData({
      bankAccount: e.detail
    })
  },
  handlePhoneReceive(e) {
    this.setData({
      phoneReceive: e.detail
    })
  },
  handleEmailReceive(e) {
    this.setData({
      emailReceive: e.detail
    })
  },


  
  toggleVAT() {
    logging.verboseLog("invoice-add.toggleVAT() isVAT before:", this.data.isVAT);
    this.setData({
      isVAT: !this.data.isVAT
    });
    logging.verboseLog("invoice-add.toggleVAT() isVAT after:", this.data.isVAT);
  },

  toggleDefault() {
    logging.verboseLog("invoice-add.toggleVAT() isDefault before:", this.data.isDefault);
    this.setData({
      isDefault: !this.data.isDefault
    });
    logging.verboseLog("invoice-add.toggleVAT() isDefault after:", this.data.isDefault);
  },



  resetDefault(isDefault, isDefaultOriginal) {
    return new Promise((resolve, reject) => {
      logging.verboseLog("invoice-add.resetDefault()");
      if ( !isDefault ) {
        logging.verboseLog("invoice-add.resetDefault() isDefault is false, no change");
        resolve("invoice-add.resetDefault() isDefault is false, no change");
      }
      else if ( isDefaultOriginal ) {
        logging.verboseLog("invoice-add.resetDefault() isDefaultOriginal is true, no change");
        resolve("invoice-add.resetDefault() isDefaultOriginal is true, no change");
      }
      else {
        dbAction.getAllInvoiceTitles("oUZen5VZ_i-ylfHrUr3RNfTqxypI").then((items) => {
          logging.verboseLog("invoice-add.resetDefault() got invoice title(s):", items);
          const promises = [];
          items.forEach((item) => {
            const id = item._id;
            logging.verboseLog("invoice-add.resetDefault() added id:", id);
            item.isDefault = false
            delete item._id;
            delete item._openid;
            logging.verboseLog("invoice-add.resetDefault() this is item:", item);
            promises.push(this.editInvoiceTitleById(id, item));
          });
          Promise.all(promises).then((res) => {
            logging.verboseLog("invoice-add.resetDefault() success.");
            resolve("invoice-add.resetDefault() success.");
          }).catch((err) => {
            logging.verboseError("invoice-add.resetDefault() failed:");
            reject(err);
          });
        }).catch((err) => {
          logging.verboseError("invoice-add.resetDefault() dbAction.getAllInvoiceTitles() failed:", err);
          reject(err);
        });
      }
    });
  }, 

  editInvoiceTitleById(id, formData) {
    return new Promise((resolve, reject) => {
      logging.verboseLog("invoice-add.editInvoiceTitleById() this is formData", formData);
      db.collection("invoice-title").doc(id).update({
        data: formData,
      }).then(res => {
        logging.verboseLog("invoice-add.editInvoiceTitleById() success for id:", id);
        resolve("invoice-add.editInvoiceTitleById() success.");
      }).catch((err) => {
        logging.verboseError("invoice-add.editInvoiceTitleById() failed:", id);
        reject(err);
      });
    });
  },

  addInvoiceTitle(formData) {
    return new Promise((resolve, reject) => {
      logging.verboseLog("this is form:", formData);
      db.collection("invoice-title").add({
        data: formData,
      }).then(res => {
        logging.verboseLog("invoice-add.addInvoiceTitle() success:", formData);
        resolve("invoice-add.addInvoiceTitle() success.")
      }).catch((err) => {
        logging.verboseError("invoice-add.addInvoiceTitle() failed:", err);
        reject(err);
      });
    });
  },

  prepareForm() {
    return {
      isVAT: this.data.isVAT,
      companyName: this.data.companyName,
      taxId: this.data.taxId,
      isDefault: this.data.isDefault,
      address: this.data.address,
      phoneCompany: this.data.phoneCompany,
      bankName: this.data.bankName,
      bankAccount: this.data.bankAccount,
      phoneReceive: this.data.phoneReceive,
      emailReceive: this.data.emailReceive,
    };
  },

  isValid() {
    return new Promise((resolve, reject) => {
      if (this.data.companyName == String || this.data.companyName == '') {
        logging.verboseError("invoice-add.isValid() no companyName.");
        reject("No companyName.");
      }
      else if (this.data.taxId == String || this.data.taxId == '') {
        logging.verboseError("invoice-add.isValid() no taxId.");
        reject("No taxId.");
      }
      else if (this.data.phoneReceive == Number || this.data.phoneReceive == '') {
        logging.verboseError("invoice-add.isValid() no phoneReceive.");
        reject("No phoneReceive.");
      }
      else if (this.data.emailReceive == String || this.data.emailReceive == '') {
        logging.verboseError("invoice-add.isValid() no emailReceive.");
        reject("No emailReceive.");
      }
      else {
        if (!validation.validateTaxId(this.data.taxId)) {
          logging.verboseError("invoice-add.isValid() wrong format taxId.");
          reject("Wrong format taxId.");
        }
        else if (!validation.validatePhoneNumAndSymbols(this.data.phoneCompany) && !(this.data.phoneCompany == Number)) {
          logging.verboseError("invoice-add.isValid() wrong format phoneCompany.");
          reject("Wrong format phoneCompany.");
        }
        else if (!validation.validateNum(this.data.bankAccount) && !(this.data.bankAccount == Number)) {
          logging.verboseError("invoice-add.isValid() wrong format bankAccount.");
          reject("Wrong format bankAccount.");
        }
        else if (!validation.validateNumNotEmpty(this.data.phoneReceive)) {
          logging.verboseError("invoice-add.isValid() wrong format phoneReceive.");
          reject("Wrong format phoneReceive.");
        }
        else if (!validation.validateEmail(this.data.emailReceive)) {
          logging.verboseError("invoice-add.isValid() wrong format emailReceive.");
          reject("Wrong format emailReceive.");
        }
        else {
          logging.verboseLog("invoice-add.isValid() success.");
          resolve("invoice-add.isValid() success.");
        }
      }
    });
  },

  btnSubmit() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '提交中',
        mask: true,
      });
      this.isValid().then((res) => {
        const formData = this.prepareForm();
        const isDefault = this.data.isDefault;
        logging.verboseLog("invoice-add.btnSubmit() submitting:", formData);
        logging.verboseLog("invoice-add.btnSubmit() item isDefault:", isDefault);
        // reset all titles' isDefault to false, if current isDefault if true
        this.resetDefault(isDefault, this.data.isDefaultOriginal).then((res) => {
          const id = this.data.id;
          logging.verboseLog("invoice-add.btnSubmit() item id: " + id);
          // if edit, update; else, add
          if (id != String) {
            logging.verboseLog("invoice-add.btnSubmit() id is not null, as edit");
            logging.verboseLog("invoice-add.btnSubmit() submitting:", formData);
            this.editInvoiceTitleById(id, formData).then((res) => {
              logging.verboseLog("invoice-add.btnSubmit() edit success.");
              wx.hideLoading();
              wx.showToast({
                title: '修改成功',
                duration: 800,
              });
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 800);
              resolve("invoice-add.btnSubmit() success.");
            }).catch((err) => {
              logging.verboseError("invoice-add.btnSubmit() editInvoiceTitleById() failed:", err);
              wx.hideLoading();
              wx.showToast({
                title: '修改失败请重试',
                icon: 'error',
                duration: 2000,
              });
              reject(err);
            });
          }
          else {
            logging.verboseLog("invoice-add.btnSubmit() id is null, as add");
            this.addInvoiceTitle(formData).then((res) => {
              logging.verboseLog("invoice-add.btnSubmit() addInvoiceTitle() success.");
              wx.hideLoading();
              wx.showToast({
                title: '添加成功',
                duration: 800,
              });
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 800);
              resolve("invoice-add.btnSubmit() addInvoiceTitle() success.");
            }).catch((err) => {
              logging.verboseError("invoice-add.btnSubmit() addInvoiceTitle() failed:", err);
              wx.hideLoading();
              wx.showToast({
                title: '添加失败请重试',
                icon: 'error',
                duration: 2000,
              });
              reject(err);
            });
          };
        }).catch((err) => {
          logging.verboseError("invoice-add.btnSubmit() resetDefault() failed:", err);
          wx.hideLoading();
          wx.showToast({
            title: '提交失败请重试',
            icon: 'error',
            duration: 2000,
          });
          reject(err);
        });
      }).catch((err) => {
        logging.verboseError("invoice-add.btnSubmit() isValid() failed:", err);
        wx.hideLoading();
        var msg, iconStr = 'error';
        switch(err) {
          case "No companyName.":
            msg = "请填写公司名称";
            break;
          case "No taxId.":
            msg = "请填写税号";
            break;
          case "No phoneReceive.":
            msg = "请填写个人手机";
            break;
          case "No emailReceive.":
            msg = "请填写个人邮箱";
            break;
          case "Wrong format taxId.":
            msg = "税号格式错误";
            iconStr = "none";
            break;
          case "Wrong format phoneCompany.":
            msg = "公司电话格式错误";
            iconStr = "none";
            break;
          case "Wrong format bankAccount.":
            msg = "银行账号格式错误";
            iconStr = "none";
            break;
          case "Wrong format phoneReceive.":
            msg = "个人手机号格式错误";
            iconStr = "none";
            break;
          case "Wrong format emailReceive.":
            msg = "个人邮箱格式错误";
            iconStr = "none";
            break;
        }
        wx.showToast({
          title: msg,
          icon: iconStr,
          duration: 2000,
        });
        reject(err);
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '添加抬头' });
    if (options.item == null) return;
    const item = JSON.parse(options.item);
    logging.verboseLog("invoice-add.onLoad() got item:", item);
    // check if field is undefined
    var address, phoneCompany, bankName, bankAccount;
    if (!item.isVAT) {
      if (item.address == undefined) address = '';
      else address = item.address;
      if ( item.phoneCompany == undefined) phoneCompany = '';
      else phoneCompany = item.phoneCompany;
      if ( item.bankName == undefined) bankName = '';
      else bankName = item.bankName;
      if ( item.bankAccount == undefined) bankAccount = '';
      else bankAccount = item.bankAccount;
    }
    this.setData({
      id: item._id,
      isVAT: item.isVAT,
      companyName: item.companyName,
      taxId: item.taxId,
      isDefault: item.isDefault,
      isDefaultOriginal: item.isDefault,
      address: address,
      phoneCompany: phoneCompany,
      bankName: bankName,
      bankAccount: bankAccount,
      phoneReceive: item.phoneReceive,
      emailReceive: item.emailReceive,
    }); 
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