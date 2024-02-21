// pages/registration-select-accommodation/registration-select-accommodation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoDocId: String,
    conferenceId: String,
    accommodations: Object,
    chosenPackage: String,
    chooseAccommodation: true,
    isEditing: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      wx.enableAlertBeforeUnload({
        message: '尚未保存，是否返回',
      });
      wx.setNavigationBarTitle({ title: '住宿选择' });
      if (options.item == null || options.item == "") {
        console.error("registration-select-accommodation no input");
        wx.navigateBack();
        return;
      }
      const item = JSON.parse(options.item);
      this.setData({
        personalInfoDocId: item.personalInfoDocId,
        conferenceId: item.conferenceId,
        accommodations: await dbAction.getAccommodations(item.conferenceId),
        chosenPackage: await dbAction.getConferenceRegistrationChosenPackage(item.conferenceId),
      });
    } catch (err) {
      console.error("registration-select-package.accommodation() failed:\n", err);
    }
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