import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import React from 'react';

function SignUpButton(props) {
    const {loginWithRedirect} = useAuth0();
    return (
        <Button
            onClick={() => 
                loginWithRedirect({
                    screen_hint: "signup"
                })
            }
        >
            Sign Up
        </Button>
    )
}

export default SignUpButton;