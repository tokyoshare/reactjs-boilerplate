import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
const HeaderMenu = (props) => {
    const { user, menus } = props;
    if (!user) return null;
    const menuLinks = (
        <Typography variant="h6" className="menu">
            {
                menus.map(menu => {
                    return (
                        <Button color="inherit" className="menu-link" onClick={() => props.push(menu.link)}>
                            {menu.label}
                        </Button>
                    )
                })
            }
        </Typography >
    );

    return (
        <div className="header-menu">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menu-icon" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    {menuLinks}
                    <Button color="inherit" onClick={props.onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default HeaderMenu;