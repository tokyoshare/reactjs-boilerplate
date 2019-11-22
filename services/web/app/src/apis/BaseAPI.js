
import axios from "axios";
import Encrypt from "../utils/Encrypt";
import * as Storage from "utils/Storage";
import { StorageKeys } from "constants/index";

const ENCRYPT_KEY = process.env.TOKEN_SECRET;

export default class BaseAPI {
    constructor(baseURL) {
        console.log(baseURL);
        this.originalURL = baseURL;
    }
    connect(url) {
        let token = Storage.getLocalData(StorageKeys.USER_TOKEN);
        //we reset all params when start to connect
        this.baseURL = this.originalURL;
        this.mParams = {};
        this.mHeaders = { "Authorization": token ? token = JSON.parse(token) : null };
        this.mBody = {};
        this.mURL = url;
        this.mIsEncrypt = false;
        this.mMethod = "get"; //default
        return this;
    }

    addParam(key, value) {
        this.mParams[key] = value;
        return this;
    }

    addHeader(key, value) {
        this.mHeaders[key] = value;
        return this;
    }

    addBody(key, value) {
        this.mBody[key] = value;
        return this;
    }

    setBody(value) {
        this.mBody = value;
        return this;
    }

    appendBody(obj) {
        this.mBody = { ...this.mBody, ...obj };
        return this;
    }

    setEncrypt(isEncrypt) {
        this.mIsEncrypt = isEncrypt;
        return this;
    }

    get() {
        this.mMethod = "get";
        return this.request();
    }

    post() {
        this.mMethod = "post";
        return this.request();
    }

    put() {
        this.mMethod = "put";
        return this.request();
    }

    delete() {
        this.mMethod = "delete";
        return this.request();
    }

    getParams() {
        var params = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedParams = Encrypt.encryptData(this.mParams, ENCRYPT_KEY);
            //and then add to params
            params["params"] = encodedParams;
        } else {
            params = this.mParams;
        }
        return params;
    }

    getHeader() {
        var headers = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedHeader = Encrypt.encryptData(this.mHeaders, ENCRYPT_KEY);
            //and then add to header
            headers["params"] = encodedHeader;
        } else {
            headers = this.mHeaders;
        }
        return headers;
    }

    getBody() {
        var body = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedBody = Encrypt.encryptData(this.mBody, ENCRYPT_KEY);
            //and then add to body
            body["params"] = encodedBody;
        } else {
            body = this.mBody;
        }
        return body;
    }

    request() {
        return new Promise((onSuccess, onError) => {
            var params = {
                method: this.mMethod,
                url: this.mURL,
                params: this.getParams(),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    ...this.getHeader()
                },
                timeout: 30000,
                data: this.getBody()
            };
            if (!this.mURL.startsWith("http")) {
                params.baseURL = this.baseURL;
            }

            axios(params)
                .then(response => {
                    //Decode data here
                    var { data } = response.data;
                    var decodedData = data;
                    console.log(decodedData);
                    //callback
                    onSuccess(decodedData);
                })
                .catch(error => {
                    console.log(error);
                    var errorCode = 400;
                    if (error.response) {
                        errorCode = error.response.status || 400;
                    }
                    onError(errorCode);
                });
        });
    }
}
