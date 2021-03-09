import {React, useContext} from 'react';
import {Grid, Container, Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Context} from "../index";
import firebase from "firebase";
import '../App.css';

const Login = () => {
  const {auth} = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
  }

  return (
    <Container>
      <Grid
        container style={{height: window.innerHeight - 50}}
        alignItems={"center"}
        justify={"center"}
      >
        <Grid
          style={{width:400, background: 'lightgray'}}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button onClick={login} variant="outlined">Login using Google</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;