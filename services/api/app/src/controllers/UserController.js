import UserService from '../services/UserService';
import { response, responseError } from "../utils/Utils";
import * as constant from "../constants";
const _ = require('lodash');

class UserController {
    constructor() {
        this.userService = new UserService();
    }
    //====================================================================================
    //TODO: CREATE USER API
    //EndPoint: POST /users
    //Parameters: NONE
    //Body: User object
    //User object:{user_name:string,email:string,password:string,avatar:text,role:integer}
    //====================================================================================
    createUser = async (req, res) => {
        try {
            let user = req.body;
            //1. Validate if this user does exist or not
            let [err, existUser] = await this.userService.getUser({ email: user.email });
            if (existUser) {
                return responseError(res, constant.ERROR_USER_EXIST);
            }

            //2. Create user
            let [error, result] = await this.userService.createUser(user);
            return response(res, constant.SUCCESS_CODE_OK, result);
        } catch (err) {
            return response(res, constant.ERROR_CODE_BAD_REQUEST);
        }
    }
    //================================================================================
    //TODO: GET ALL USER LIST
    //EndPoint: GET /users
    //Parameters: NONE
    //Body: User object
    //User object:{user_name:string,email:string,password:string,avatar:text,role:integer}
    //================================================================================
    getUsers = async (req, res) => {
        try {
            //1. Check the request person is admin or not
            //if he doesn't not admin, response error here

            //2. Get all users
            let [error, result] = await this.userService.getAllUsers();
            console.log(error)
            return response(res, constant.SUCCESS_CODE_OK, result);
        } catch (err) {
            return response(res, constant.ERROR_CODE_BAD_REQUEST);
        }
    }

    //================================================================================
    //TODO: Update User
    //EndPoint: POST /users
    //Parameters: NONE
    //Body: User object
    //User object:{id:string, user_name:string,email:string,[password:string],avatar:text,role:integer}
    //================================================================================
    updateUser = async (req, res) => {
        try {
            let user = req.body;
            //if not change password, remove it from user object
            //so it won't update to table
            if (!user.password) delete user.password;

            //update user
            let [error, result] = await this.userService.updateUser(user);
            return response(res, constant.SUCCESS_CODE_OK, result);
        } catch (err) {
            return response(res, constant.ERROR_CODE_BAD_REQUEST);
        }
    }

    //================================================================================
    //TODO: Delete User
    //EndPoint: DEL /users/:user_id
    //Parameters: user_id
    //================================================================================
    deleteUser = async (req, res) => {
        try {
            //1. Check the request person is admin or not
            //if he doesn't not admin, response error here

            //2. Delete user
            let userID = req.params["user_id"];
            let [error, result] = await this.userService.deleteUser(userID);
            return response(res, constant.SUCCESS_CODE_OK, result);
        } catch (err) {
            return response(res, constant.ERROR_CODE_BAD_REQUEST);
        }
    }
}

module.exports = new UserController();