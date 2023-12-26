// app.js
App({

  testData: {
    verbose: true,
    lookUpCriteria: {
      _openid: "oUZen5VZ_i-ylfHrUr3RNfTqxypI",
    },
  },

  verboseLog: function(text, param) {
    if ( param == undefined ) param = '';
    if ( this.testData.verbose ) console.log(text, param);
  },

  verboseError: function(text, param) {
    if ( param == undefined ) param = '';
    if ( this.testData.verbose ) console.error(text, param);
  },

  getAllInvoiceTitles(){
    return new Promise((resolve, reject) => {
      this.verboseLog("App.getAllInvoiceTitles()");
      wx.cloud.database().collection("invoice-title").get().then(res => {
        var ret = res.data;
        this.verboseLog("App.getAllInvoiceTitles() gets invoice title(s):", ret);
        resolve(ret);
      }).catch((err) => {
        this.verboseError("App.getAllInvoiceTitles() failed:", err);
        reject(err);
      });
    });
  },

  onLaunch: function () {
    // Cloud Env
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'bsc-db-6g55uugs8cdb24fc',
        traceUser: true,
      });
    }

    wx.login({
      success: (res) => {
        var code = res.code;
        if (code) {
          this.verboseLog('App.onLaunch() user token:', code);
        }
        else {
          this.verboseLog('App.onLaunch() fetch user token failed');
        }
      },
    });
  }
});
