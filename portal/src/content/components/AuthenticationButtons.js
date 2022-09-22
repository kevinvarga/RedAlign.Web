import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function AuthenticationButton(props) {
    const { isAuthenticated } = useAuth0();
        
    return (isAuthenticated && <LoginButton/>);
}

export default AuthenticationButton;