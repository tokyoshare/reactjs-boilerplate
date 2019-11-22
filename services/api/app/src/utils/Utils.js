import * as constant from "../constants";
export const response = function (res, code, results) {
    const obj = {};
    obj.status = code;
    obj.data = results || {};
    return res.status(code).json(obj);
};

export const responseError = function (res, code, err) {
    let message = "";
    switch (code) {
        case constant.ERROR_CODE_BAD_REQUEST:
            message = "Bad request"
            break;
        case constant.ERROR_CODE_NOT_FOUND:
            message = "Cannot found the data"
            break;
        case constant.ERROR_CODE_REQUEST_TIMEOUT:
            message = "Request was timeout"
            break;
        case constant.ERROR_CODE_UNAUTHORIZED:
            message = "Cannot authorized"
            break;
        case constant.ERROR_USER_EXIST:
            message = "User with this email already existed"
            break;
    }
    return res.status(code).json({ message, err })
};