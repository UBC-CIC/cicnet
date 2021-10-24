// react components
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from "react-router-dom";


// UI imports
import { AppBar as TitleBar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// icons
import MenuIcon from '@material-ui/icons/Menu';

// internal
import NavBar from './NavBar';
import Challenges from "../Challenges";
import ChallengeDetails from "../Challenges/ChallengeDetails";
import News from '../News';
import NewUpdate from '../Update';
import NewChallenge from '../Challenges/NewChallenge';
import Roles from '../UserProfile/Admin/roles';


// constants
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  // adds a minimum height to an element
  toolbar: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: 80
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// https://material-ui.com/components/drawers/#responsive-drawer
function PageContainer(props) {
  const classes = useStyles();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currPageTitle, setCurrPageTitle] = useState("All Challenges");

  useEffect(() => {
    console.log('Location changed', location);
    setCurrPageTitle(document.title)
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar position="absolute" className={classes.appBar} elevation={0} color="inherit">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap>
                {currPageTitle}
          </Typography>
        </Toolbar>
      </TitleBar>

      <NavBar 
        toolbarStyle={classes.toolbar} 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route exact path={"/challenges"} render={props => <Challenges title="All Challenges" {...props}/>}/>
            <Route exact path={"/challenges/create"} render={props => <NewChallenge title="Create New Challenge" {...props}/>} />
            <Route path={"/challenges/:challengeName"} render={props => <ChallengeDetails {...props}/>}/>
            <Route exact path={"/news"} render={props => <News title="News/Events" {...props}/>}/>
            <Route exact path={"/update"} render={props => <NewUpdate title="Update on Challenge" {...props}/>} />
            <Route exact path={"/roles"} render={props => <Roles title="Roles" {...props}/>} />
            <Redirect from="/" to="/challenges" />
        </Switch>
      </main>
    </div>
  );
}

export default PageContainer;
