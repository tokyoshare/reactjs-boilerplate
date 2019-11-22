import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import EditIcon from "@material-ui/icons/Edit";
import SettingIcon from "@material-ui/icons/Settings";
import SimpleReactValidator from 'simple-react-validator';
import { UserRoles } from "constants/index";

const UserCard = (props) => {
    let { userData } = props;
    let avatar = userData.avatar || "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png";
    return (
        <Card id="user-card">
            <div id="setting"><SettingIcon /></div>
            <Avatar id="avatar" alt="profile" src={avatar} />
            <div id="name">{userData.user_name}</div>
            <div id="email">{userData.email} | {UserRoles.getRoleName(userData.role)}</div>
            <Button color="primary" id="edit-button" onClick={() => { props.onEditUser(userData) }}>
                Change
            </Button>
        </Card>
    )
}

export default UserCard;