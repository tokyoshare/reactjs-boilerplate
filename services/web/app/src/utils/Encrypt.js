import CryptoJS from 'crypto-js';


/**
 * Encrypt data from input string with scecret key
 * @param {*} value 
 * @param {*} secretKey 
 */
const encryptData = (value, secretKey) => {
    return CryptoJS.AES.encrypt(value, secretKey);
}

/**
 * Decrypt data from encrypted string
 * @param {*} encrypted 
 * @param {*} secretKey 
 */
const decryptData = (encrypted, secretKey) => {
    let decryptBytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    return decryptBytes.toString(CryptoJS.enc.Utf8);
}

const base64 = (value) => {
    var wordArray = CryptoJS.enc.Utf8.parse(value);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

const decodeBase64 = (encoded) => {
    var parsedWordArray = CryptoJS.enc.Base64.parse(encoded);
    return parsedWordArray.toString(CryptoJS.enc.Utf8);
}

export {
    encryptData,
    decryptData,
    base64,
    decodeBase64
}

