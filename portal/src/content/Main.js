import React from 'react';
import { Box, Drawer, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Toolbar } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import Measurements from './views/main/Measurements';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';
import { portalDrawerWidth } from '../common/general';
import MaintenanceSchedule from './views/main/MaintenanceSchedule';

export default function Main(props) {

    return (
        <Box m={1}>
            <Drawer 
                variant="permanent"
            >
                <Toolbar id="gutter-main" />
                <Box m={1}>
                    <FormControl>
                        <InputLabel shrink id="select-company-label">Company</InputLabel>
                        <Select
                            labelId="select-company-label"
                            value={0}
                            autoWidth={true}
                            defaultValue={0}
                        >
                            <MenuItem value={0} >RedAlign Pumps</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <List>
                    <ListItem button component={Link} to="/main/measurements" >
                        <ListItemIcon><FontAwesomeIcon icon={faDraftingCompass} /></ListItemIcon>
                        <ListItemText >Measurements</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/main/schedule" >
                        <ListItemIcon><FontAwesomeIcon icon={faCalendarAlt} /></ListItemIcon>       
                        <ListItemText >Maintenance Schedule</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Box id="main-container" width="auto" marginLeft={`${portalDrawerWidth}px`} >
                <Switch>
                    <Route exact path="/" component={Measurements} />
                    <Route path="/main/measurements" component={Measurements} />
                    <Route path="/main/schedule" component={MaintenanceSchedule} />
                </Switch>
            </Box>
        </Box>
        
    );
}