// import * as Layout from './layouts';

import * as Actions from "redux/actions";
import * as Utils from "utils/Utils";

import { HeaderMenuLayout } from "pages/layouts"
import React, { useEffect } from "react";

const HomePage = (props) => {
    return (
        <HeaderMenuLayout {...props}>
            Hello World Ho Quoc Huy3
        </HeaderMenuLayout>
    );
}
export default Utils.routerConnect(HomePage, Actions.App, state => {
    return state.App;
});