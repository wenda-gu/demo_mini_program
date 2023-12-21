// pages/invoice-add/invoice-add.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  
  isVAT() {
    this.selectComponent("#address").toggleRequired();
    this.selectComponent("#phoneCompany").toggleRequired();
    this.selectComponent("#bankName").toggleRequired();
    this.selectComponent("#bankAccount").toggleRequired();
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
    console.log(res.detail.value)
    var content = res.detail.value;
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