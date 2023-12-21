// pages/invoice-add/invoice-add.js
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

  addData() {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
    db.collection("invoice").add({
      data: {
        id: "",
        name: "",
        taxId: "",
        address: "",
        phoneCompany: "",
        bankName: "",
        bankAccount: "",
        phonePersonal: "",
        email: ""
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading();
    });
  },

  btnSubmit(res) {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
    // var content = res.detail.value;
    // db.collection("testdb").add({
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