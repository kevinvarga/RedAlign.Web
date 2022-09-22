import React from 'react';
import { Box, Container, Paper, Toolbar } from '@material-ui/core';
import LoginButton from './components/LoginButton';

function Login(props) {
    return (
        <Container maxWidth="xs">
            <Paper>
                <Toolbar/>
                <Box display="flex" m={1} p={1} alignItems="center">
                    <Box mx="auto">
                        <LoginButton />
                    </Box>
                </Box>
            </Paper>
        </Container>
    )

}

export default Login;