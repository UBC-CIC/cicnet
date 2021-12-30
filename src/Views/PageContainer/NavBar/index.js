import React from 'react';
import { Auth } from "aws-amplify";
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";

import { Avatar, Drawer, Hidden, List, ListItemAvatar, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// icons
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import PeopleIcon from '@material-ui/icons/People';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

// inner
import { updateLoginState } from "../../../Actions/loginActions";

// css
import './index.css'

// constants
const drawerWidth = 240;

// https://material-ui.com/components/drawers/#responsive-drawer

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app/title bar
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#082142',
    color: theme.palette.getContrastText("#082142"),
  },
  flip: {
    transform: "rotate(-180deg)"
  },
  iconInactive: {
    color: theme.palette.getContrastText("#082142"),
  }
}));

function NavBar(props) {
  const { window } = props;
  const { pathname } = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  async function onSignOut() {
      await Auth.signOut().then(() => {
        updateLoginState("signIn");

        history.push("/")
      });
  }

  const NavBarOptions = {
    'New Update': {
        icon: <AddOutlinedIcon/>,
        link: "/update"
    },
    'Challenges': {
        icon: <WbIncandescentOutlinedIcon className={classes.flip}/>,
        link: "/challenges"
    },
    'News/Events': {
        icon: <ion-icon name="newspaper-outline"></ion-icon>,
        link: "/news"
    },
    'Roles': {
      icon: <PeopleIcon/>,
      link: "/roles"
  }
  }

  const drawer = (
    <div style={{height: "100%"}}>
        {/* CIC logo + CICname */}
        <div className={`${classes.toolbar} ${props.toolbarStyle}`}>
            <div className={`profile-img`}>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
            </div>
            <div>
                <h4>
                  CICNET Admin
                </h4>
            </div>
        </div>
        {/* Navbar options display */}
        <List>
            {Object.entries(NavBarOptions).map((item) => (
                <NavLink 
                    activeClassName='active'
                    to={item[1].link}
                    isActive={() =>`${item[1].link}`.includes(pathname)}
                    key={item[0]}
                >
                    <ListItem 
                        classes={{ root: classes.root }}
                        button
                        key={item[0]}
                    >
                        <ListItemIcon className={classes.iconInactive}>
                            {item[1].icon}
                        </ListItemIcon>
                        <ListItemText primary={item[0]} />
                    </ListItem>
                </NavLink>
            ))}
        </List>
        <NavLink 
          activeClassName='active'
          to={'/'}
          isActive={() => false}
          key={"signout"}
          onClick={onSignOut}
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%"
          }}
        >
          <ListItem 
            classes={{ root: classes.root }}
            button
            key={"signout"}
          >
            <ListItemIcon className={classes.iconInactive}>
              <PowerSettingsNewIcon/>
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </NavLink>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={`navbar ${classes.drawer}`} aria-label="navbar">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            elevation={10}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* hid drawer when screen is mobile size, i.e. xsDown */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            PaperProps={{ elevation: 4 }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
  );
}


const mapDispatchToProps = {
  updateLoginState,
};

export default connect(null, mapDispatchToProps)(NavBar);
