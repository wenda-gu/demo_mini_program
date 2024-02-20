// components/download-button/download-button.js

import cloudAction from "../../static/utils/cloudAction.js";
import {verboseLog} from "../../static/utils/logging";
import {showDownloading, showDownloadSucess, showDownloadFailed} from "../../static/utils/wxapi";

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onTap() {
      var fileID = this.data.item.url;
      let filenameTokens = fileID.split('/');
      const downloadToPath = `${wx.env.USER_DATA_PATH}/${filenameTokens[filenameTokens.length - 1]}`;
      try {
        showDownloading();
        await cloudAction.cloudDownload(fileID, downloadToPath);
        wx.hideLoading();
        showDownloadSucess();
      } catch (err) {
        console.error("download-button.onTap download failed:\n", err);
        wx.hideLoading();
        showDownloadFailed();
      }
    },
  }
})