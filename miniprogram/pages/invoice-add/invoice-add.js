// pages/invoice-add/invoice-add.js
const db = wx.cloud.database(), App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    personalKey: Number,
    isVAT: false,
    name: String,
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

  handleName(e) {
    this.setData({
      name: e.detail
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
    App.verboseLog("invoice-add.toggleVAT() isVAT before:", this.data.isVAT);
    this.setData({
      isVAT: !this.data.isVAT
    });
    App.verboseLog("invoice-add.toggleVAT() isVAT after:", this.data.isVAT);
  },

  toggleDefault() {
    App.verboseLog("invoice-add.toggleVAT() isDefault before:", this.data.isDefault);
    this.setData({
      isDefault: !this.data.isDefault
    });
    App.verboseLog("invoice-add.toggleVAT() isDefault after:", this.data.isDefault);
  },



  resetDefault(isDefault, isDefaultOriginal) {
    return new Promise((resolve, reject) => {
      App.verboseLog("invoice-add.resetDefault()");
      if ( !isDefault ) {
        App.verboseLog("invoice-add.resetDefault() isDefault is false, no change");
        resolve("invoice-add.resetDefault() isDefault is false, no change");
      }
      else if ( isDefaultOriginal ) {
        App.verboseLog("invoice-add.resetDefault() isDefaultOriginal is true, no change");
        resolve("invoice-add.resetDefault() isDefaultOriginal is true, no change");
      }
      else {
        App.getAllInvoiceTitles("oUZen5VZ_i-ylfHrUr3RNfTqxypI").then((items) => {
          App.verboseLog("invoice-add.resetDefault() got invoice title(s):", items);
          const promises = [];
          items.forEach((item) => {
            const id = item._id;
            App.verboseLog("invoice-add.resetDefault() added id:", id);
            item.isDefault = false
            delete item._id;
            delete item._openid;
            App.verboseLog("invoice-add.resetDefault() this is item:", item);
            promises.push(this.editInvoiceTitleById(id, item));
          });
          Promise.all(promises).then((res) => {
            App.verboseLog("invoice-add.resetDefault() success.");
            resolve("invoice-add.resetDefault() success.");
          }).catch((err) => {
            console.error("invoice-add.resetDefault() failed:");
            reject(err);
          });
        }).catch((err) => {
          console.error("invoice-add.resetDefault() App.getAllInvoiceTitles() failed:", err);
          reject(err);
        });
      }
    });
  }, 

  editInvoiceTitleById(id, formData) {
    return new Promise((resolve, reject) => {
      App.verboseLog("invoice-add.editInvoiceTitleById() this is formData", formData);
      db.collection("invoice-title").doc(id).update({
        data: formData,
      }).then(res => {
        App.verboseLog("invoice-add.editInvoiceTitleById() success for id:", id);
        resolve("invoice-add.editInvoiceTitleById() success.");
      }).catch((err) => {
        console.error("invoice-add.editInvoiceTitleById() failed:", id);
        reject(err);
      });
    });
  },

  addInvoiceTitle(formData) {
    return new Promise((resolve, reject) => {
      App.verboseLog("this is form:", formData);
      db.collection("invoice-title").add({
        data: formData,
      }).then(res => {
        App.verboseLog("invoice-add.addInvoiceTitle() success:", formData);
        resolve("invoice-add.addInvoiceTitle() success.")
      }).catch((err) => {
        console.error("invoice-add.addInvoiceTitle() failed:", err);
        reject(err);
      });
    });
  },

  prepareForm() {
    return {
      isVAT: this.data.isVAT,
      name: this.data.name,
      taxId: this.data.taxId,
      isDefault: this.data.isDefault,
      address: this.data.address,
      phoneCompany: this.data.phoneCompany,
      bankName: this.data.bankName,
      bankAccount: this.data.bankAccount,
      phoneReceive: this.data.phoneReceive,
      emailReceive: this.data.emailReceive,
      // make sure to delete after testing
      personalKey: 18916718618,
    };
  },

  isValid() {
    // data = {
    //   name: String,
    //   taxId: String,
    //   address: String,
    //   phoneCompany: Number,
    //   bankName: String,
    //   bankAccount: Number,
    //   phoneReceive: Number,
    //   emailReceive: String,
    // }
    return new Promise((resolve, reject) => {
      var taxId = /[^\w\.\/]/ig;
      var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if ( taxId.test(this.data.taxId) && email.test(this.data.emailReceive) ) {
        App.verboseLog("invoice-add.isValid() success.");
        resolve();
      }
      else {
        reject("aaa");
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
        App.verboseLog("invoice-add.btnSubmit() submitting:", formData);
        App.verboseLog("invoice-add.btnSubmit() item isDefault:", isDefault);
        // reset all titles' isDefault to false, if current isDefault if true
        this.resetDefault(isDefault, this.data.isDefaultOriginal).then((res) => {
          const id = this.data.id;
          App.verboseLog("invoice-add.btnSubmit() item id: " + id);
          // if edit, update; else, add
          if (id != '') {
            App.verboseLog("invoice-add.btnSubmit() id is not null, as edit");
            App.verboseLog("invoice-add.btnSubmit() submitting:", formData);
            this.editInvoiceTitleById(id, formData).then((res) => {
              App.verboseLog("invoice-add.btnSubmit() edit success.");
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
              console.error("invoice-add.btnSubmit() editInvoiceTitleById() failed:", err);
              wx.hideLoading();
              wx.showToast({
                title: '修改失败请重试',
                duration: 2000,
              });
              reject(err);
            });
          }
          else {
            App.verboseLog("invoice-add.btnSubmit() id is null, as add");
            this.addInvoiceTitle(formData).then((res) => {
              App.verboseLog("invoice-add.btnSubmit() addInvoiceTitle() success.");
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
              console.error("invoice-add.btnSubmit() addInvoiceTitle() failed:", err);
              wx.hideLoading();
              wx.showToast({
                title: '添加失败请重试',
                duration: 2000,
              });
              reject(err);
            });
          };
        }).catch((err) => {
          console.error("invoice-add.btnSubmit() resetDefault() failed:", err);
          wx.hideLoading();
          wx.showToast({
            title: '提交失败，请重试',
            duration: 2000,
          });
          reject(err);
        });
      }).catch((err) => {
        console.error("invoice-add.btnSubmit() isValid() failed.");
        wx.hideLoading();
        wx.showToast({
          title: '信息不正确或未填写必填项',
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
    App.verboseLog("invoice-add.onLoad() got item:", item);
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
    // delete personalKey after testing
    this.setData({
      id: item._id,
      personalKey: item.personalKey,
      isVAT: item.isVAT,
      name: item.name,
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