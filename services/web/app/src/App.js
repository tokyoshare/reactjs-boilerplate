import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import React from "react";
import Authen from "components/Commons/Authen"
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import UserManagePage from "pages/UserManagePage";
import * as Actions from "./redux/actions";
import * as Utils from "utils/Utils";
import { UserRoles } from "constants/index";

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, Arial, Meiryo, sans-serif'
});

const userMenus = [
  { label: "Home", link: "/home" }
]
const adminMenus = [
  { label: "Users", link: "/home" },
]

class App extends React.Component {
  componentWillMount() {
    if (this.props.checkAuthen)
      this.props.checkAuthen();
  }
  render() {
    let props = this.props;
    let user = props.user;
    //assign menus base on role
    let menus = user && user.role in UserRoles.ADMIN_GROUP ? adminMenus : userMenus;
    props = { ...props, menus };
    //authen pages
    let loginPage = Authen({ ...props, component: LoginPage });
    let usersPage = Authen({ ...props, component: UserManagePage, redirect: LoginPage, roles: UserRoles.ADMIN_GROUP });
    let homePage = Authen({ ...props, component: HomePage, redirect: LoginPage, roles: UserRoles.USER_GROUP });
    //if user is admin, change homepage to user management page
    if (user && UserRoles.ADMIN_GROUP.indexOf(user.role) > -1) {
      homePage = usersPage;
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Switch>
          <Route exact path="/" component={loginPage} />
          <Route exact path="/home" component={homePage} />
          <Route path="*" component={homePage} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
export default Utils.routerConnect(App, Actions.App, props => {
  return props.App;
});
