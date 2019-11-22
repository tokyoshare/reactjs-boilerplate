import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import SimpleReactValidator from 'simple-react-validator';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const UserPanel = (props) => {

    const validator = new SimpleReactValidator({ autoForceUpdate: this });
    //get user
    const user = props.user;
    //getter,setter for state
    let [state, setState] = useState({});

    if (user) state = { ...user, ...state };

    //input onchange handler
    const handleChange = fieldName => event => {
        setState({ ...state, [fieldName]: event.target.value });
    }

    const allValid = () => {
        if (user) return validator.allValid();
        if (!validator.fieldValid("user_name"))
            return false;
        if (!validator.fieldValid("email"))
            return false;
        if (!validator.fieldValid("password"))
            return false;
        return true;
    }

    const handleSubmit = () => {
        if (allValid()) {
            let newUser = user || {};
            newUser.user_name = state.user_name;
            newUser.password = state.password;
            newUser.email = state.email;
            newUser.avatar = state.avatar;
            newUser.role = state.role;
            props.onSaveUser(newUser);
        } else {
            validator.showMessages();
        }
    }

    const userAdornment = (
        <InputAdornment position="start">
            <PersonIcon />
        </InputAdornment>
    )

    const emailAdornment = (
        <InputAdornment position="start">
            <EmailIcon />
        </InputAdornment>
    )

    const passwordAdornment = (
        <InputAdornment position="start">
            <LockIcon />
        </InputAdornment>
    )

    console.log("USER", user);
    return (
        <div className="user-panel">
            <Typography className="title" color="textSecondary" gutterBottom>
                User Panel
            </Typography>
            <Divider />
            <div className="content">
                <div className="user-name">
                    <InputLabel htmlFor="user_name">Username</InputLabel>
                    <Input
                        id="user_name"
                        value={state.user_name}
                        onChange={handleChange('user_name')}
                        onBlur={validator.showMessageFor("user_name")}
                        startAdornment={userAdornment}
                    />
                </div>
                {validator.message('user_name', state.user_name, 'required', { className: "validate-username" })}
                <div className="email">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        value={state.email}
                        onChange={handleChange('email')}
                        onBlur={validator.showMessageFor("email")}
                        startAdornment={emailAdornment}
                    />
                </div>
                {validator.message('email', state.email, 'required|email', { className: "validate-email" })}
                <div className="password">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        value={state.password}
                        onChange={handleChange('password')}
                        onBlur={validator.showMessageFor("password")}
                        startAdornment={passwordAdornment}
                    />
                </div>
                {!user && validator.message('password', state.password, 'required', { className: "validate-password" })}
                <div className="role">
                    <InputLabel htmlFor="role-label">Role</InputLabel>
                    <Select
                        defaultValue={state.role}
                        value={state.role}
                        onChange={handleChange('role')}
                        onBlur={validator.showMessageFor("role")}
                        input={<Input name="role" id="role-label" />}
                        name="role"
                    >
                        <MenuItem value={2}>User</MenuItem>
                        <MenuItem value={1}>Manager</MenuItem>
                        <MenuItem value={0}>Admin</MenuItem>
                    </Select>
                </div>
                {validator.message('role', state.role, 'required', { className: "validate-password" })}
                {/* {user ? null : validator.message('password', state.password, 'required', { className: "validate-password" })} */}
                <div className="avatar">
                    <InputLabel htmlFor="avatar">Avatar</InputLabel>
                    <Input
                        id="avatar"
                        value={state.avatar}
                        onChange={handleChange('avatar')}
                    />
                </div>
                <div className="wrapper-login-button" onClick={handleSubmit}>
                    <div className="login-bg-button"></div>
                    <Button variant="contained" color="primary" className="login-button">
                        Save
                </Button>
                </div>
            </div>
        </div>
    )
}

export default UserPanel;