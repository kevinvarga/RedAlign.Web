import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faLandmark, faPlusCircle, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Switch } from 'react-router-dom';
import { portalDrawerWidth } from '../common/general';
import Companies from './views/settings/Companies';
import Users from './views/settings/Users';
import SettingsHeader from './views/settings/SettingsHeader';
import Company from './views/settings/company/Company';
import Equipment from './views/settings/company/facility/equipment/Equipment';
import Facility from './views/settings/company/facility/Facility';
import AlignmentSystem from './views/settings/company/alignmentsystem/AlignmentSystem';

function Settings(props) {
    const [ currentSetting, setCurrentSetting] = useState("Companies");

    const handleClick = (event) => {
        setCurrentSetting(event.currentTarget.dataset.settings);
    }

    const buttonList = () => {
        let buttons = [];
        return buttons;
    }

    return(
        <Box id='settings-top-container' display="flex" flexDirection="column" style={{height: `calc(100% - ${64}px)`}}   >
            <Drawer
                variant="permanent"
            >
                <Toolbar id="gutter-settings-menu" /> 
                <Box display="flex" width="100%">
                    <Box p={1} >
                        <Link to="/" className="settings-menu-nav" ><FontAwesomeIcon icon={faArrowCircleLeft} ></FontAwesomeIcon> Main</Link>               
                    </Box>
                </Box>
                <Box p={1}>
                    <Typography variant="h6">Settings</Typography>
                </Box>
                <List>
                    <ListItem button component={Link} to="/settings/companies" onClick={handleClick} data-settings='Companies' >
                        <ListItemIcon><FontAwesomeIcon icon={faLandmark} /></ListItemIcon>
                        <ListItemText>Companies</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/settings/admins" onClick={handleClick} data-settings='Admins' >
                        <ListItemIcon><FontAwesomeIcon icon={faUsersCog} /></ListItemIcon>
                        <ListItemText>Admins</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Box id="setting-container" width="auto" marginLeft={`${portalDrawerWidth}px`} flex={1} >
                <SettingsHeader value={currentSetting} buttons={buttonList()} />
                <Switch>
                    <Route exact path="/settings" component={Companies} />
                    <Route exact path="/settings/companies/company/:id/facility/:id/equipment/:id" component={Equipment} />
                    <Route exact path="/settings/companies/company/:id/facility/:id" component={Facility} />
                    <Route exact path="/settings/companies/company/:id/alignmentsystem/:id" component={AlignmentSystem} />
                    <Route exact path="/settings/companies/company/:id" component={Company} />
                    <Route exact path="/settings/companies" component={Companies} />
                    <Route exact path="/settings/admins" component={Users} />
                </Switch>    
            </Box>
        </Box>
    );
}

export default connect(null, { })(Settings);