import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as App from "./_App";
import * as UserManagePage from "./_UserManagePage";

import { ActionTypes } from "../../constants";

export const matchActionsToProps = (actions, dispatch) => {
    if (actions == null) actions = {};
    var obj = bindActionCreators(actions, dispatch);
    //always add push to props
    obj.push = (url) => { dispatch(push(`${url}`)) };
    //always add show, hide main menu to props
    obj.displayMessage = (status, message, onFinish) => {
        dispatch(App.displayMessage(status, message, onFinish));
    }
    console.log("ACTIONS", obj);
    return obj;
}

export {
    App,
    UserManagePage
}
