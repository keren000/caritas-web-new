
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{ 
    overflow: 'hidden',
    [theme.breakpoints.only("xl")]: {
      marginTop:'-260px'
  },
  [theme.breakpoints.only("xs")]: {
    marginTop: '-200px',
  },
  [theme.breakpoints.only("sm")]: {
    marginTop: '-250px'
  },
  [theme.breakpoints.between("md","lg")]: {
    marginTop: '-70px'
  },
  },
  text:{
    textAlign:'center',
    margin:'5px',
    [theme.breakpoints.only("xs")]:{
      textAlign:'justify',
      padding:'20px',
    },
  }  
}));

export default function Reality() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={12} sm={10} md ={6} lg={7} xl={5} align='center'>
        <Typography className={classes.text}>
              It is a sad reality that many people would love to support charities,
              yet they are reluctant to do so because of the existence of large scale misuse of 
              donations and other scams. Unfortunately,  all at the expense of the ones who so 
              desperately need the help.
            </Typography>
            <Typography className={classes.text} >
              Even sadder still is that some charities are using their not- for-profit status for
              tax-loophole purposes; diverting every year billions of donated dollars  - again, all at 
              the expense of the ones who so desperately need the help.
            </Typography>
            <Typography className={classes.text} >
              The ones" are for example the children of refugees in Lebanon who need a new school building.
            </Typography>
        </Grid>
      </Grid>
    </div>
  );
}



