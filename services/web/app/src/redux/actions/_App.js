import { ActionTypes } from "../../constants";
import { LOCATION_CHANGE } from "react-router-redux";
import * as API from "apis";
import * as Storage from "utils/Storage";
import { StorageKeys } from "constants/index";
import { push } from "react-router-redux";

export const onLogin = ({ email, password }) => {
    return async dispatch => {
        try {
            let { user, token } = await API.User.login({ email, password });
            console.log(user);
            //save to storage
            Storage.storeLocalData(StorageKeys.USER_INFO, user);
            Storage.storeLocalData(StorageKeys.USER_TOKEN, token);
            //transfer data to application
            dispatch({ type: ActionTypes.UPDATE_USER_INFO, user, token });
            dispatch(push("/home"));
        } catch (error) {
            console.log("ERROR", error)
            dispatch(onHandleError(error));
        }
    };
}

export const onLogout = () => {
    return async dispatch => {
        Storage.storeLocalData(StorageKeys.USER_INFO, null);
        Storage.storeLocalData(StorageKeys.USER_TOKEN, null);
        dispatch({ type: ActionTypes.UPDATE_USER_INFO, user: null, token: null });
        dispatch(push("/"));
    }
}

export const checkAuthen = () => {
    return async dispatch => {
        try {
            let user = await API.User.checkAuthen();
            console.log(user);
            //save new data to storage
            Storage.storeLocalData(StorageKeys.USER_INFO, user);
            //transfer data to application
            dispatch({ type: ActionTypes.UPDATE_USER_INFO, user });
        } catch (error) {
            console.log(error)
            dispatch({ type: ActionTypes.UPDATE_USER_INFO, user: null, token: null });
            dispatch(push("/"));
        }
    };
}

export const onHandleError = errCode => {
    console.log("Get error data");
    switch (errCode) {
        case 400:
            break;
        case 300:
            break;
        case 500:
            break;
    }
    return {
        type: ActionTypes.GET_ERROR_DATA,
        errCode
    };
};
