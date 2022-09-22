import React, { useEffect, useState } from 'react';
import { faArchive, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import PortalApi, { REQUEST_METHOD } from '../../../../../../common/PortalApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { generatePath, matchPath, useHistory, useLocation } from 'react-router';
import { blockerShow } from '../../../../../../actions/SessionActions';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';

function Equipment(props) {
    const { blockerShow } = props;
    const [ equipment, setEquipment ] = useState({
        equipmentType: "",
        pump: "",
        motor: "",
        alignmentSystemId: "",
        facilityId: 0
    });  
    const [ accessToken, setAccessToken ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);
    const [ companyId, setCompanyId ] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if(!loaded) {
            async function loadEquipment() {
                try {
                    if(equipment.equipmentId) {
                        const token = await getAccessTokenSilently();
                        setAccessToken(token);
                        console.log(`facility: ${equipment.facilityId}; equipment id: ${equipment.equipmentId}`);
                        new PortalApi().request(
                            generatePath("/equipment/:facilityId/:equipmentId",{"facilityId": equipment.facilityId, "equipmentId": equipment.equipmentId }), 
                            token)
                        .then(data => {
                            setEquipment(data);
                            setLoaded(true);
                        })
                        .catch(err => {
                            setLoaded(true);
                        });
    
                    } else {
                        setLoaded(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            getId();
            loadEquipment();
        }
    }, [loaded]);

    const getId = () => {
        let path = matchPath(location.pathname, {
            path: "/settings/companies/company/:companyId/facility/:facilityId/equipment/:equipmentId"
        });

        setCompanyId(path.params.companyId);
        equipment.facilityId = Number(path.params.facilityId);
        if(Number(path.params.equipmentId) !== 0) {
            equipment.equipmentId = Number(path.params.equipmentId);
        }
        setEquipment({...equipment});
    }

    const handleOnChange = (event) => {
        if(event.target.name) {
            equipment[event.target.name] = event.target.value;
        } else {
            equipment[event.target.id] = event.target.value;
        }
        setEquipment({...equipment});
    }

    const handleArchiveClick = () => {
        // TODO: add code to archive a location
    }

    const handleDeleteClick = () => {
        try {
            new PortalApi().request(
                generatePath("/equipment/:equipmentId", { "equipmentId" : equipment.equipmentId}),
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
            blockerShow(true, "Saving Equipment...");
            let method = REQUEST_METHOD.POST;
            let path = generatePath("/equipment/:facilityId", { "facilityId": equipment.facilityId });

            if(equipment.equipmentId) {
                method = REQUEST_METHOD.PUT;
                path = generatePath("/equipment/:facilityId/:equipmentId", { "facilityId": equipment.facilityId, "equipmentId": equipment.equipmentId });
            }

            new PortalApi().request(
                path,
                accessToken,
                method,
                equipment)
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

    const closeDialog = (saved) => {
        blockerShow(false);
        history.push(`/settings/companies/company/${companyId}/facility/${equipment.facilityId}`);
    }

    return(
        <Box p={1} >
            
            <Box>
                <TextField id="name" label="Name" fullWidth required={true} value={equipment.name} onChange={handleOnChange} />
                <Select
                    id="equipmentType"
                    name="equipmentType"
                    value={equipment.equipmentType}
                    onChange={handleOnChange}
                >
                    <MenuItem value="" >None</MenuItem>
                    <MenuItem value={1} >Pump</MenuItem>
                </Select>
                <TextField id="motor" label="Motor" fullWidth value={equipment.motor} onChange={handleOnChange} />
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
                                Makes the equipment unavailable yet data is preserved
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
                                disabled={(equipment.equipmentId === undefined)}
                                startIcon={<FontAwesomeIcon icon={faTrash} />}
                                onClick={handleDeleteClick}
                            >Delete</Button>
                        </Box>
                        <Box flexGrow="1" >
                            <Typography variant="caption" >
                                The equipment will be removed and all associated data will be deleted
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default connect(null, { blockerShow })(Equipment);