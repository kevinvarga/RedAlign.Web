import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Menu, MenuItem } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../LogoutButton';
import "../../../../Portal.css";
import SettingsButton from '../SettingsButton';

function UserAccountMenu(props) {
    const { user } = useAuth0();
    const [ anchorEl, setAnchorEl ] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () =>{
        setAnchorEl(null);
    }

    return (
        <Box>
            <Button 
                onClick={handleClick}
                size="small"
                startIcon={<Avatar alt={user.name} src={user.picture} />}
                >
                <label className="toolbar-user-menu-button">
                    {user.name}
                </label> 
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}><SettingsButton /></MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}><LogoutButton/></MenuItem>
            </Menu>
        </Box>
    );
}

export default UserAccountMenu;