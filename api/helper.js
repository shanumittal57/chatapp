const CryptoJS = require('crypto-js');
const encryptioVal = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

const encrypt = function (text) {
        return CryptoJS.AES.encrypt(text, encryptioVal).toString();

    }
const decrypt =  function (text) {
        const bytes = CryptoJS.AES.decrypt(text, encryptioVal);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
module.exports = {encrypt, decrypt}