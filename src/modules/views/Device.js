import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Container, Grid, Typography, Paper} from '@material-ui/core';
import Mark from '../Mark'
import {Link} from 'react-router-dom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import apple from '../../images/apple.png'
// import google from '../../images/google.png'
import MobileStoreButton from 'react-mobile-store-button';

const styles = (theme) => ({
  root: {
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
  height: '690px',
  width:'100%',
  overflow: "hidden",
  backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fdownload2.png?alt=media&token=7547b4ff-47fa-45ea-8060-9087cad66730)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize:"cover",
  [theme.breakpoints.only("xl")]: {
    overflow: "hidden",
  },
  [theme.breakpoints.only("lg")]: {
    overflow: "hidden",
  },[theme.breakpoints.down("xs")]: {
    display: "none",
  },[theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.only("md")]: {
    height: '600px',
  width:'100%',
  },
}, 
image: {
  width: '200px',
},
card:{
  display: 'flex',
  backgroundColor: '#E7F6F7',
  borderRadius: '25px'
},
button: {
  marginTop: theme.spacing(-1),
  marginLeft: theme.spacing(2),
  fontSize: '15px',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  width: '200px',
  borderRadius: '20px',
  backgroundColor: "#13B0BB",
  color: "#fff",
  "&:hover":{
    backgroundColor: "#13A4AE"
  },
},
appstore: {
  width: '150px'
},
appgoogle: {
  width: '150px'
},
mobile:{
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
  width:'100%',
  overflow: "hidden",
  [theme.breakpoints.only("xl")]: {
    display: 'none'
},
[theme.breakpoints.only("lg")]: {
  display: 'none'
},
[theme.breakpoints.only("md")]: {
  display: 'none'
 },
},
mobilecard: {
  backgroundColor: '#E7F6F7',
  borderRadius: '25px'
},
mobilebutton: {
  fontSize: '15px',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  width: '195px',
  borderRadius: '20px',
  backgroundColor: "#13B0BB",
  color: "#fff",
  "&:hover":{
    backgroundColor: "#13A4AE"
 },
},
mobileapple: {
  width: '120px'
},
mobilegoogle: {
  width: '120px'
},
login:{
  fontSize: 16,
  textTransform: 'capitalize',
  variant: "contained",
  backgroundColor: "#fff",
  color: "#214DC5",
  "&:hover":{
    backgroundColor: "#214DC5",
    color: "#fff",
  },
},
signup: {
  fontSize: 16,
  textTransform: 'capitalize',
  variant: "contained",
  backgroundColor: "#0133C0",
  color: "#fff",
  "&:hover":{
    backgroundColor: "#214DC5"
  },
 }
});

function Device(props) {
  const { classes } = props;
  const iOSUrl = 'https://apps.apple.com/us/app/caritas-revolution/id1484835135';
  const androidUrl = 'https://play.google.com/store/apps/details?id=com.caritasrerum.caritasrevolution';
  
  return (
  <div>
    <Container className={classes.root} component="section">
      <Mark
        variant="h4" 
        marked="center" 
        align="center" 
        component="h2"
        style={{
        FontFamily: 'Mulish', 
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '26px'}}>Our App
      </Mark>
      <div style={{padding: '40px'}} />
      <Grid 
        container 
        style={{
          marginLeft:'300px', 
          marginTop:'350px'}} 
        justify="center">
        <Grid   
          item 
          style={{
            marginTop:'10px'}}>
              <MobileStoreButton
                store="ios"
                width= {180}
                url={iOSUrl}
                linkProps={{ title: 'iOS Store Button' }}
              />
        </Grid>
        <Grid item >
          <MobileStoreButton
            width= {200}
            store="android"
            url={androidUrl}
            linkProps={{ title: 'Android Store Button' }}
          />
        </Grid>
      </Grid>
    </Container>
    <div className={classes.mobile}>
      <Mark
        variant="h4" 
        marked="center" 
        align="center" 
        component="h2"
        style={{
        FontFamily: 'Mulish', 
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '26px'}}>Our App
      </Mark>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        style={{marginTop:'30px'}}
      >
        <Grid item xs={9} sm={9}>
          <Paper elevation={1}>
            <Typography 
              style={{
                fontWeight: 'bold', 
                fontSize: '20px'}}>Download our App
            </Typography>
            <div style={{padding: '20px'}}/>
            <Grid container justify="center">
              <Grid item style={{marginTop:'10px'}}>
                <MobileStoreButton
                  store="ios"
                  width= {160}
                  url={iOSUrl}
                  linkProps={{ title: 'iOS Store Button' }}
                />
              </Grid>
              <Grid item >
                <MobileStoreButton
                  width= {180}
                  store="android"
                  url={androidUrl}
                  linkProps={{ title: 'Android Store Button' }}
                />
              </Grid>
            </Grid>
            <div style={{padding: '5px'}} />
            <Typography 
              component="h5" 
              variant="h5" 
              style={{
                fontWeight: 'bold', 
                textAlign: 'center'}}>
                  Or
            </Typography>
            <div style={{padding: '5px'}} />
            <Grid 
              container 
              spacing={1}
              align="right"
              justify="center">
                <Grid item>
                  <Button 
                    component={Link} 
                    to="/login" 
                    className={classes.login}>
                      Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    component={Link} 
                    to="/signup" 
                    className={classes.signup}>
                      Signup
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{padding: '5px'}} />
      </div>
    </div>
  );
}


export default withStyles(styles)(Device);
