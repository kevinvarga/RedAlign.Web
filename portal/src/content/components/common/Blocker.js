import { Backdrop, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { connect, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 10,
      color: '#fff',
    },
}));

function Blocker(props) {
    const sessionState = useSelector(state => state.session);
    const classes = useStyles();

    return(
        <Backdrop open={sessionState.blocker.show} className={classes.backdrop} >
            <CircularProgress color="inherit" />
            <Typography variant="h6" >&nbsp;&nbsp;{sessionState.blocker.message}</Typography>
        </Backdrop>
    );
}

export default connect(null, {})(Blocker);