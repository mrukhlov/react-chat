import { React, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../index';
import '../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth)

  return (
    <div className={classes.root}>
      <AppBar position="static" color={"secondary"}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
            <Grid container justify={"flex-end"}>
                {user ?
                  <Button onClick={() => auth.signOut()} variant="outlined">Logout</Button> :
                  <NavLink to={LOGIN_ROUTE}>
                    <Button variant="outlined">Login</Button>
                  </NavLink>
                  }
            </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
