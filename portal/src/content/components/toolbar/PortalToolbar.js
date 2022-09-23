import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import UserAccountMenu from './account/UserAccountMenu';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    logo: {
        width: "300px"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    }
}));

export default function PortalToolbar(props) {
    const classes = useStyles();
    const { isAuthenticated } = useAuth0();
    
    const renderLogout = () => {
        if( isAuthenticated) {
            return (<UserAccountMenu />);
        }
    }

    return (
        <AppBar position="fixed" className={classes.appBar} >
            <Toolbar>
                <div>
                    <img src="images/logo-reverse.png" className={classes.logo} />
                </div>
                <Typography variant="h6" className={classes.title} >
                    &middot; Portal
                </Typography>
                <div>
                    {renderLogout()}
                </div>
            </Toolbar>
        </AppBar>
    );
}