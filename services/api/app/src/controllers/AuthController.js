import * as AuthenUtils from "../utils/AuthenUtils";

import UserService from '../services/UserService';
import { response, responseError } from "../utils/Utils";
import * as constant from "../constants";

const _ = require('lodash');

class AuthController {
    constructor() {
        this.userService = new UserService();
    }

    //====================================================================================
    //TODO: USER LOGIN TO SYSTEM
    //EndPoint: POST /login
    //Parameters: NONE
    //Body: {email:string, passwor:string}
    //====================================================================================
    login = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            //1. Validate user exist or not
            let [err, user] = await this.userService.getUserWithPassword({ email });
            if (err || !user) {
                return responseError(res, constant.ERROR_CODE_NOT_FOUND);
            }

            //2. Validate password is exactly or not
            let returnUser = user.dataValues
            if (!AuthenUtils.compareEncryptString(password, returnUser.password)) {
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //3. IMPORTANT: remove password before return
            delete returnUser.password;

            //4. Generate token for the user
            let token = AuthenUtils.encodeToken(returnUser.id);
            return response(res, constant.SUCCESS_CODE_OK, { user: returnUser, token });
        } catch (err) {
            return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
        }
    }

    //====================================================================================
    //TODO: 2-STEP AUTHENCATION, THAT WILL BE CALL FROM OUTSITE
    //EndPoint: POST /authen
    //Headers: authorization:string
    //====================================================================================
    authen = async (req, res) => {
        try {
            //1. Validate the token exists or not
            const token = req.headers && req.headers["authorization"] || null;
            if (!token) {
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //2. Check the token can be decoded or not
            const payload = AuthenUtils.decodeToken(token);
            if (!payload) {
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //3. Check the user exists or not.
            const userID = payload.sub;
            let [err, user] = await this.userService.getUser({ id: userID });
            if (err || !user) {
                console.log(err);
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //4. Response data
            return response(res, constant.SUCCESS_CODE_OK, user);
        } catch (err) {
            return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
        }
    }

    //====================================================================================
    //TODO: 2-STEP AUTHENCATION, THAT WILL BE CALL FROM INSIDE
    //File: routes/v1/UserRoutes.js 
    //router.post(url, AuthController.checkAuthen, UserController.handlerName)
    //Headers: authorization:string
    //====================================================================================
    checkAuthen = async (req, res, next) => {
        try {
            //1. Validate the token exists or not
            const token = req.headers && req.headers["authorization"] || null;
            if (!token) {
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //2. Check the token can be decoded or not
            const payload = AuthenUtils.decodeToken(token);
            if (!payload) {
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }

            //3. Check the user exists or not.
            const userID = payload.sub;
            let [err, user] = await this.userService.getUser({ id: userID });
            if (err || !user) {
                console.log(err);
                return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
            }
            //4. if next func exists, continue to call it
            if (next) {
                req.user = user;
                return next();
            }
            return response(res, constant.SUCCESS_CODE_OK, user);
        } catch (err) {
            return responseError(res, constant.ERROR_CODE_UNAUTHORIZED);
        }
    }
}

module.exports = new AuthController();