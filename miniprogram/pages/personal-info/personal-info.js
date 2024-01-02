// pages/personal-info/personal-info.js

import validation from "../../static/utils/validation.js";
import dbAction from "../../static/utils/dbAction.js";
import {verboseLog, verboseError} from "../../static/utils/logging.js";

const personalInfoDocId = getApp().globalData.personalInfoDocId;
const updatePersonalInfo = getApp().updatePersonalInfo;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: String,
    // 0 is F, 1 is M, 2 is not set
    isMale: Number,
    phonePersonal: Number,
    emailPersonal: String,
    personalId: String,
    companyName: String,
    address: String,
    phoneCompany: Number,
    isApplicable: true,
    department: String,
    title: String,
    position: String,
    isEditing: false,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
  },
  toggleApplicablity() {
    this.setData({
      isApplicable: !this.data.isApplicable,
    });
    if (!this.data.isApplicable) {
      this.setData({
        department: '',
        title: '',
        position: '',
      });
    }
  },


  handleName(e) {
    this.setData({
      name: e.detail
    });
  },
  handleGender(e) {
    this.setData({
      isMale: e.detail
    });
  },
  handlePhonePersonal(e) {
    this.setData({
      phonePersonal: e.detail
    });
  },
  handleEmailPersonal(e) {
    this.setData({
      emailPersonal: e.detail
    });
  },
  handlePersonalId(e) {
    this.setData({
      personalId: e.detail.toUpperCase(),
    });
  },
  handleCompanyName(e) {
    this.setData({
      companyName: e.detail
    });
  },
  handleAddress(e) {
    this.setData({
      address: e.detail
    });
  },
  handlePhoneCompany(e) {
    this.setData({
      phoneCompany: e.detail
    });
  },
  handleDepartment(e) {
    this.setData({
      department: e.detail
    });
  },
  handleTitle(e) {
    this.setData({
      title: e.detail
    });
  },
  handlePosition(e) {
    this.setData({
      position: e.detail
    });
  },
  
  prepareForm() {
    var department = '', title = '', position = '';
    if (this.data.isApplicable) {
      department = this.data.department;
      title = this.data.title;
      position = this.data.position;
    }
    return {
      name: this.data.name,
      isMale: this.data.isMale,
      phonePersonal: this.data.phonePersonal,
      emailPersonal: this.data.emailPersonal,
      personalId: this.data.personalId,
      companyName: this.data.companyName,
      address: this.data.address,
      phoneCompany: this.data.phoneCompanyNumber,
      isApplicable: this.data.isApplicable,
      department: department,
      title: title,
      position: position,
    };
  },

  isValid() {
    return new Promise((resolve, reject) => {
      // check if empty
      if (this.data.name == String || this.data.name == '') {
        verboseError("personal-info.isValid() no name.");
        reject("No name.");
      }
      else if (this.data.isMale == 2) {
        verboseError("personal-info.isValid() no gender.");
        reject("No gender.");
      }
      else if (this.data.phonePersonal == Number || this.data.phonePersonal == '') {
        verboseError("personal-info.isValid() no phonePersonal.");
        reject("No phonePersonal.");
      }
      else if (this.data.emailPersonal == String || this.data.emailPersonal == '') {
        verboseError("personal-info.isValid() no emailPersonal.");
        reject("No emailPersonal.");
      }
      else if (this.data.companyName == String || this.data.companyName == '') {
        verboseError("personal-info.isValid() no companyName.");
        reject("No companyName.");
      }
      else if (this.data.address == String || this.data.address == '') {
        verboseError("personal-info.isValid() no address.");
        reject("No address.");
      }
      else if (this.data.isApplicable) {
        if (this.data.department == String || this.data.department == '') {
          verboseError("personal-info.isValid() no department.");
          reject("No department.");
        }
        else if (this.data.title == String || this.data.title == '') {
          verboseError("personal-info.isValid() no title.");
          reject("No title.");
        }
      }
      // check format
      if (!validation.validateCellphone(this.data.phonePersonal)) {
        verboseError("personal-info.isValid() wrong format phonePersonal.");
        reject("Wrong format phonePersonal.");
      }
      else if (!validation.validateEmail(this.data.emailPersonal)) {
        verboseError("personal-info.isValid() wrong format emailPersonal.");
        reject("Wrong format emailPersonal.");
      }
      else if (!validation.validatePersonalId(this.data.personalId)) {
        verboseError("personal-info.isValid() wrong format personalId.");
        reject("Wrong format personalId.");
      }
      else if (!validation.validatePhoneNumAndSymbols(this.data.phoneCompany) && !(this.data.phoneCompany == Number)) {
        verboseError("personal-info.isValid() wrong format phoneCompany.");
        reject("Wrong format phoneCompany.");
      }
      else if (!validation.validatePersonalIdAndGender(this.data.personalId, this.data.isMale)) {
        verboseError("personal-info.isValid() personal id and gender do not match.");
        reject("Personal id and gender do not match.");
      }
      else {
        verboseLog("personal-info.isValid() success.");
        resolve("personal-info.isValid() success.");
      }
    });
  },

  btnSubmit() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '保存中',
        mask: true,
      });
      this.toggleIsEditing();
      verboseLog("personal-info.btnSubmit()。");
      this.isValid().then((res) => {
        const formData = this.prepareForm();
        verboseLog("personal-info.btnSubmit() submitting:", formData);
        dbAction.editPersonalInfo(personalInfoDocId, formData).then((res) => {
          verboseLog("personal-info.btnSubmit() edit success.");
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
            duration: 800,
          });
          updatePersonalInfo();
          resolve("personal-info.btnSubmit() success.");
        }).catch((err) => {
          verboseError("personal-info.btnSubmit() editPersonalInfo() failed:", err);
          wx.hideLoading();
          wx.showToast({
            title: '修改失败请重试',
            icon: 'error',
            duration: 2000,
          });
          reject(err);
          this.toggleIsEditing();
        });
        
      }).catch((err) => {
        verboseError("personal-info.btnSubmit() isValid() failed:", err);
        wx.hideLoading();
        var msg, iconStr = 'error';
        switch(err) {
          case "No name.":
            msg = "请填写姓名";
            break;
          case "No gender.":
            msg = "请选择性别";
            break;
          case "No phonePersonal.":
            msg = "请填写个人手机";
            break;
          case "No emailPersonal.":
            msg = "请填写个人邮箱";
            break;
          case "No companyName.":
            msg = "请填写单位名称";
            break;
          case "No address.":
            msg = "请填写单位地址";
            break;
          case "No department.":
            msg = "请填写科室";
            break;
          case "No title.":
            msg = "请填写职称";
            break;
          case "Wrong format phonePersonal.":
            msg = "个人手机号格式错误";
            iconStr = "none";
            break;
          case "Wrong format emailPersonal.":
            msg = "个人邮箱格式错误";
            iconStr = "none";
            break;
          case "Wrong format personalId.":
            msg = "身份证号码格式错误";
            iconStr = "none";
            break;
          case "Wrong format phoneCompany.":
            msg = "单位电话格式错误";
            iconStr = "none";
            break;
          case "Personal id and gender do not match.":
            msg = "身份证号码与性别不符";
            iconStr = "none";
            break;
        }
        wx.showToast({
          title: msg,
          icon: iconStr,
          duration: 2000,
        });
        reject(err);
        this.toggleIsEditing();
      });
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '我的信息' })
    if (options.item == null) return;
    const item = JSON.parse(options.item);
    verboseLog("personal-info.onLoad() got item:", item);
    var isApplicable = true, department = '', title = '', position = '';
    // if item.isApplicable is undefined, first time filling out personal info form
    if (item.isApplicable == undefined) {
      // do nothing
    }
    else if (item.isApplicable) {
      department = item.department;
      title = item.title;
      position = item.position ? item.position : '';
    }
    else {
      isApplicable = false;
    }
    this.setData({
      name: item.name,
      // 0 is F, 1 is M, 2 is not set
      isMale: item.isMale,
      phonePersonal: item.phonePersonal,
      emailPersonal: item.emailPersonal,
      personalId: item.personalId,
      companyName: item.companyName,
      address: item.address,
      phoneCompany: item.phoneCompany,
      isApplicable: isApplicable,
      department: department,
      title: title,
      position: position,
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