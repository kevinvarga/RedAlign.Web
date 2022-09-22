import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import PortalApi, { REQUEST_METHOD } from '../../../../../common/PortalApi';
import { blockerShow } from '../../../../../actions/SessionActions';
import { generatePath, matchPath, Link, useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import createUUID from '../../../../../common/general';

function AlignmentSystem(props) {
    const [alignmentSystem, setAlignmentSystem] = useState({
        name: "",
        make: "",
        serialNumber: "",
        uniqueId: "",
        companyId: 0
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            async function loadAlignmentSystems() {
                try {
                    if (alignmentSystem.alignmentSystemId) {
                        const token = getAccessTokenSilently();
                        setAccessToken(token);

                        new PortalApi().request(
                            generatePath("/alignmentsystem/:companyId/:alignmentsystemId", { "companyId": alignmentSystem.companyId, "alignmentsystemId" : alignmentSystem.alignmentSystemId }),
                            token,
                        )
                        .then(data => {
                            setAlignmentSystem(data);
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                            setLoading(false);
                        });
                    } else {
                        alignmentSystem.uniqueId = createUUID();
                        setAlignmentSystem({ ...alignmentSystem });
                        setLoading(true);
                    }
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            }
            getId();
            loadAlignmentSystems();
        }
    }, [loading]);

    const getId = () => {
        let path = matchPath(location.pathname, {
            path: "/settings/companies/company/:companyId/alignmentsystem/:alignmentSystemId"
        });
        alignmentSystem.companyId = Number(path.params.companyId);
        if (Number(path.params.alignmentSystemId) !== 0) {
            alignmentSystem.alignmentSystemId = Number(path.params.alignmentSystemId);
        }
        setAlignmentSystem({ ...alignmentSystem });
    }

    const handleOnChange = (event) => {
        alignmentSystem[event.target.id] = event.target.value;
        setAlignmentSystem({ ...alignmentSystem });
    }

    const closeDialog = (saved) => {
        blockerShow(false);
        history.push(`/settings/companies/company/${alignmentSystem.companyId}`);
    }

    const handleSaveClick = (event) => {
        try {
            blockerShow(true, "Saving Alignment System...");
            let method = REQUEST_METHOD.POST;
            let path = generatePath("/alignmentsystem/:companyId", { "companyId": alignmentSystem.companyId });

            if(alignmentSystem.alignmentSystemId) {
                method = REQUEST_METHOD.PUT;
                path = generatePath("/alignmentsystem/:companyId/:alignmentSystemId", { "companyId": alignmentSystem.companyId, "alignmentSystemId": alignmentSystem.alignmentSystemId });
            }

            new PortalApi().request(
                path,
                accessToken,
                method,
                alignmentSystem)
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

    const handleDeleteClick = (event) => {

    }

    return (
        <Box m={1}>
            <Box>
                <TextField id="name" fullWidth label="Name" value={alignmentSystem.name} onChange={handleOnChange} />
                <TextField id="make" fullWidth label="Model" value={alignmentSystem.make} onChange={handleOnChange} />
                <TextField id="serialNumber" fullWidth label="Serial Number" value={alignmentSystem.serialNumber} onChange={handleOnChange} />
                <Box mt={1} >
                    <TextField id="uniqueId" fullWidth disabled={true} label="Unique ID" value={alignmentSystem.uniqueId} variant="outlined" />
                </Box>
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
                            Makes the alignment system unavailable yet data is preserved
                                            </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="sad-button-frame danger" display="block" >
                <Box display="flex" alignItems="baseline"  >
                    <Box flexGrow="0" >
                        <Button
                            className="sad-button"
                            variant="contained"
                            color="secondary"
                            disabled={(alignmentSystem.alignmentSystemId === undefined)}
                            startIcon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={handleDeleteClick}
                        >Delete</Button>
                    </Box>
                    <Box flexGrow="1" >
                        <Typography variant="caption" >
                            The alignment system will be removed and all associated data will be deleted
                                            </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Box >
    );
}

export default connect(null, { blockerShow })(AlignmentSystem)