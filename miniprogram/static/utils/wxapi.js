// static/utils/wxapi.js

const wxapi = {
  /**
   * 对微信Api Promise化的公共函数
   */
  wxapi: (wxApiName, obj) => {
    return new Promise((resolve, reject) => {
      wx[wxApiName]({
        ...obj,     //注意这里涉及的语法
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  },

  /**
   * 以下是微信Api Promise化的特殊案例
   */
  wxsetData: (pageObj, obj) => {
    if(pageObj && obj){
      return new Promise((resolve, reject) => {
        pageObj.setData(obj, resolve(obj));
      });
    }
  },

  sleep: (time) => {
    return new Promise((resolve) => {
      setTimeout(function(){
        resolve();
      }, time);
    });
  },

  showSaving: () => {
    wx.showLoading({
      title: '保存中',
      mask: true,
    });
  },

  showSubmitting: () => {
    wx.showLoading({
      title: '提交中',
      mask: true,
    });
  },

  showSubmissionSuccess: () => {
    wx.showToast({
      title: '提交成功',
      duration: 800,
    });
  },

  showSubmissionFailed: () => {
    wx.showToast({
      title: '提交失败请重试',
      icon: 'error',
      duration: 2000,
    });
  },

  showEditSuccess: () => {
    wx.showToast({
      title: '修改成功',
      duration: 800,
    });
  },

  showEditFailed: () => {
    wx.showToast({
      title: '修改失败请重试',
      icon: 'error',
      duration: 2000,
    });
  },

  showAddSuccess: () => {
    wx.showToast({
      title: '添加成功',
      duration: 800,
    });
  },

  showAddFailed: () => {
    wx.showToast({
      title: '添加失败请重试',
      icon: 'error',
      duration: 2000,
    });
  },

  showUseChinesePhoneNumber: () => {
    wx.showToast({
      title: '请使用国内手机号',
      icon: 'error',
      duration: 2000,
    });
  },
}


module.exports = wxapi;
