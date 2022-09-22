import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SettingsButton(props){
    return (
        <Link to="/settings" >Settings</Link>
    )
}

export default connect(null, { })(SettingsButton);