// import * as Layout from './layouts';

import * as Actions from "redux/actions";
import * as Utils from "utils/Utils";

import React from "react";
import LoginForm from "components/LoginPage/LoginForm";

const LoginPage = (props) => {
    return (
        <div className="login-page">
            <LoginForm {...props} />
        </div>
    );
}

export default Utils.routerConnect(LoginPage, Actions.App, state => {
    return state.App;
});