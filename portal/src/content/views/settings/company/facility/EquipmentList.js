import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generatePath, Link, useHistory } from 'react-router-dom';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';
import PortalApi from '../../../../../common/PortalApi';

function EquipmentList(props) {
    const { facility } = props;
    const [results, setResults] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if(!loaded) {
            async function LoadEquipment() {
                try {
                    const token = await getAccessTokenSilently();
                    new PortalApi().request(
                        generatePath("/equipment/:facilityId", { "facilityId" : facility.facilityId}),
                        token)
                    .then(data => {
                        console.log(data);
                        setResults(data);
                        setLoaded(true);
                    })
                    .catch(err => {
                        console.log(err);
                        setLoaded(true);
                    })
                } catch (err) {
                    console.log(err);
                    setLoaded(true);
                }
            }
            LoadEquipment();
        }
    }, [loaded]);

    return (
        <Box m={1} >
            <Box className='settings-header-buttons' >
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/settings/companies/company/${facility.companyId}/facility/${facility.facilityId}/equipment/0`}
                    startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                >
                    Add Equipment
            </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Motor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((equip, index) => (
                            <TableRow
                                key={index}
                                id={facility.facilityId}
                                hover
                                component={Link}
                                to={`/settings/companies/company/${facility.companyId}/facility/${facility.facilityId}/equipment/${equip.equipmentId}`}
                            >
                                <TableCell >{equip.name}</TableCell>
                                <TableCell >{equip.motor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

EquipmentList.propTypes = {
    facility: PropTypes.object.isRequired
}

export default connect(null, {})(EquipmentList);