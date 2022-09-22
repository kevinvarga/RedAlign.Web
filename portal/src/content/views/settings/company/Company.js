import React, { useEffect, useState } from 'react';
import { Box, Button, Tabs, Tab, Tooltip } from '@material-ui/core';
import { generatePath, matchPath, useLocation, useHistory } from 'react-router';
import CompanyInfo from './CompanyInfo';
import Facilities from './Facilities';
import Users from './Users';
import Spinner from '../../../components/common/Spinner';
import PortalApi from '../../../../common/PortalApi';
import { useAuth0 } from '@auth0/auth0-react';
import '../../../../Portal.css';
import { connect } from 'react-redux';
import { blockerShow } from '../../../../actions/SessionActions';
import AlignmentSystems from './AlignmentSystems';

function Company(props) {
    const { blockerShow } = props;
    const [ tabValue, setTabValue ] = useState(0);
    const [ company, setCompany ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const [ accessToken, setAccessToken ] = useState(null);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        async function loadCompany() {
            if(!loaded) {
                let companyId = getId();
                if(companyId !== "0") {
                    const token = await getAccessTokenSilently();
                    setAccessToken(token);
                    new PortalApi().request(`/company/${companyId}`, token)
                    .then(data => {
                        setCompany(data);
                        setLoaded(true);
                    })
                    .catch(err => {
                        setLoaded(true);
                    });
                } else {
                    let newCompany = { 
                        name: "",
                        address1 : "",
                        address2 : "",
                        city : "",
                        state : "",
                        postalCode : "",
                    }
                    console.log(newCompany);
                    setCompany({...newCompany});
                    setLoaded(true);
                }
            }
        };
        loadCompany();
    }, [loaded]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const getId = () => {
        let path = matchPath(location.pathname, {
            path: "/settings/companies/company/:id"
          });
        return path.params.id;
    }

    const handleInfoChange = (company) => {
        setCompany({...company});
    }

    const renderTab = () => {
        if(loaded) { 
            switch(tabValue) {
                case 1: 
                    return (<Facilities company={company} />);
                case 2:
                    return (<AlignmentSystems company={company} />);
                case 3:
                    return (<Users/>);
                default:
                    return (<CompanyInfo company={company} accessToken={accessToken} onChange={handleInfoChange} />);
            }
        } else {
            return (<Spinner message="Loading company..."/>);
        }
    }

    return(
        <Box className="edit-container" >
            <Tabs 
                    value={tabValue}
                    indicatorColor="secondary"
                    textColor="primary"
                    onChange={handleChange}
                    variant="fullWidth"
                >
                <Tab key="general" label="General Info" />
                <Tab key="facilities" label="Facilities" />
                <Tab key="alignment" label="Alignment Systems" />
                <Tab key="users" label="Users" />
            </Tabs>
            <Box m={1} className="edit-content" >
                {renderTab()}
            </Box>
        </Box>
    );
}

export default connect(null, { blockerShow }) (Company);