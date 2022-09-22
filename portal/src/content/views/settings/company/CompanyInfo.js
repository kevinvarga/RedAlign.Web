import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tooltip, TextField, Typography } from '@material-ui/core';
import { generatePath, useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import PortalApi, { REQUEST_METHOD } from '../../../../common/PortalApi';
import { blockerShow } from '../../../../actions/SessionActions';
import { connect } from 'react-redux';

function CompanyInfo(props) {
    const { company, accessToken, onChange, blockerShow } = props;
    const history = useHistory();

    const handleOnChange = (event) => {
        company[event.target.id] = event.target.value;
        onChange(company);
    }
    
    const handleSaveClick = (event) => {
        blockerShow(true, "Saving...");
        let method = REQUEST_METHOD.POST
        let path = "/company";
    
        if (company.companyId) {
            method = REQUEST_METHOD.PUT;
            path = generatePath(`${path}/:id`, { "id": company.companyId});
        }
    
        new PortalApi().request(
            path, 
            accessToken, 
            method, 
            company)
        .then(resp => {
            blockerShow(false);
            history.push("/settings/companies");
        })
        .catch(err => {
            blockerShow(false);
        });
    }
    
    const handleArchiveClick = (event) => {
        blockerShow(true, "Archiving company...");
        
        new PortalApi().request(
            generatePath("/company/archive/:id", { "id" : company.companyId}),
            accessToken,
            REQUEST_METHOD.PUT,
            company)
        .then(resp => {
            blockerShow(false);
            history.push("/settings/companies");
        })
        .catch(err => {
            blockerShow(false);
        });
    }

    return(
        <Box style={{
                "overflow-y": "auto",
                "overflow-x": "hidden"
        }}>
            <TextField id="name" label="Name" size="normal" fullWidth={true} required value={props.company.name} onChange={handleOnChange} />
            <TextField id="address1" label="Address" size="normal" fullWidth={true} value={props.company.address1} onChange={handleOnChange}  />
            <TextField id="address2" label="Suite/Apt." size="normal" fullWidth={true} value={props.company.address2} onChange={handleOnChange}  />
            <TextField id="city" label="City" size="normal" value={props.company.city} onChange={handleOnChange} />
            <TextField id="state" label="State" size="normal" value={props.company.state} onChange={handleOnChange} />
            <TextField id="postalCode" label="Postal Code" size="normal" value={props.company.postalCode} onChange={handleOnChange}  />
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
                                onClick={handleArchiveClick}
                                startIcon={<FontAwesomeIcon icon={faArchive} />} 
                            >Archive</Button>
                        </Box>
                        <Box flexGrow="1"> 
                            <Typography variant="caption">
                            Makes the company unavailable yet data is preserved
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
                                startIcon={<FontAwesomeIcon icon={faTrash} />} 
                            >Delete</Button>
                        </Box>
                        <Box flexGrow="1" >
                            <Typography variant="caption" >
                            The company will be removed and all associated data will be deleted
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

CompanyInfo.propTypes = {
    company: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    accessToken: PropTypes.object.isRequired
}
export default connect(null, {blockerShow})(CompanyInfo);