# Intro
This is a demo Wechat mini program made by myself.

# Prerequisites
- [Wechat Devtools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) for Wechat mini program development and phone emulator.
- A Wechat cloud development environment to be able to run the server and database.

# Set Up
1. Git clone the project
```bash
git clone https://github.com/wenda-gu/demo_mini_program.git
```
2. Open Wechat Devtools and login. Click the `import` button to load the project you just cloned.
3. Load your cloud environment: [tutorial](https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/basis/concepts/account.html)
4. Start viewing this project.

<!-- 
# Glitch
- add env id in `app.js` to set up cloud dev env
- `wx.startPullDownRefresh()` and `wx.stopPullDownRefresh()` can only be used in `onPullDownRefresh()`. They cannot be written in another function and be called by `onPullDownRefresh()`.
- to enable pulldown refresh, `"enablePullDownRefresh": true` needs to be added to the page `json` file.
- [微信小程序自定义组件的坑之 hidden、boolean 属性和花括号](https://www.cnblogs.com/flipped/p/15640229.html)
- [微信小程序修改switch组件大小](https://juejin.cn/post/6844903609411305486)
- [小程序登录案例](https://www.jianshu.com/p/7414a543c622)
- [支付宝支付在微信小程序中也能实现？SpringBoot+沙箱教你一键搞定 —— 支付宝沙箱](https://www.bilibili.com/read/cv26705328/)
- [完美适配最新微信小程序隐私协议开发指南，兼容uniapp版本](https://zhuanlan.zhihu.com/p/652937327)
- [微信小程序Image图片实现width宽度100%，height高度自适应（解决图片变形问题）](https://blog.csdn.net/qq15577969/article/details/102664532)

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

# 会议通知
## 欢迎致辞
尊敬的各位同道：
2024年4月17-21日，第四届早产大会将在美丽的上海召开！本次会议将持续探讨早产专病专题，继续践行理论与实践相结合的模式，邀请国内外权威专家从不同角度深入探讨早产防治相关问题，展现早产最新研究进展和规范诊疗。大会依然秉承“实用+循证”的原则，依然聚焦早产热门及争议话题，依然设置备受期待的“圆桌论坛”，努力为与会者提供一份全方面、多层次的学术饕餮盛宴。
本次大会还将继续组建第三批“上海市东方早产救治联盟”团队，持续推进早产的整体化管理方案与协作方针。大会不仅有产科还有新生儿（早产儿）的内容，不仅有最新指南解读还有最新文献的解析，不仅有临床内容还有管理内容，不仅有临床研究还有基础研究。四月上海，繁花初放，欢迎广大从事产科和新生儿科等相关专业人士与我们相聚共话早产。
未来，我们将持续召开永不落幕的早产大会，与大家持续分享关于早产的精彩话题！

## 组织机构
1.	大会主席：	段  涛 教授，上海市第一妇婴保健院
2.	执行主席：	曹  云 教授，复旦大学附属儿科医院
          	  刘  铭 教授，同济大学附属东方医院
3.	主办单位：  上海春田医院管理有限公司
4.	协办单位：	复旦大学附属儿科医院 
          	  同济大学附属东方医院
5.	承办单位：	上海布鲁锡医疗科技有限公司

## 讲者名单
## 会议报名
## 大会议程

## 住宿安排





# 报名表
## 个人信息
- 姓名*
- 性别* (男, 女)
- 手机号* (验证码更改)
- 邮箱*
- **身份证号码***
- 单位名称*
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
- 说明：训练营名额有限，不可单独报名，凡需参加训练营者，需同时报名参加大会
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
    - 双床房，750元/间，含早餐
    - 双床房，375元/人，拼房，含早餐
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

select functions can't use update, needs validation funcs to check if update or add
how to view registration after it's finished
payment detect time and validate price
calculate price in dbaction
p.sort() sort undefined? async function getConferenceRegistrationChosenPackage(conferenceId) -->
