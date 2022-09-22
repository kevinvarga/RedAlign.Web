import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export default function Profile(props) {
    const { user } = useAuth0();
    const { name, email } = user;

    return (
        <div>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <h3>{email}</h3>
            </div>
            <div>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    );
}