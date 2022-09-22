import React from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@material-ui/core';

function Spinner(props) {

    return (
        <Box id="spinner" width="100%" height="100%" >
            <Box height="100%" >
                <Box display="block" width="100%" >
                    <LinearProgress
                        color="secondary"
                    ></LinearProgress>
                </Box>
                <Box display="flex" alignItems="center" width="100%" >
                    <Box mx="auto" >
                        <Typography>
                            {props.message}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

Spinner.propTypes={
    message: PropTypes.string,
};

export default Spinner;