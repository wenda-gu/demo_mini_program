// static/utils/validation.js

// Regex Strings
const taxId = /^[A-Za-z0-9]+$/;
const num =  /^\d*$/;
const numNotEmpty = /^\d+$/;
const cellphone = /^\d{11}$/;
const phoneNumAndSymbols = /^[0-9\-\+\(\)\.]*$/;
const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const personalId = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/; 

// Methods for validation
function isEmpty(item, type) {
  return (item == undefined || item == type || item == '');
}

function validateTaxId(e) {
  return taxId.test(e);
}

function validateNum(e) {
  return num.test(e);
}

function validateNumNotEmpty(e) {
  return numNotEmpty.test(e);
}

function validateCellphone(e) {
  return cellphone.test(e);
}

function validatePhoneNumAndSymbols(e) {
  return phoneNumAndSymbols.test(e);
}

function validateEmail(e) {
  return email.test(e);
}

function validatePersonalId(e) {
  return personalId.test(e);
}

function validatePersonalIdAndGender(id, gender) {
  var lastDigit = id.substr(17,1);
  if (lastDigit == 'X' || lastDigit == 'x') {
    lastDigit = 10;
  }
  return lastDigit % 2 == gender;
}

function parsePersonalId(id){ 
  var province = {
    11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外",
  };
  var sum = 0;
  if(!/^\d{17}(\d|x)$/i.test(id))
    return false; 
  id = id.replace(/x$/i,"a"); 
  if (province[parseInt(id.substr(0,2))] == null) 
    return "Error:非法地区"; 
  birthday = id.substr(6,4) + "-" + Number(id.substr(10,2)) + "-" + Number(id.substr(12,2)); 
  var d = new Date(birthday.replace(/-/g,"/")) ;
  if (birthday != (d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()))
    return "Error:非法生日"; 
  for (var i = 17; i >= 0; i--)
    sum += (Math.pow(2,i) % 11) * parseInt(id.charAt(17 - i),11);
  if (sum % 11 != 1)
    return "Error:非法证号"; 
  return province[parseInt(id.substr(0,2))] + "," + birthday + "," + (id.substr(16,1) % 2 ? "男" : "女") 
} 
  

// Exporting methods
export default {
  isEmpty: isEmpty,
  validateTaxId: validateTaxId,
  validateNum: validateNum,
  validateNumNotEmpty: validateNumNotEmpty,
  validateCellphone: validateCellphone,
  validatePhoneNumAndSymbols: validatePhoneNumAndSymbols,
  validateEmail: validateEmail,
  validatePersonalId: validatePersonalId,
  validatePersonalIdAndGender: validatePersonalIdAndGender,
  parsePersonalId: parsePersonalId,
}