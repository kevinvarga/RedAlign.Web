import { Box } from '@material-ui/core';
import React from 'react';
import NoData from '../../../components/common/NoData';

function Users(props) {
    return (
        <Box m={1}>
            <NoData message="This section is to be used to assign users to a company" />
        </Box>
    );
}

export default Users;