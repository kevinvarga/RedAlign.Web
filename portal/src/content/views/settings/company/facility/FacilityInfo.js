import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Button, Typography, IconButton } from '@material-ui/core';
import PortalApi, { REQUEST_METHOD } from '../../../../../common/PortalApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { blockerShow } from '../../../../../actions/SessionActions';
import { generatePath, matchPath, useHistory, useLocation } from 'react-router';

function FacilityInfo(props) {
    const { facility, onChange, accessToken, blockerShow } = props;
    const [ loaded, setLoaded ] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const handleChange = (event) => {
        facility[event.target.id] = event.target.value;
        onChange(facility);
    }

    const closeDialog = (saved) => {
        blockerShow(false);
        history.push(`/settings/companies/company/${facility.companyId}`);
    }

    const handleArchiveClick = () => {
        // TODO: add code to archive a location
    }

    const handleDeleteClick = () => {
        try {
            new PortalApi().request(
                generatePath("/facility/:facilityId", { "facilityId" : facility.facilityId}),
                accessToken,
                REQUEST_METHOD.DELETE)
            .then(resp => {
                closeDialog(true);
            })
            .catch(err => {
                console.log(err);
                closeDialog(true);
            })
        } catch(err) {
            console.log(err);
            closeDialog(false);
        }
    }

    const handleSaveClick = (event) => {
        try {
            blockerShow(true, "Saving Facility...");
            let method = REQUEST_METHOD.POST;
            let path = generatePath("/facility/:companyId", { "companyId": facility.companyId });

            if(facility.facilityId) {
                method = REQUEST_METHOD.PUT;
                path = generatePath("/facility/:companyId/:facilityId", { "companyId": facility.companyId, "facilityId": facility.facilityId });
            }

            new PortalApi().request(
                path,
                accessToken,
                method,
                facility)
            .then(resp => {
                closeDialog(true);
            })
            .catch(err => {
                closeDialog(false);
            });
        } catch (err) {
            console.log(err);
            closeDialog(false);
        }
    }

    return(
        <Box p={1} >
            <Box>
                <TextField id="name" label="Name" fullWidth required={true} value={facility.name} onChange={handleChange} />
                <TextField id="address1" label="Address" fullWidth value={facility.address1} onChange={handleChange} />
                <TextField id="address2" label="Suite/Apt" fullWidth value={facility.address2} onChange={handleChange} />
                <TextField id="city" label="City" size="normal" value={facility.city} onChange={handleChange} />
                <TextField id="state" label="State" size="normal" value={facility.state} onChange={handleChange} />
                <TextField id="postalCode" label="Postal Code" size="normal" value={facility.postalCode} onChange={handleChange} />
            </Box>

            <Box className="sad-button-container" >
                <Box className="sad-button-frame save" display="flex" >
                    <Box mx="auto" >
                        <Button
                            className="sad-button save"
                            variant="contained"
                            onClick={handleSaveClick}
                            startIcon={<FontAwesomeIcon icon={faSave} />}
                        >Save</Button>
                    </Box>
                </Box>
                <Box className="sad-button-frame danger" display="block">
                    <Box display="flex" alignItems="baseline" >
                        <Box flexGrow="0" >
                            <Button
                                className="sad-button"
                                variant="contained"
                                color="secondary"
                                disabled={true}
                                onClick={handleSaveClick}
                                startIcon={<FontAwesomeIcon icon={faArchive} />}
                            >Archive</Button>
                        </Box>
                        <Box flexGrow="1">
                            <Typography variant="caption">
                                Makes the facility unavailable yet data is preserved
                                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="sad-button-frame danger" display="block">
                    <Box display="flex" alignItems="baseline"  >
                        <Box flexGrow="0" >
                            <Button
                                className="sad-button"
                                variant="contained"
                                color="secondary"
                                disabled={(facility.facilityId === undefined)}
                                startIcon={<FontAwesomeIcon icon={faTrash} />}
                                onClick={handleDeleteClick}
                            >Delete</Button>
                        </Box>
                        <Box flexGrow="1" >
                            <Typography variant="caption" >
                                The facility will be removed and all associated data will be deleted
                                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        
        </Box>
    );
}

FacilityInfo.propTypes = {
    facility: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    accessToken: PropTypes.object.isRequired
}

export default connect(null, { blockerShow })(FacilityInfo);