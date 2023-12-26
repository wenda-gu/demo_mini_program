// static/utils/logging.js

// data
var verbose = true;

// Methods: custom logging
function verboseLog(text, param) {
  if ( param == undefined ) param = '';
  if ( verbose ) console.log(text, param);
}

function verboseError(text, param) {
  if ( param == undefined ) param = '';
  if ( verbose ) console.error(text, param);
}

// Exporting methods
export default {
  verboseLog: verboseLog,
  verboseError: verboseError,
}