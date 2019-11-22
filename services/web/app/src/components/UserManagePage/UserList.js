import React, { useState } from "react";
import UserCard from './UserCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const UserList = (props) => {
    let { users } = props;
    return (
        <div className="user-list">
            {users && users.map(user => {
                return <UserCard userData={user} {...props} />
            })}
            <Fab id="add-button" color="primary" aria-label="Add" onClick={() => props.onAddUser()}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default UserList;