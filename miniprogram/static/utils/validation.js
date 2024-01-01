// static/utils/validation.js

// Regex Strings
const taxId = /^[A-Za-z0-9]+$/;
const num =  /^\d*$/;
const numNotEmpty = /^\d+$/;
const cellphone = /^\d{11}$/;
const phoneNumAndSymbols = /^[0-9\-\+\(\)]*$/;
const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Methods for validation
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

// Exporting methods
export default {
  validateTaxId: validateTaxId,
  validateNum: validateNum,
  validateNumNotEmpty: validateNumNotEmpty,
  validateCellphone: validateCellphone,
  validatePhoneNumAndSymbols: validatePhoneNumAndSymbols,
  validateEmail: validateEmail,
}