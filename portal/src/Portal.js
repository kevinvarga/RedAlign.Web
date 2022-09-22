import React from 'react';
import { Box, createMuiTheme, Paper, ThemeProvider, Toolbar } from '@material-ui/core';
import './Portal.css';
import Main from './content/Main';
import PortalToolbar from './content/components/toolbar/PortalToolbar';
import Login from './content/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from './content/components/common/Spinner';
import { connect, useSelector } from 'react-redux';
import Settings from './content/Settings';
import { Route, Switch } from 'react-router';
import { portalDrawerWidth } from './common/general';
import LogoutButton from './content/components/LogoutButton';
import Blocker from './content/components/common/Blocker';

const muiTheme = createMuiTheme({
  palette: {  
    primary: {
      main: "#000"
    }
  },
  typography: {
    fontFamily: "Montserrat, sans-serif"
  },
  paper: {
    backgroundColor: "#ccc"
  },
  overrides: {
    MuiDrawer: {
      paper: {
        width: portalDrawerWidth
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: "bold",
      }
    },
    MuiTab: {
      root: {
        backgroundColor: "#000",
        color: "#fff",
        '&$selected': {
          color: "#fff",
        }
      },
      textColorInherit: {
        color: "#fff",
      },
      textColorPrimary: {
        color: "#fff",
        '&$selected': {
          color: "#fff",
        }
      }
    },
    MuiTextField: {
      root: {
        paddingRight: "8px",
        marginBottom: "8px"
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: "32px",
      }
    },
    MuiBreadcrumbs: {
      root: {
        color: "#fff"
      },
      ol: {
        color: "#fff"
      },
      li: {
        color: "#fff"
      },
      separator: {
        color: "#fff"
      }
    }
  }
});

function Portal() {
  const { isLoading, isAuthenticated, error } = useAuth0();
  //const sessionState = useSelector(state => state.session);

  const renderMain = () => {
    if(error) {
      return (<Box>Shoot...spaced it...{error}</Box>);
    } else if(isAuthenticated) {
      return (<Main/>);
    } else if(isLoading) {
      return (<Box>
          <Spinner message="Please wait...logging in" /> 
          <LogoutButton/>
        </Box>);
    } else {
      return (<Login/>);
    }

  }

  return (
    <ThemeProvider theme={muiTheme} >
        <Paper square={true} className="mla-root" >
            <PortalToolbar />
            <Box id="content" className="content-area" >
              <Toolbar id="gutter-content" /> 
              <Switch>
                <Route exact path="/" render={() => (renderMain())} />
                <Route path="/app" render={()=> (renderMain())} />
                <Route path="/main" component={Main} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </Box>
        </Paper>
        <Blocker />
    </ThemeProvider>
  );
}

export default connect(null, {})(Portal);
