import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';

function LogoutButton(props) {
    const { logout } = useAuth0();

    return (
        <label
            onClick={() => 

                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            Log Out
        </label>
    );
}

export default connect(null, { })(LogoutButton);