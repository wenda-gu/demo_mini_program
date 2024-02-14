// pages/invoice-add/invoice-add.js

import validation from "../../static/utils/validation.js";
import dbAction from "../../static/utils/dbAction.js";
import {verboseLog} from "../../static/utils/logging";
import {showSubmitting, showAddSuccess, showAddFailed, showSubmissionFailed, showEditSuccess, showEditFailed} from "../../static/utils/wxapi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: String,
    // isVAT: false,
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
    isEditing: true,
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

  // toggleVAT() {
  //   verboseLog("invoice-add.toggleVAT() isVAT before:", this.data.isVAT);
  //   this.setData({
  //     isVAT: !this.data.isVAT
  //   });
  //   verboseLog("invoice-add.toggleVAT() isVAT after:", this.data.isVAT);
  // },

  toggleDefault() {
    verboseLog("invoice-add.toggleVAT() isDefault before:", this.data.isDefault);
    this.setData({
      isDefault: !this.data.isDefault
    });
    verboseLog("invoice-add.toggleVAT() isDefault after:", this.data.isDefault);
  },
  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },


  async resetDefault(isDefault, isDefaultOriginal) {
    return new Promise((resolve, reject) => {
      verboseLog("invoice-add.resetDefault()");
      if ( !isDefault ) {
        verboseLog("invoice-add.resetDefault() isDefault is false, no change");
        resolve("invoice-add.resetDefault() isDefault is false, no change");
      }
      else if ( isDefaultOriginal ) {
        verboseLog("invoice-add.resetDefault() isDefaultOriginal is true, no change");
        resolve("invoice-add.resetDefault() isDefaultOriginal is true, no change");
      }
      else {
        dbAction.getAllInvoiceTitles().then((items) => {
          verboseLog("invoice-add.resetDefault() got invoice title(s):", items);
          const promises = [];
          items.forEach((item) => {
            const id = item._id;
            verboseLog("invoice-add.resetDefault() added id:", id);
            item.isDefault = false
            delete item._id;
            delete item._openid;
            verboseLog("invoice-add.resetDefault() this is item:", item);
            promises.push(dbAction.editInvoiceTitleById(id, item));
          });
          Promise.all(promises).then((res) => {
            verboseLog("invoice-add.resetDefault() success.");
            resolve("invoice-add.resetDefault() success.");
          }).catch((err) => {
            console.error("invoice-add.resetDefault() failed:");
            reject(err);
          });
        }).catch((err) => {
          console.error("invoice-add.resetDefault() dbAction.getAllInvoiceTitles() failed:", err);
          reject(err);
        });
      }
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

  async isValid() {
    return new Promise((resolve, reject) => {
      if (validation.isEmpty(this.data.companyName, String)) {
        console.error("invoice-add.isValid() no companyName.");
        reject("No companyName.");
      }
      else if (validation.isEmpty(this.data.taxId, String)) {
        console.error("invoice-add.isValid() no taxId.");
        reject("No taxId.");
      }
      else if (validation.isEmpty(this.data.phoneReceive, Number)) {
        console.error("invoice-add.isValid() no phoneReceive.");
        reject("No phoneReceive.");
      }
      else if (validation.isEmpty(this.data.emailReceive, String)) {
        console.error("invoice-add.isValid() no emailReceive.");
        reject("No emailReceive.");
      }
      else {
        if (!validation.validateTaxId(this.data.taxId)) {
          console.error("invoice-add.isValid() wrong format taxId.");
          reject("Wrong format taxId.");
        }
        else if (!validation.validatePhoneNumAndSymbols(this.data.phoneCompany) && !(this.data.phoneCompany == Number)) {
          console.error("invoice-add.isValid() wrong format phoneCompany.");
          reject("Wrong format phoneCompany.");
        }
        else if (!validation.validateNum(this.data.bankAccount) && !(this.data.bankAccount == Number)) {
          console.error("invoice-add.isValid() wrong format bankAccount.");
          reject("Wrong format bankAccount.");
        }
        else if (!validation.validateCellphone(this.data.phoneReceive)) {
          console.error("invoice-add.isValid() wrong format phoneReceive.");
          reject("Wrong format phoneReceive.");
        }
        else if (!validation.validateEmail(this.data.emailReceive)) {
          console.error("invoice-add.isValid() wrong format emailReceive.");
          reject("Wrong format emailReceive.");
        }
        else {
          verboseLog("invoice-add.isValid() success.");
          resolve("invoice-add.isValid() success.");
        }
      }
    });
  },

  async btnSubmit() {
    showSubmitting();
    this.toggleIsEditing();
    try {
      await this.isValid();
      const formData = this.prepareForm();
      const isDefault = this.data.isDefault;
      verboseLog("invoice-add.btnSubmit() submitting:", formData);
      verboseLog("invoice-add.btnSubmit() item isDefault:", isDefault);
      // reset all titles' isDefault to false, if current isDefault if true
      this.resetDefault(isDefault, this.data.isDefaultOriginal).then((res) => {
        const id = this.data.id;
        verboseLog("invoice-add.btnSubmit() item id: " + id);
        // if edit, update; else, add
        if (id != String) {
          verboseLog("invoice-add.btnSubmit() id is not null, as edit");
          verboseLog("invoice-add.btnSubmit() submitting:", formData);
          dbAction.editInvoiceTitleById(id, formData).then((res) => {
            verboseLog("invoice-add.btnSubmit() edit success.");
            wx.disableAlertBeforeUnload();
            wx.hideLoading();
            showEditSuccess();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 800);;
          }).catch((err) => {
            console.error("invoice-add.btnSubmit() editInvoiceTitleById() failed:", err);
            wx.hideLoading();
            showEditFailed();
          });
        }
        else {
          verboseLog("invoice-add.btnSubmit() id is null, as add");
          dbAction.addInvoiceTitle(formData).then((res) => {
            verboseLog("invoice-add.btnSubmit() addInvoiceTitle() success.");
            wx.disableAlertBeforeUnload();
            wx.hideLoading();
            showAddSuccess();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 800);
          }).catch((err) => {
            console.error("invoice-add.btnSubmit() addInvoiceTitle() failed:", err);
            wx.hideLoading();
            showAddFailed();
          });
        };
      }).catch((err) => {
        console.error("invoice-add.btnSubmit() resetDefault() failed:", err);
        wx.hideLoading();
        showSubmissionFailed();
      });
    } catch (err) {
      console.error("invoice-add.btnSubmit() isValid() failed:", err);
      wx.hideLoading();
      var msg, iconStr = 'error';
      switch(err) {
        case "No companyName.":
          msg = "请填写单位名称";
          this.toggleIsEditing();
          break;
        case "No taxId.":
          msg = "请填写税号";
          this.toggleIsEditing();
          break;
        case "No phoneReceive.":
          msg = "请填写个人手机";
          this.toggleIsEditing();
          break;
        case "No emailReceive.":
          msg = "请填写个人邮箱";
          this.toggleIsEditing();
          break;
        case "Wrong format taxId.":
          msg = "税号格式错误";
          iconStr = "none";
          this.toggleIsEditing();
          break;
        case "Wrong format phoneCompany.":
          msg = "单位电话格式错误";
          iconStr = "none";
          this.toggleIsEditing();
          break;
        case "Wrong format bankAccount.":
          msg = "银行账号格式错误";
          iconStr = "none";
          this.toggleIsEditing();
          break;
        case "Wrong format phoneReceive.":
          msg = "个人手机号格式错误";
          iconStr = "none";
          this.toggleIsEditing();
          break;
        case "Wrong format emailReceive.":
          msg = "个人邮箱格式错误";
          iconStr = "none";
          this.toggleIsEditing();
          break;
      }
      wx.showToast({
        title: msg,
        icon: iconStr,
        duration: 2000,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '添加抬头' });
    wx.enableAlertBeforeUnload({
      message: '尚未保存，是否返回',
    });
    if (options.item == null) return;
    const item = JSON.parse(options.item);
    verboseLog("invoice-add.onLoad() got item:", item);
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