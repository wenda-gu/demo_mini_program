# Glitch
- add env id in `app.js` to set up cloud dev env
- `wx.startPullDownRefresh()` and `wx.stopPullDownRefresh()` can only be used in `onPullDownRefresh()`. They cannot be written in another function and be called by `onPullDownRefresh()`.
- to enable pulldown refresh, `"enablePullDownRefresh": true` needs to be added to the page `json` file.
- [微信小程序自定义组件的坑之 hidden、boolean 属性和花括号](https://www.cnblogs.com/flipped/p/15640229.html)
- [微信小程序修改switch组件大小](https://juejin.cn/post/6844903609411305486)
- [小程序登录案例](https://www.jianshu.com/p/7414a543c622)
- [支付宝支付在微信小程序中也能实现？SpringBoot+沙箱教你一键搞定 —— 支付宝沙箱](https://www.bilibili.com/read/cv26705328/)
- [完美适配最新微信小程序隐私协议开发指南，兼容uniapp版本](https://zhuanlan.zhihu.com/p/652937327)

# improvement
- `personal-info.医务工作者` 更改选项以后不应将内容清空，以便选择回来的时候不用重新输入。提交以后就可以清空了 
- `name` attribute in `personal-info` and `invoice-add` can be deleted?
- 


# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

# Warning
- Dark mode
- login functionality and openid
- 参会历史隐藏，之后上线
- encode api request on developer platform
- get gender be mindful of number to boolean conversion 