import BaseAPI from './BaseAPI';
import * as config from "../config";
export default class UserAPI extends BaseAPI {
    constructor() {
        super(config.USER_API_URL);
    }
    login(user) {
        console.log(config.USER_API_URL);
        return this.connect("users/login").setBody({ ...user }).post();
    }
    checkAuthen() {
        return this.connect("users/authen").get();
    }
    getUsers() {
        return this.connect("users/").get();
    }
    createUser(user) {
        return this.connect(`users/`).setBody({ ...user }).post();
    }
    updateUser(user) {
        return this.connect(`users/`).setBody({ ...user }).put();
    }
}

