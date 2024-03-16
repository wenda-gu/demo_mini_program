// pages/testPage/testPage.js
import {beijingTime} from "../../static/utils/dateTool";
import {verboseLog} from "../../static/utils/logging.js";
import {medicalDepartmentList} from "../../static/utils/staticData.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  
  async onTap() {
    try {
      const conference = await wx.cloud.database().collection("conferences").doc("cpb04").get();
      var choices = conference.data.conference_page.registration.packages.choices
      for (var choice of choices) {
        verboseLog("this is choice.date_start", choice.date_start);
        console.log(typeof choice.date_start);
        choice.date_start.setHours(choice.date_start.getHours()-15);
        verboseLog("this is choice.date_start in bj time", choice.date_start);

      }
      // await wx.cloud.database().collection("conferences").doc("cpb04").update({
      //   conference_page: {
      //     registration: {
      //       packages: {
      //         choices: 
      //       }
      //     }
      //   }
      // });
    }
    catch (err) {
      console.error(err);
    }
    
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