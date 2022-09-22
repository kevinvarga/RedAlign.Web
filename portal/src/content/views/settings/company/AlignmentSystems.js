import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Spinner from "../../../components/common/Spinner";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import NoData from "../../../components/common/NoData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import PortalApi from "../../../../common/PortalApi";
import { generatePath, Link } from 'react-router-dom';

function AlignmentSystems(props) {
    const { company } = props;
    const [ loading, setLoading ] = useState(true);
    const [ results, setResults ] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if(loading) {
            async function loadAlignmentSystems() {
                try {
                    const token = getAccessTokenSilently();
                    new PortalApi().request(
                        generatePath("/alignmentsystem/:companyId", { "companyId" : company.companyId}),
                        token,
                    )
                    .then(data => {
                        console.log(data);
                        setResults(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    })
                } catch(err) {
                    console.log(err);
                    setLoading(false);
                }
            }
            loadAlignmentSystems();
        }
    }, [loading]);

    const renderTable = () => {
        if(loading) {
            return (<Spinner message="Loading Alignment Systems..." />);
        } else {
            return (                
                <Box>
                    <Box className='settings-header-buttons' >
                        <Button variant="contained" color="primary" component={Link} to={`/settings/companies/company/${company.companyId}/alignmentsystem/0`} startIcon={<FontAwesomeIcon icon={faPlusCircle} />} >
                            Add Alignment System
                        </Button>
                    </Box>
                    {results.length === 0 ?
                        <NoData message="No Alignment Systems are setup. Click the Add button to create a new Alignment System." />
                    :
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Model</TableCell>
                                        <TableCell>Serial Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {results.map((alignment, index) => (
                                    <TableRow 
                                    key={index}
                                    id={alignment.alignmentSystemId} 
                                    hover
                                    component={Link}
                                    to={`/settings/companies/company/${alignment.companyId}/alignmentsystem/${alignment.alignmentSystemId}`}
                                    >
                                        <TableCell >{alignment.name}</TableCell>
                                        <TableCell >{alignment.make}</TableCell>
                                        <TableCell >{alignment.serialNumber}</TableCell>
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
        <Box m={1}>
            {renderTable()}
        </Box>
    );
}

AlignmentSystems.propTypes = {
    company: PropTypes.object.isRequired,
}

export default connect(null, {})(AlignmentSystems);