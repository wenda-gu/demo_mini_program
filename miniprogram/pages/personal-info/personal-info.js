// pages/personal-info/personal-info.js

import validation from "../../static/utils/validation.js";
import dbAction from "../../static/utils/dbAction.js";
import {verboseLog} from "../../static/utils/logging";
import {medicalDepartmentList, defaultAvatarUrl} from "../../static/utils/staticData";
import {reLaunch, showSaving, showSubmissionSuccess, showSubmissionFailed, showEditSuccess, showEditFailed, showError} from "../../static/utils/wxapi";

const updatePersonalInfo = getApp().updatePersonalInfo;
const global = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: String,
    isMale: Boolean,
    phonePersonal: Number,
    emailPersonal: String,
    personalId: String,
    companyName: String,
    region: Object,
    address: String,
    phoneCompany: String,
    isHealthcareWorker: true,
    department: String,
    otherDepartment: String,
    title: String,
    position: String,
    personalInfoDocId: String,
    isNewUser: Boolean,
    medicalDepartmentList: medicalDepartmentList,

    isEditing: false,
  },

  toggleIsEditing() {
    this.setData({
      isEditing: !this.data.isEditing,
    });
    if (this.data.isEditing) {
      wx.enableAlertBeforeUnload({
        message: '尚未保存，是否返回',
      });
    }
    else {
      wx.disableAlertBeforeUnload();
    }
  },
  toggleIsHealthcareWorker(e) {
    if (this.data.isHealthcareWorker != e.detail) {
      this.setData({
        isHealthcareWorker: !this.data.isHealthcareWorker,
        department: '',
        title: '',
        position: '',
      });
    }
  },

  handleChangePhonePersonal(e) {
    this.setData({
      phonePersonal: e.detail,
    });
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
  handleRegion(e) {
    this.setData({
      region: e.detail
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
  handleOtherDepartment(e) {
    this.setData({
      otherDepartment: e.detail
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
    var department = this.data.department;
    if (this.data.department == "其他") {
      department = this.data.otherDepartment;
    }
    return {
      name: this.data.name,
      isMale: this.data.isMale,
      phonePersonal: this.data.phonePersonal,
      emailPersonal: this.data.emailPersonal,
      personalId: this.data.personalId,
      companyName: this.data.companyName,
      region: this.data.region,
      address: this.data.address,
      phoneCompany: this.data.phoneCompanyNumber,
      isHealthcareWorker: this.data.isHealthcareWorker,
      department: department,
      title: this.data.title,
      position: this.data.position,
    };
  },

  async isValid() {
    return new Promise((resolve, reject) => {
      // check if empty
      if (validation.isEmpty(this.data.name, String)) {
        console.error("personal-info.isValid() no name.");
        reject("No name.");
      }
      else if (validation.isEmpty(this.data.phonePersonal, Number)) {
        console.error("personal-info.isValid() no phonePersonal.");
        reject("No phonePersonal.");
      }
      else if (validation.isEmpty(this.data.emailPersonal, String)) {
        console.error("personal-info.isValid() no emailPersonal.");
        reject("No emailPersonal.");
      }
      else if (validation.isEmpty(this.data.companyName, String)) {
        console.error("personal-info.isValid() no companyName.");
        reject("No companyName.");
      }
      else if (validation.isEmpty(this.data.region, Object)) {
        console.error("personal-info.isValid() no region.");
        reject("No region.");
      }
      else if (validation.isEmpty(this.data.address, String)) {
        console.error("personal-info.isValid() no address.");
        reject("No address.");
      }
      else {
        // 是医务工作者
        if (this.data.isHealthcareWorker) {
          if (validation.isEmpty(this.data.department, String)) {
            console.error("personal-info.isValid() no medical department.");
            reject("No medical department.");
          }
          else if (this.data.department == "其他" && (validation.isEmpty(this.data.otherDepartment, String))) {
            console.error("personal-info.isValid() no medical other department.");
            reject("No medical other department.");
          }
          else if (validation.isEmpty(this.data.title, String)) {
            console.error("personal-info.isValid() no title.");
            reject("No title.");
          }
        }
        // 非医务工作者
        else {
          if (validation.isEmpty(this.data.department, String)) {
            console.error("personal-info.isValid() no department.");
            reject("No department.");
          }
          else if (validation.isEmpty(this.data.position, String)) {
            console.error("personal-info.isValid() no position.");
            reject("No position.");
          }
        }
      }
      // check format
      if (!validation.validateCellphone(this.data.phonePersonal)) {
        console.error("personal-info.isValid() wrong format phonePersonal.");
        reject("Wrong format phonePersonal.");
      }
      else if (!validation.validateEmail(this.data.emailPersonal)) {
        console.error("personal-info.isValid() wrong format emailPersonal.");
        reject("Wrong format emailPersonal.");
      }
      else if (!validation.isEmpty(this.data.personalId, String) && !validation.validatePersonalId(this.data.personalId)) {
        console.error("personal-info.isValid() wrong format personalId.");
        reject("Wrong format personalId.");
      }
      else if (!validation.isEmpty(this.data.phoneCompany, String) && !validation.validatePhoneNumAndSymbols(this.data.phoneCompany)) {
        console.error("personal-info.isValid() wrong format phoneCompany.");
        reject("Wrong format phoneCompany.");
      }
      else if (!validation.isEmpty(this.data.personalId, String) && !validation.validatePersonalIdAndGender(this.data.personalId, this.data.isMale)) {
        console.error("personal-info.isValid() personal id and gender do not match.");
        reject("Personal id and gender do not match.");
      }
      else {
        verboseLog("personal-info.isValid() success.");
        resolve("personal-info.isValid() success.");
      }
    });
  },

  async btnSubmit() {
    showSaving();
    this.toggleIsEditing();
    verboseLog("personal-info.btnSubmit()");
    try {
      await this.isValid();
    } catch (err) {
      console.error("personal-info.btnSubmit() isValid() failed:", err);
      wx.hideLoading();
      var msg, iconStr = 'error';
      switch(err) {
        case "No name.":
          msg = "请填写姓名";
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
        case "No region.":
          msg = "请选择单位地区";
          break;
        case "No address.":
          msg = "请填写单位地址";
          break;
        case "No medical department.":
          msg = "请选择科室";
          break;
        case "No medical other department.":
          msg = "请填写科室";
          break;
        case "No title.":
          msg = "请填写职称";
          break;
        case "No position.":
          msg = "请填写职务";
          break;
        case "No department.":
          msg = "请填写部门";
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
      showError(msg, iconStr);
      this.toggleIsEditing();
    }
    try {
      var formData = this.prepareForm();
      verboseLog("personal-info.btnSubmit() submitting:", formData);
      // new user
      if (this.data.isNewUser) {
        formData.avatarUrl = defaultAvatarUrl;
        await dbAction.addPersonalInfo(formData);
        await updatePersonalInfo();
        verboseLog("personal-info.btnSubmit() addPersonalInfo() success.");
        wx.hideLoading();
        showSubmissionSuccess();
        this.setData({
          personalInfoDocId: global.personalInfoDocId,
          isNewUser: false,
        });
        reLaunch('../me/me');
      }
      // existing user
      else {
        await dbAction.editPersonalInfo(this.data.personalInfoDocId, formData);
        await updatePersonalInfo();
        verboseLog("personal-info.btnSubmit() editPersonalInfo success.");
        wx.hideLoading();
        showEditSuccess();
      }
    } catch (err) {
      console.error("personal-info.btnSubmit() failed:", err);
      wx.hideLoading();
      showEditFailed();
      this.toggleIsEditing();
    }
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.disableAlertBeforeUnload();
    if (options.item == null || options.item == "") {
      console.error("personal-info no input");
      wx.navigateBack();
      return;
    }
    const item = JSON.parse(options.item);
    verboseLog("personal-info.onLoad() got item:", item);
    this.setData({
      isNewUser: global.isNewUser,
    });
    
    if (this.data.isNewUser) {
      wx.setNavigationBarTitle({ title: '用户注册' });
      this.setData({
        isEditing: true,
        name: '',
        isMale: true,
        phonePersonal: item.phonePersonal,
        emailPersonal: '',
        personalId: '',
        companyName: '',
        region: null,
        address: '',
        phoneCompany: '',
        isHealthcareWorker: true,
        department: '',
        otherDepartment: '',
        title: '',
        position: '',
      });
    }
    else {
      wx.setNavigationBarTitle({ title: '我的信息' });
      var title = '', position = '', department = '', otherDepartment = '';

      title = item.title ? item.title : '';
      position = item.position ? item.position : '';

      // check department and other department. if department name not in list, set this.data.department to "其他" and set the name to this.data.otherDepartment
      if ((medicalDepartmentList.indexOf(item.department) == -1) && (item.department != '')) {
        department = '其他';
        otherDepartment = item.department;
      }
      else {
        department = item.department;
      }

      this.setData({
        name: item.name,
        isMale: item.isMale,
        phonePersonal: item.phonePersonal,
        emailPersonal: item.emailPersonal,
        personalId: item.personalId,
        companyName: item.companyName,
        region: item.region,
        address: item.address,
        phoneCompany: item.phoneCompany,
        isHealthcareWorker: item.isHealthcareWorker,
        department: department,
        otherDepartment: otherDepartment,
        title: title,
        position: position,
        personalInfoDocId: global.personalInfoDocId
      });
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
    this.setData({
      isNewUser: global.isNewUser,
      personalInfoDocId: global.personalInfoDocId,
    });
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