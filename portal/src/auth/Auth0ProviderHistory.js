import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Auth0ProviderHistory = ({children}) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const client = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={client}
            redirectUri={window.location.origin}
            responseType="token id_token"
            audience="https://localhost:5002/api/" // move to .env
            scope="" // read:measurements move to .env
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderHistory;