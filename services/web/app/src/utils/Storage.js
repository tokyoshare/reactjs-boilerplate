import * as Encrypt from './Encrypt';

import { Cookies } from 'react-cookie';

import * as config from "../config";

const STORAGE_SECRET_KEY = process.env.STORAGE_SECRET_KEY;

console.log(STORAGE_SECRET_KEY);

/**
 * Encrypt data and store it into localstorage
 * @param {*} key 
 * @param {*} value 
 */
const storeLocalData = (key, value) => {
    console.log(key, value);
    let encryptData = Encrypt.encryptData(JSON.stringify(value), STORAGE_SECRET_KEY);
    console.log(JSON.stringify(value));
    localStorage.setItem(key, encryptData);
}

/**
 * Get data from local storage and decrypt before return
 * @param {*} key 
 */
const getLocalData = (key) => {
    let data = localStorage.getItem(key);

    if (!data) {
        return null;
    }

    let decryptData = Encrypt.decryptData(data, STORAGE_SECRET_KEY);

    return decryptData;
}

/**
 * Encrypt data and store it into session storage
 * @param {*} key 
 * @param {*} value 
 */
const storeSessionData = (key, value) => {
    let encryptData = Encrypt.encryptData(value, STORAGE_SECRET_KEY);
    sessionStorage.setItem(key, encryptData);
}

/**
 * Get data from session storage and decrypt before return
 * @param {*} key 
 */
const getSessionData = (key) => {
    let data = sessionStorage.getItem(key);

    if (!data) {
        return null;
    }

    let decryptData = Encrypt.decryptData(data, STORAGE_SECRET_KEY);

    return decryptData;
}

/**
 * Encrypt data and store it into cookie
 * @param {*} key 
 * @param {*} value 
 */
const storeCookieData = (key, value, encrypt = true, expires = null) => {
    const cookies = new Cookies();

    if (!expires) {
        expires = new Date();
        const month = 1
        expires.setMonth(expires.getMonth() + month);
    }

    const option = {
        path: "/",
        expires: expires,
        // maxAge: number,
        // domain: "localhost",
        // secure: true,
    };

    let encryptData = encrypt ? Encrypt.encryptData(value, STORAGE_SECRET_KEY) : value;
    cookies.set(key, encryptData.toString(), option);
}

/**
 * Get data from cookie and decrypt before return
 * @param {*} key 
 */
const getCookieData = (key, encrypt = true) => {
    const cookies = new Cookies();
    let data = cookies.get(key);

    if (!data) {
        return null;
    }

    let decryptData = encrypt ? Encrypt.decryptData(data, STORAGE_SECRET_KEY) : data;

    return decryptData;
}

export {
    storeLocalData,
    getLocalData,
    storeSessionData,
    getSessionData,
    storeCookieData,
    getCookieData
}

