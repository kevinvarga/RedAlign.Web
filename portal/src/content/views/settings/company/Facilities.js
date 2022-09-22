import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip } from '@material-ui/core';
import Spinner from '../../../components/common/Spinner';
import PortalApi from '../../../../common/PortalApi';
import { useAuth0 } from '@auth0/auth0-react';
import { generatePath, Link, useHistory } from 'react-router-dom';
import NoData from '../../../components/common/NoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function Facilities(props) {
    const { company, onChange } = props;
    const [ loading, setLoading ] = useState(true);
    const [ results, setResults ] = useState([]);
    const { getAccessTokenSilently} = useAuth0();
    const [ facilityId, setFacilityId ] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if(loading) {
            async function loadFacilities() {
                try {
                    const token = await getAccessTokenSilently();
                    new PortalApi().request(
                        generatePath("/facility/:companyId", { "companyId" : company.companyId}),
                        token)
                        .then(data => {
                            setResults(data);
                            setLoading(false);
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log(err);
                        });
                } catch(err) {
                    console.log(err);
                }
            }
            loadFacilities();
        }
    }, [loading]);

    const renderTable = () => {
        if(loading) {
            return (<Spinner message="Loading Facilities..." />);
        } else {
            return (
                <Box>
                    <Box className='settings-header-buttons' >
                        <Button variant="contained" color="primary" component={Link} to={`/settings/companies/company/${company.companyId}/facility/0`} startIcon={<FontAwesomeIcon icon={faPlusCircle} />} >
                            Add Facility
                        </Button>
                    </Box>
                    {results.length === 0 ?
                        <NoData message="No facilities are setup. Click the Add button to create a new Facility." />
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
                                {results.map((facility, index) => (
                                    <TableRow 
                                    key={index}
                                    id={facility.facilityId} 
                                    hover
                                    component={Link}
                                    to={`/settings/companies/company/${company.companyId}/facility/${facility.facilityId}`}
                                    >
                                        <TableCell >{facility.name}</TableCell>
                                        <TableCell >{facility.address1}</TableCell>
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

    return(
        <Box m={1} >
            {renderTable()}
        </Box>
    );
}

Facilities.propTypes = {
    company: PropTypes.object.isRequired,
    onChange: PropTypes.func,
}

export default Facilities;