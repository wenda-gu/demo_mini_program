// static/utils/wxapi.js

function showLoadingWrapper(msg)  {
  wx.showLoading({
    title: msg,
    mask: true,
  });
}

function showError(msg) {
  wx.showToast({
    title: msg,
    icon: 'error',
    duration: 2000,
  });
}

function showSuccess(msg) {
  wx.showToast({
    title: msg,
    duration: 800,
  });
}

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

  navTo: async (url, obj) => {
    try {
      await wx.navigateTo({
        url: url + (obj == undefined ? '' : ('?item=' + JSON.stringify(obj))),
      });
    } catch (err) {
      throw new Error("at wxapi.navTo()\n" + err);
    }
  },

  redirectTo: async (url, obj) => {
    try {
      await wx.redirectTo({
        url: url + (obj == undefined ? '' : ('?item=' + JSON.stringify(obj))),
      });
    } catch (err) {
      throw new Error("at wxapi.redirectTo()\n" + err);
    }
  },

  reLaunch: async (url, obj) => {
    try {
      await wx.reLaunch({
        url: url + (obj == undefined ? '' : ('?item=' + JSON.stringify(obj))),
      });
    } catch (err) {
      throw new Error("at wxapi.reLaunch()\n" + err);
    }
  },

  showSaving: () => {
    showLoadingWrapper('保存中');
  },

  showSubmitting: () => {
    showLoadingWrapper('提交中');
  },

  showDownloading: () => {
    showLoadingWrapper('下载中');
  },

  showSaveFailed: () => {
    showError('保存失败请重试');
  },

  showSubmissionFailed: () => {
    showError('提交失败请重试');
  },

  showEditFailed: () => {
    showError('修改失败请重试');
  },

  showAddFailed: () => {
    showError('添加失败请重试');
  },

  showDownloadFailed: () => {
    showError('下载失败请重试');
  },

  showUseChinesePhoneNumber: () => {
    showError('请使用国内手机号');
  },

  showSaveSuccess: () => {
    showSuccess('保存成功');
  },

  showSubmissionSuccess: () => {
    showSuccess('提交成功');
  },

  showEditSuccess: () => {
    showSuccess('修改成功');
  },

  showAddSuccess: () => {
    showSuccess('添加成功');
  },

  showDownloadSucess: () => {
    showSuccess('下载成功');
  },

  showRegistrationSucess: () => {
    showSuccess('报名成功');
  },

  showError: (msg, iconStr) => {
    wx.showToast({
      title: msg,
      icon: iconStr,
      duration: 2000,
    });
  },
}


module.exports = wxapi;
