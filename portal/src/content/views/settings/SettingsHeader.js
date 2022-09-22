import React from 'react';
import PropTypes from 'prop-types';
import { Box, Breadcrumbs, Button, Typography, Link } from '@material-ui/core';
import '../../../Portal.css';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SettingsHeader(props) {
    const { value, buttons } = props;
    const breadcrumbMap = {
        "companies" : {
            "text" :"Companies",
            "to" : "/settings/companies"
        },
        "company" : {
            "text" : "Company",
            "to" : "/settings/companies/company/:id"
        },
        "facility" : {
            "text" : "Facility",
            "to" : "/settings/companies/company/:id/facility/:id"
        },
        "equipment" : {
            "text" : "Equipment",
            "to" : "/settings/companies/company/:id/facility/:id/equipment/:id"
        },
        "alignmentsystem" : {
            "text" : "Alignment System",
            "to" : ""
        }
    }

    const renderButtons = () => {
        return (<Box className='settings-header-buttons' >{buttons.map((button, index) => (
            <Button variant="contained" component={Link} to={button.to} startIcon={<FontAwesomeIcon icon={button.icon} />} >
                {button.text}
            </Button>
        ))}</Box>);
    }

    const renderBreadcrumbs = (location) => {
        let pathNames = location.pathname.split('/').filter((x) => x);
        let links = pathNames.map((value, index) => {
            if(breadcrumbMap[value]) {
                let path = breadcrumbMap[value].to;
                if(path.indexOf(':id') !== -1) {
                    path = path.replace(':id', pathNames[index + 1])
                }

                if(path === location.pathname || path.length === 0) {
                    return <Typography>{breadcrumbMap[value].text}</Typography>
                } else {
                    return  <Link href={path} className="breadcrumb-link" >{breadcrumbMap[value].text}</Link>
                }
            }
        });

        return (<Breadcrumbs  >
            {links}
        </Breadcrumbs>
        );
    }

    return(
        <Box display="flex" className='settings-header'>
            <Box p={1} flexGrow="1" >
                <Route>
                    {({location}) => {
                        
                        return( renderBreadcrumbs(location)
                        );
                    }}
                </Route>
            </Box>
            <Box flexGrow="1" >
                {renderButtons()}
            </Box>
        </Box>
    );
}

SettingsHeader.propTypes = {
    value: PropTypes.string.isRequired,
    buttons: PropTypes.array,
}
export default SettingsHeader;