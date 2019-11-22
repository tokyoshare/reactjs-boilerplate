const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const encryptString = (content) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(content, salt);
    return hash;
}
const compareEncryptString = (content, encryptedContent) => {
    return bcrypt.compareSync(content, encryptedContent);
}
const encodeToken = (userID) => {
    const playload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: userID,
    };
    return jwt.encode(playload, process.env.TOKEN_SECRET);
}

const decodeToken = (token) => {
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    const now = moment().unix();
    console.log(payload)
    // check if the token has expired
    return now > payload.exp ? null : payload;
}

module.exports = {
    encodeToken,
    decodeToken,
    encryptString,
    compareEncryptString
};