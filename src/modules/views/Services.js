import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography} from '@material-ui/core';
import Mark from '../Mark'

const styles = (theme) => ({
  root: {
    overflow: 'hidden',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(4),
    backgroundColor: '#FFF',
    height: '100%',
    [theme.breakpoints.only("xs")]: {
      marginTop:'30px'
  },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 600,
    fontSize: '20px'
  },
  images: {
    marginTop: theme.spacing(5),
  },
  image: {
    width: '200px'
  },
});

function Services(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section" id= "service">
       
        <Mark 
            variant="h4" 
            marked="center" 
            align="center" 
            component="h2"
            style={{
                FontFamily: 'Mulish', 
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '26px'}}>Our Services
        </Mark>
        
        <div style={{padding: '15px'}} />
        <Grid  align="center">
            <Grid item xs={12} md={7}>
                <div 
                    className={classes.item} 
                    align="center" 
                    style={{
                        }}>
                            
                        <Typography>
                            Raising the funds, creating and implementing the right solutions 
                            - Completely free for the charities soliciting our services.
                        </Typography>
                        
                      
                        <Typography>
                            Any humanitarian organization can request to be part of the program.
                        </Typography>
                  
                </div>
            </Grid>
        </Grid>

        <Grid 
          container
          spacing={2}
          direction="row"
          justify="center"
          className={classes.images}>
            <Grid item xs={12} md={2} lg={2} align='center'>
              <img
                className={classes.image}
                src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fmanservice.png?alt=media&token=f419b0c5-d0ea-4bed-87b4-3d4fe9ad5120"
                alt="man_sitting" />
            </Grid>
            <Grid item xs={12} md={3} lg={2} align='center'>
              <img
                className={classes.image}
                src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fmoney.png?alt=media&token=3ae3122b-13a2-4c47-8a2f-9a26a299477f"
                alt="dollars"
              />
            </Grid>
            <Grid item xs={12} md={2} lg={2} align='center'>
              <img
                className={classes.image}
                src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fhelp.png?alt=media&token=409f0ba9-a86d-4727-8c35-aced5f569423"
                alt="help"
              />
            </Grid>
        </Grid>

  
    </Container>
  );
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Services);