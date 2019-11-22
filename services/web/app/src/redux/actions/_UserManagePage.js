import { ActionTypes } from "../../constants";
import { LOCATION_CHANGE } from "react-router-redux";
import * as API from "apis";
import * as Storage from "utils/Storage";
import { StorageKeys } from "constants/index";
import { push } from "react-router-redux";

export const loadUsers = () => {
    return async dispatch => {
        try {
            let users = await API.User.getUsers();
            console.log(users);
            //transfer data to application
            dispatch({ type: ActionTypes.GET_USERS, users });
        } catch (error) {
            console.log("ERROR", error)
            dispatch(onHandleError(error));
        }
    };
}
export const onSaveUser = (user) => {
    return async dispatch => {
        try {
            if (user.id) {
                await API.User.updateUser(user);
            } else {
                await API.User.createUser(user);
            }
            //transfer data to application
            dispatch(loadUsers());
        } catch (error) {
            console.log("ERROR", error)
            dispatch(onHandleError(error));
        }
    };
}