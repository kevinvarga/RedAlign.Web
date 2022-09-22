import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NoData from '../../components/common/NoData';

function Users(props) {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [accessDenied, setAccessDenied] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            if(loading) {
                try {
                    const domain = "redalign.us.auth0.com";
                    const token = await getAccessTokenSilently();
                    /*{
                        scope: 'read:users',
                    });*/
                    console.log(`token: ${token}`);
                    axios.get("https://localhost:5002/api/user",
                    {
                        headers: {'Authorization': `Bearer ${token}`}
                    })
                    .then(resp => {
                        setAccessDenied(false);
                        setUsers(resp.data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                } catch(err) {
                    console.log(err);
                }
            }
        }
        loadUsers();
    }, [loading]);

    return (
        <Box m={1}>
            {accessDenied ?
             <NoData message="You are not authorized to view admin users" />
            :
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableCell>Email</TableCell>
                        <TableCell>Auth0 User Id</TableCell>
                    </TableHead>
                
                <TableBody>
                {users.map((user, index) => {
                    return (<TableRow hover>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.user_id}</TableCell>
                        </TableRow>)
                })}
                </TableBody>
                </Table>
            </TableContainer>      
            }
        </Box>
    );
}

export default Users;