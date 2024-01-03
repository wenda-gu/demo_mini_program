// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const SMSClient = require('@alicloud/sms-sdk');

// 云函数入口函数
exports.main = async (event, context) => {
    const {
        phone
    } = event;

    // 生成6位验证码
    const code = Math.floor(Math.random() * 899999 + 100000);

    const smsClient = new SMSClient({
        accessKeyId: 'your accessKeyId',  // 阿里云AccessKey ID
        secretAccessKey: 'your secretAccessKey',  // 阿里云Access Key Secret
    });

    // 发送短信
    const result = await smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: 'your signname',
        TemplateCode: 'your templatecode',
        TemplateParam: JSON.stringify({ code })
    });

    if(result.Code === 'OK') {
        console.log(result)
        return {
          success: true
        }
    } else {
        return {
          success: false,
          message: result.Message
        }
    }
}