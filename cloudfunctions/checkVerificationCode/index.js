// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const {
      phone,
      code
  } = event;

  // 比对验证码
  if(code === '123456') {
      console.log('验证成功');
      return {
        success: true
      }
  } else {
      return {
        success: false,
        message: '验证码错误'
      }
  }
}