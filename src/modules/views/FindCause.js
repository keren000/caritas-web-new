import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import {Grid, Button, Paper } from '@material-ui/core';
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    width: '100%',
    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fback.png?alt=media&token=80cb38da-3662-401e-bc15-cee43e51d85f)",
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
    [theme.breakpoints.only("sm")]: {
      overflow: "hidden",
    },
    [theme.breakpoints.only("md")]: {
      overflow: "hidden",
    },
    [theme.breakpoints.only("lg")]: {
      overflow: "hidden",
    },
  },
  container: {
    marginTop: '50px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  card:{
    textAlign:'center',
    display: 'flex',
    padding:'20px',
    backgroundColor: '#DCEAEB',
    borderRadius: '20px',
  
},
button: {
    marginTop: theme.spacing(2),
    fontSize: '15px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    width: '150px',
    borderRadius: '20px',
    backgroundColor: "#13B0BB",
    color: "#fff",
    "&:hover":{
      backgroundColor: "#13A4AE"
    },
  },

findcause: {
    width: '250px',
    [theme.breakpoints.down("xs")]: {
      display: 'none'
      },
      [theme.breakpoints.down("sm")]: {
        display: 'none'
        },
},
card_content: {
  marginLeft: '80px',
},
}));
function FindCause(justify) {
  const classes = useStyles();
  return(
  <div className={classes.root}>
    <Grid container spacing={1} className={classes.container}  justify='center'  style={{padding:'20px'}}>
        {/* <Grid container direction="column" spacing={2} className={classes.card_content}> */}
            <Grid item xs={12} sm={12} md={6} lg={5} >
            <Paper className={classes.card}>
                  <Grid container direction='column'>
                    <Grid item>
                        <Typography component="h5" variant="h5" style={{fontWeight: 'bold', textAlign:'left'}}>
                            Find the causes that matter to you.
                        </Typography><br />
                        <Typography style={{textAlign:'justify'}}>
                            Select projects you want to support through the Caritas Revolution App.
                            Full transparency for every donor down to the dollar. Caritas Revolution
                            oversees and manages every financial transaction and does guarantee a complete end to end report.
                        </Typography>
                    </Grid>
                    <Grid item align='left'>
                    <Button
                        variant="h6"
                        className={classes.button}
                        component={Link}
                        to="#"> {'Learn more'}
                    </Button>
                    </Grid>
                  </Grid>
            </Paper>
            </Grid>
            <Grid item>
            <Grid container justify='center'>
              <Grid item md={9}>
                <img src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fregister.png?alt=media&token=64d15989-7b0f-4b1d-9835-b4c560921a4c" alt="find cause" className={classes.findcause}/>
              </Grid>
            </Grid>
            </Grid>
      </Grid>
          <Grid item xs={3} md={3} >
         </Grid>
  </div>
  )};
export default FindCause;