// import * as Layout from './layouts';

import * as Actions from "redux/actions";
import * as Utils from "utils/Utils";
import { HeaderMenuLayout } from "pages/layouts"
import React, { useEffect } from "react";
import UserList from "components/UserManagePage/UserList";
import Drawer from '@material-ui/core/Drawer';
import UserPanel from "components/UserManagePage/UserPanel";

class UserManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openDrawer: false, user: null }
    }
    componentWillMount() {
        this.props.loadUsers();
    }
    onAddUser() {
        this.setState({ openDrawer: true, user: null });
    }
    onEditUser(user) {
        this.setState({ openDrawer: true, user })
    }
    render() {
        return (
            <HeaderMenuLayout {...this.props}>
                <UserList
                    {...this.props}
                    onAddUser={() => this.onAddUser()}
                    onEditUser={(user) => this.onEditUser(user)}
                />
                <Drawer anchor="right" open={this.state.openDrawer} onClose={() => this.setState({ openDrawer: false })}>
                    <UserPanel {...this.props} user={this.state.user} />
                </Drawer>
            </HeaderMenuLayout>
        );
    }
}
export default Utils.routerConnect(UserManagePage, Actions.UserManagePage, state => {
    return state.UserManagePage;
});