// components/agreement/agreement.js
let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()

if (wx.onNeedPrivacyAuthorization) {
  wx.onNeedPrivacyAuthorization(resolve => {
    if (typeof privacyHandler === 'function') {
      privacyHandler(resolve)
    }
  })
}

const closeOtherPagePopUp = (closePopUp) => {
  closeOtherPagePopUpHooks.forEach(hook => {
    if (closePopUp !== hook) {
      hook()
    }
  })
}
Component({
  properties: {
    innerShow: {
      type: Boolean,
      value: false,
    },
  },
  lifetimes: {
    attached: function() {
      const closePopUp = () => {
        this.disPopUp()
      }
      privacyHandler = resolve => {
        privacyResolves.add(resolve)
        this.popUp()
        // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
        closeOtherPagePopUp(closePopUp)
      }

      closeOtherPagePopUpHooks.add(closePopUp)

      this.closePopUp = closePopUp
    },
    detached: function() {
      closeOtherPagePopUpHooks.delete(this.closePopUp)
    }
  },
  pageLifetimes: {
    show: function() {
      this.curPageShow()
    }
  },
  methods: {
    handleAgree(e) {
      this.disPopUp()
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'agree',
          buttonId: 'agree-btn'
        })
      })
      privacyResolves.clear()
    },
    handleDisagree(e) {
      this.disPopUp();
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'disagree',
        })
      });
      privacyResolves.clear();
      // wx.switchTab({
      //   url: 'pages/index/index',
      // });
    },
    popUp() {
      if (this.data.innerShow === false) {
        this.setData({
          innerShow: true
        })
      }
    },
    disPopUp() {
      if (this.data.innerShow === true) {
        this.setData({
          innerShow: false
        })
      }
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    },
    curPageShow() {
      if (this.closePopUp) {
        privacyHandler = resolve => {
          privacyResolves.add(resolve)
          this.popUp()
          // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
          closeOtherPagePopUp(this.closePopUp)
        }
      }
    }
  }
})