import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import PortalApi from '../../../common/PortalApi';
import Spinner from '../../components/common/Spinner';
import NoData from '../../components/common/NoData';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Companies(props) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        async function loadCompanies() {
            if(loading) {
                try {
                    const token = await getAccessTokenSilently();
                    new PortalApi().request("/company", token)
                    .then(data => {
                        setResults(data);
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
        loadCompanies();
    },[loading]);

    const getPath = (company) => {
        return generatePath("/settings/companies/company/:id", { "id": company.companyId});
    }

    const renderTable = () => {
        if(loading) {
            return (<Spinner message="Loading companies" />);
        } else {
            return (
                <Box>
                    <Box className='settings-header-buttons' >
                        <Button variant="contained" color="primary" component={Link} to="/settings/companies/company/0" startIcon={<FontAwesomeIcon icon={faPlusCircle} />} >
                            Add Company
                        </Button>
                    </Box>

                    {(results.length === 0) ?
                        <NoData message="No companies are setup. Click the Add button to create a new Company." />
                    :
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((company, index) => (
                                    <TableRow key={index} id={company.companyId} hover component={Link} to={getPath(company)} >
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.address1}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                </Box>
            );
        }
    }

    return (
        <Box m={1} >
            {renderTable()}
        </Box>
    );
}

export default Companies;