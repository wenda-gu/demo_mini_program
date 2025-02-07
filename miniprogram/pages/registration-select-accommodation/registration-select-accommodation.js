// pages/registration-select-accommodation/registration-select-accommodation.js
import dbAction from "../../static/utils/dbAction";
import {verboseLog} from "../../static/utils/logging";
import { navTo, reLaunch, showSaving, showSaveSuccess, showSaveFailed, showSubmissionSuccess, showSubmissionFailed, showSubmitting, showError } from "../../static/utils/wxapi";
const updatePersonalInfo = getApp().updatePersonalInfo;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoDocId: String,
    conferenceId: String,
    accommodations: Object,
    chosenPackage: String,
    chosenAccommodationPackage: [],
    chosenDate: String,
    chosenRoom: String,
    chooseAccommodation: false,
    isEditing: true,
    chooseAccommodationChoice: [
      {value: false, name: "不需要住宿"},
      {value: true, name: "需要住宿"},
    ],
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },

  handleChooseAccommodation(e) {
    var chooseAccommodation = e.detail.value;
    if (chooseAccommodation == "true") {
      this.setData({
        chooseAccommodation: true,
      });
    }
    else {
      this.setData({
        chooseAccommodation: false,
      });
    }
  },

  handleChooseRoom(e) {
    this.setData({
      chosenRoom: e.detail.value,
    });
  },

  listsAreEqual(list1, list2) {
    // Check if both lists have the same length
    if (list1.length !== list2.length) {
        return false;
    }

    // Sort both lists
    list1.sort();
    list2.sort();

    // Iterate over each element and check if they are equal
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
            return false;
        }
    }

    // If all elements are equal, return true
    return true;
  },

  setChosenDate() {
    const dates = this.data.accommodations.dates;
    for (const date of dates) {
      for (const p of date.for_packages) {
        if (this.listsAreEqual(p, this.data.chosenPackage)) {
          this.setData({
            chosenDate: date.date_string,
          });
          return;
        }
      }
    }
  },

  async isValid() {
    if (this.data.chosenRoom == undefined || this.data.chosenRoom == null || this.data.chosenRoom == String || this.data.chosenRoom == '') {
      throw new Error("No room selection.");
    }
  },

  async saveAndExit() {
    try {
      showSaving();
      this.toggleIsEditing();
      verboseLog("registration-select-accommodation.saveAndExit()");
      if (this.data.chosenRoom != String || !this.data.chooseAccommodation) {
        let chosenAccommodationPackage = this.data.chooseAccommodation ? [this.data.chosenDate, this.data.chosenRoom] : ["none"];
        await dbAction.selectAccommodationPackage(this.data.personalInfoDocId, this.data.conferenceId, chosenAccommodationPackage);
        await updatePersonalInfo();
      }

      wx.hideLoading();
      showSaveSuccess();
      reLaunch("../index/index");
    } catch (err) {
      console.error("registration-select-accommodation.saveAndExit() failed:\n", err);
      wx.hideLoading();
      showSaveFailed();
      this.toggleIsEditing();
    }
  },

  async btnSubmit() {
    try {
      showSubmitting();
      this.toggleIsEditing();
      verboseLog("registration-select-accommodation.btnSubmit()");
      let chosenAccommodationPackage = [this.data.chosenDate, this.data.chosenRoom];
      if (this.data.chooseAccommodation) {
        await this.isValid();
      }
      else {
        chosenAccommodationPackage = ["none"];
      }
      await dbAction.selectAccommodationPackageAndUpdateStatus(this.data.personalInfoDocId, this.data.conferenceId, chosenAccommodationPackage);
      await updatePersonalInfo();

      wx.hideLoading();
      showSubmissionSuccess();
      navTo("../registration-payment/registration-payment", {
        conferenceId: this.data.conferenceId,
        personalInfoDocId: this.data.personalInfoDocId,
      });
    } catch (err) {
      console.error("registration-select-accommodation.btnSubmit() failed:\n", err);
      wx.hideLoading();
      switch(err.message) {
        case "No room selection.":
          showError("请选择房型", "error");
          break;
        default:
          showSubmissionFailed();
          break;
      }
      this.toggleIsEditing();
    }
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
      const chosenAccommodationPackage = await dbAction.getAccommodationRegistrationChosenPackage(item.conferenceId);
      console.log(item.conferenceId,await dbAction.getAccommodations(item.conferenceId))
      this.setData({
        personalInfoDocId: item.personalInfoDocId,
        conferenceId: item.conferenceId,
        accommodations: await dbAction.getAccommodations(item.conferenceId),
        chosenPackage: await dbAction.getConferenceRegistrationChosenPackage(item.conferenceId),
      });
      this.setChosenDate();
      // never reached this page before
      if (chosenAccommodationPackage == undefined) {
        this.setData({
          chosenAccommodationPackage: [],
        });
      }
      // chose no need for accommodation and saved
      else if (chosenAccommodationPackage[0] == "none") {
        this.setData({
          chosenAccommodationPackage,
        });
      }
      // chose need accommodation and saved
      else {
        this.setData({
          chosenAccommodationPackage,
          chosenRoom: chosenAccommodationPackage[1],
          chooseAccommodation: true,
        });
      }
      verboseLog("registration-select-accommodation.onLoad() got data:", this.data);
    } catch (err) {
      console.error("registration-select-accommodation.onLoad() failed:\n", err);
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