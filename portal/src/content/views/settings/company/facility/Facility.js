import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PortalApi, { REQUEST_METHOD } from '../../../../../common/PortalApi';
import { Box, Tab, Tabs } from '@material-ui/core';
import FacilityInfo from './FacilityInfo';
import Spinner from '../../../../components/common/Spinner';
import { generatePath, matchPath, useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import EquipmentList from './EquipmentList';

function Facility(props) {
    const [ tabValue, setTabValue ] = useState(0);
    const [ loaded, setLoaded ] = useState(false);
    const [ facility, setFacility ] = useState({ 
        name: "",
        address1 : "",
        address2 : "",
        city : "",
        state : "",
        postalCode : "",
        companyId : 0
    });
    const [ accessToken, setAccessToken ] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const location = useLocation();

    useEffect(() => {
        if(!loaded) {
            async function loadFacility() {
                try {
                    if(facility.facilityId) {
                        const token = await getAccessTokenSilently();
                        setAccessToken(token);
                        console.log(`companyid: ${facility.companyId}; facilityid: ${facility.facilityId}`);
                        new PortalApi().request(
                            generatePath("/facility/:companyId/:facilityId",{"companyId": facility.companyId, "facilityId": facility.facilityId }), 
                            token)
                        .then(data => {
                            setFacility(data);
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
            loadFacility();
        }
    }, [loaded]);

    const getId = () => {
        let path = matchPath(location.pathname, {
            path: "/settings/companies/company/:companyId/facility/:facilityId"
        });
        facility.companyId = Number(path.params.companyId);
        if(Number(path.params.facilityId) !== 0) {
            facility.facilityId = Number(path.params.facilityId);
        }
        setFacility({...facility});
    }

    const handleOnChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const handleFacilityChange = (facility) => {
        setFacility({...facility});
    }

    const renderTab = () => {
        if(loaded) {
            switch(tabValue) {
                case 0: {
                    return (<FacilityInfo facility={facility} onChange={handleFacilityChange} accessToken={accessToken} /> );
                }
                case 1: {
                    return (<EquipmentList facility={facility} />);
                }
            }
        } else {
            return (<Spinner message="Loading facility..." />);
        }
    }

    return (
        <Box className="edit-container" >
            <Tabs
                value={tabValue}
                indicatorColor="secondary"
                textColor="primary"
                variant="fullWidth"
                onChange={handleOnChange}
            >
                <Tab key="general" label="General" />
                <Tab key="equipment" label="Equipment" />
            </Tabs>            
            <Box>
                {renderTab()}
            </Box>
        </Box>
    );
}


export default connect(null, { }) (Facility);