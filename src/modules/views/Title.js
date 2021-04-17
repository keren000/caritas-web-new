import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid, Typography } from "@material-ui/core"
import Reality1 from './Reality';

const styles = (theme) => ({
root: {
  overflow: "hidden",
  backgroundColor: '#FFF',
  marginTop: theme.spacing(-50),
  [theme.breakpoints.down("xs")]: {
  display: "none",
  },
  [theme.breakpoints.down("sm")]: {
  display: "none",
  },
  [theme.breakpoints.only("xl")]: {
  marginLeft:'200px'
  },
},
caritas: {
  color: '#2057c0',
  fontWeight: 'bold',
  fontSize: '50px',
  textAlign:'center',
  },
  revolution: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '50px',
    textAlign:'center',
    },
  content: {
    textAlign:'left',
    fontFamily: 'Mulish',
    fontStyle: 'italic',
    fontDisplay: 'swap',
    fontWeight: 400,
    fontSize: '20px',
    marginTop:'-15px',
  },
  mobile: {
    padding: theme.spacing(1, 0, 6),
    overflow: "hidden",
    backgroundColor: "#FFF",
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
  text:{
    fontFamily: 'Mulish',
    fontStyle: 'italic',
    fontDisplay: 'swap',
    fontWeight: 400,
    fontSize: '20px',
    marginTop:'-15px',
    [theme.breakpoints.only("xs")]: {
    marginTop:'10px'
    },
  },
  size: {
    [theme.breakpoints.only("sm")]:{
      fontSize: '50px'
    },
    [theme.breakpoints.only("xs")]:{
      fontSize: '30px',
    },
  },
  reality: {
    [theme.breakpoints.only("lg")]:{
      display: 'none'
    },
  }
});
function Title(props) {
  const { classes } = props;
  return (
  <React.Fragment>
    <Grid
    container 
    spacing={1}
    justify="center" 
    alignItems="center"
    className={classes.root}>
      <Grid item align="center">
        <Typography className={classes.caritas} >
          Caritas
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.revolution}>Revolution</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.content}>
          Small sparks of help will inevitably <br />ingnite a global flame of hope
        </Typography>
      </Grid>
    </Grid>
    <div className={classes.mobile}>
      <CssBaseline />
      <main>
        <Container maxWidth="sm">
          <Grid 
            container 
            spacing={1}
            justify="center" 
            alignItems="center"
          >
            <Grid item align="center">
              <Typography  className={classes.size}
                style={{ 
                  color: '#2057c0',
                  fontWeight: 'bold',
                  // fontSize: '30px',
                  textAlign:'center'}}>Caritas</Typography>
            </Grid>
          <Grid item >
            <Typography  className={classes.size}
               style={{
                 color: '#000',
                fontWeight: 'bold',
                // fontSize: '30px',
                textAlign:'center'}}>Revolution</Typography>
                
          </Grid>
        </Grid>
       <Typography 
          align="center" 
          paragraph 
          className={classes.text}
          >
            Small sparks of help will inevitably <br />ingnite a global flame of hope
       </Typography>
       </Container>
      </main>
      {/* <Reality1/> */}
    </div>
    
  </React.Fragment>
  )
}

Title.propTypes = {
classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Title);