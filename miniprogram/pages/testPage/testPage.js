// pages/testPage/testPage.js
import cloudAction from "../../static/utils/cloudAction.js";
import {verboseLog, verboseError} from "../../static/utils/logging.js";
import {medicalDepartmentList} from "../../static/utils/staticData.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: String,
    userInfo: Object,
    items: medicalDepartmentList,
    department: String,
    region: Object,
    customItem: '全部'
  },
  bindPickerChange: function(e) {
    this.setData({
      department: medicalDepartmentList[e.detail.value],
    });
    console.log('picker发送选择改变，携带值为', this.data.department);
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


  
  showOpenId() {
    cloudAction.wxgetOpenId().then((res) => {
      verboseLog("testPage.showOpenId() got openid:", res);
      this.setData({
        openid: res,
      });
    });
  },

  showUserInfo() {
    cloudAction.wxgetUserInfo().then((res) => {
      verboseLog("testPage.showUserInfo() got userInfo:", res);
      this.setData({
        userInfo: res,
      });
    });
  },

  showMoreUserInfo() {
    wx.getUserInfo({
      success:res=> {
        console.log("returned:", res)    
        console.log("cloudID:", res.cloudID)    
        wx.cloud.callFunction({
          name: 'myFunc',
          data: {
            userInfo: wx.cloud.CloudID(res.cloudID)
          },
        }).then(resData=>{    
          console.log(resData) //注意这里
          console.log(resData.result.event)//今天的步数
        });
      },
    });
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