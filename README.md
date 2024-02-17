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


# 报名表
## 个人信息
- 姓名*
- 性别* (男, 女)
- 手机号* (验证码更改)
- 邮箱*
- **身份证号码***
- 单位名称* **（注：请填写单位标准全称）**
- 单位地区* (选择)
- 单位地址*
- 单位电话
- 医务工作者* (是)
  - 科室*
  - 职称*
  - 职务
  - **是否来自基层（县及以下、社区等医疗卫生机构）**
- 非医务工作者* (否)
  - 部门*
  - 职务*
## 报名类目
- 选项：
  - 大会
    - 日期：4/20-4/21
    - 金额：￥1000（3/31后支付为￥1200）
  - 训练营一：第五期宫颈环扎训练营 + 大会
    - 日期：4/18, 4/20-4/21
    - 金额：￥1000 x 2 = ￥2000（3/31后支付为￥2400）
  - 训练营二：第十一期外倒转训练营 + 大会
    - 日期：4/19-4/21
    - 金额：￥1000 x 2 = ￥2000（3/31后支付为￥2400）
  - 训练营一：第五期宫颈环扎训练营 + 训练营二：第十一期外倒转训练营 + 大会
    - 日期：4/18-4/21
    - 金额：￥1000 x 3 = ￥3000（3/31后支付为￥3600）
- 说明：训练营名额有限，不可单独报名，凡需参加训练营者，需同时报名参加大会
## 住宿
- 是
  - 酒店信息
    - 名称：上海虹桥美爵酒店
    - 地址：上海市长宁区仙霞路369号
  - 日期：根据您选择的会议类型，将为您选择如下日期：
    - 4/19-4/21
      - 大会
    - 4/18-4/21
      - 训练营二：第十一期外倒转训练营 + 大会
    - 4/17-4/21
      - 训练营一：第五期宫颈环扎训练营 + 大会
      - 训练营一：第五期宫颈环扎训练营 + 训练营二：第十一期外倒转训练营 + 大会
  - 房型：
    - 大床房，750元/间，含早餐
    - 双床房：
      - 750元/间，含早餐
      - 375元/人，拼房，含早餐
  - 说明：客房紧张，将按照付款顺序安排，先到先得
- 否
## 付款方式
- 显示金额
- 选项：
  - 微信
  - 支付宝
  - 汇款
## 发票信息
- 显示默认发票抬头，点击▽弹出下拉框可选择更多自己的抬头
- 是否专票
- 添加抬头
## 按钮：
- 保存并退出
- 提交