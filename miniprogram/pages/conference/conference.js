import { verboseLog } from "../../static/utils/logging";
import {comingSoonPage} from "../../static/utils/staticData";
import {navTo} from "../../static/utils/wxapi";


// pages/conference/conference.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conference: Object,
  },

  handleWelcome() {
    navTo('../show-image/show-image', {
      imgUrl: 'cloud://bsc-db-6g55uugs8cdb24fc.6273-bsc-db-6g55uugs8cdb24fc-1318124633/resource/conferences/cpb04/welcome.jpg',
      pageTitle: '欢迎致辞',
    });
    // navTo('../welcome-letter/welcome-letter', this.data.conference.welcome_letter);
  },
  handleOrganizers() {
    navTo('../show-image/show-image', {
      imgUrl: 'cloud://bsc-db-6g55uugs8cdb24fc.6273-bsc-db-6g55uugs8cdb24fc-1318124633/resource/conferences/cpb04/organizers.jpg',
      pageTitle: '组织机构',
    });
  },
  handleSpeakers() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '讲者名单',
    });
  },
  handleStreaming() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '线上直播',
    });
  },
  handleRegistration() {
    navTo('../auth/auth', this.data.conference._id);
  },
  handleAgenda() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '大会议程',
    });
  },
  handleAccommodationInfo() {
    navTo('../show-image/show-image', {
      imgUrl: 'cloud://bsc-db-6g55uugs8cdb24fc.6273-bsc-db-6g55uugs8cdb24fc-1318124633/resource/conferences/cpb04/accommodation-info.jpg',
      pageTitle: '住宿安排',
    });
  },
  handleBookSelling() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '新书特卖',
    });
  },
  handleSurvey() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '问卷调查',
    });
  },
  handleDownload() {
    navTo('../download-files/download-files', this.data.conference.downloads);
  },
  handlePhotos() {
    navTo('../show-image/show-image', {
      imgUrl: '',
      pageTitle: '照片直播',
    });
  },
  handleContactUs() {
    navTo('../show-image/show-image', {
      imgUrl: 'cloud://bsc-db-6g55uugs8cdb24fc.6273-bsc-db-6g55uugs8cdb24fc-1318124633/resource/conferences/cpb04/contact-us.jpg',
      pageTitle: '联系我们',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.item == null || options.item == "") {
      console.error("conference no input");
      wx.navigateBack();
      return;
    }
    const item = JSON.parse(options.item);
    this.setData({
      conference: item,
    });
    wx.setNavigationBarTitle({
      title: this.data.conference.name_zh,
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