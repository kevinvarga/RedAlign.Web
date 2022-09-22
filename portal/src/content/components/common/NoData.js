import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

function NoData(props) {
    return (
        <Box id="nodata" display="flex" alignItems="center" width="100%" >
            <Box mx="auto" >
                <Typography>
                    {props.message}
                </Typography>
            </Box>
        </Box>
    );
}

NoData.propTypes = {
    message: PropTypes.string.isRequired
}

export default NoData;