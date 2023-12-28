// static/utils/logging.js

// data
const verbose = true;

// Methods: custom logging
const logging = {
  verboseLog: (text, param) => {
    if ( param == undefined ) param = '';
    if ( verbose ) console.log(text, param);
  },
  
   verboseError: (text, param) => {
    if ( param == undefined ) param = '';
    if ( verbose ) console.error(text, param);
  },
}
// Exporting methods
module.exports = logging;

