import React from 'react';
const Authen = (props) => {
    const { component, user, redirect } = props;
    const roles = props.roles || [];
    const authenPage = (WrappedComponent, UnAuthenComponent) => {
        return () => {
            let role = user ? user.role : -1;
            let isAccessable = roles.length == 0 || roles.indexOf(role) > -1;
            console.log("CAN ACCESS", roles, user, role, isAccessable);
            return isAccessable ? <WrappedComponent {...props} /> : <UnAuthenComponent {...props} />;
        }
    }
    return authenPage(component, redirect);
}
export default Authen;