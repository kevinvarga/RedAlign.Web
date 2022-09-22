import React from 'react';
import { Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import NoData from '../../components/common/NoData';

function MaintenanceSchedule(props) {
    return (
        <Box m={1}>
            <NoData message="Maintenance Schedule"></NoData> 
            <NoData message="Show calendar here..."></NoData> 
        </Box>
    );
}

export default MaintenanceSchedule;