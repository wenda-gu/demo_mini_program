// pages/invoice-add/invoice-add.js
const db = wx.cloud.database();

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
    getApp().verboseLog(e.detail)
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
    var b = this.data.isVAT;
    this.setData({
      isVAT: !b
    });
  },

  toggleDefault() {
    var b = this.data.isDefault;
    this.setData({
      isDefault: !b
    });
  },

  btnSubmit(res) {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });

    const formData = {
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
    }
    
    getApp().verboseLog(formData)
    // if edit, update; else, add
    const id = this.data.id;
    getApp().verboseLog("this is id: " + id)
    if (id != '') {
      getApp().verboseLog("id is not null, edit");
      db.collection("invoice-title").doc(id).update({
        data: formData
      }).then(res => {
        getApp().verboseLog(res);
        wx.hideLoading();
      });
    }
    else {
      getApp().verboseLog("id is null, add");
      db.collection("invoice-title").add({
        data: formData
      }).then(res => {
        getApp().verboseLog(res);
        wx.hideLoading();
      });
    }
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '添加抬头' });
    if (options.item == null) return;
    let item = JSON.parse(options.item);
    getApp().verboseLog("This is item passed successfully: " + item);
    // personalKey?
    this.setData({
      id: item._id,
      personalKey: item.personalKey,
      isVAT: item.isVAT,
      name: item.name,
      taxId: item.taxId,
      isDefault: item.isDefault,
      address: item.address,
      phoneCompany: item.phoneCompany,
      bankName: item.bankName,
      bankAccount: item.bankAccount,
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