// pages/invoice-add/invoice-add.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  addInvoiceTitle() {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
    db.collection("invoice-title").add({
      data: {
        personKey: "18916718618",
        isVAT: true,
        name: "布鲁锡",
        taxId: "123",
        isDefault: true,
        address: "上海",
        phoneCompany: "123456",
        bankName: "浦发",
        bankAccount: "123456789",
        phoneReceive: "18916718618",
        emailReceive: "18916718618@163.com"
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading();
    });
  },

  btnSubmit(res) {
    // wx.showLoading({
    //   title: '提交中',
    //   mask: true,
    // });

    // const formData = {
    //   name: this.data.name,
    //   phone: this.data.phone
    // }
    console.log(this.data)
    // var content = res.detail.value;
    // db.collection("invoice-title").add({
    //   data: content
    // }).then(res => {
    //   console.log(res);
    //   wx.hideLoading();
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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