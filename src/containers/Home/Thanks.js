import React, {useState} from 'react'
import {Button, Box, Container,  Grid, Typography, withStyles, Paper, Slider } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share';
import { useHistory } from "react-router-dom";
import ShareDialog from '../../pages/projects/my_projects/details/ShareDialog'

const styles = (theme) => ({
    root: {
      display: 'flex',
      overflow: "hidden",
    },
    paper: {
      padding: theme.spacing(4, 3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6, 4),
      },
    },
  });

  const PrettoSlider = withStyles({
    root: {
      color: '#ff0000',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid ',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
  
function Thanks(props) {
    const { classes } = props;
    const urlBase = 'https://caritasrevolution.com';

	 const handleAdd = () => {
		setOpen(true);
		setFormMode(true);
	  };
	  const handleDone = () => {
		setOpen(false)
	  }
	  const [ope, setOpen] = useState(false)
	  const [formMode, setFormMode] = useState(true)
    let history = useHistory();

    return (
            <div className={classes.root}>
                <Container maxWidth="sm">
                    <Box mt={7} mb={12}>
                        <Paper className={classes.paper}>
                            <Grid container justify="flex-end">
                                <Button 
                                    style={{
                                        backgroundColor: '#2057C0', 
                                        color: '#fff', 
                                        textDecoration: 'none',
                                        width: '100px',
                                        textTransform: "capitalize",
                                        fontSize: '18px'}}
                                        onClick={()=> history.push("/home")}
                                        >
                                        Done
                                        </Button>
                            </Grid>
                            <div style={{padding: '25px'}} />
                            <Grid container>
                                <Typography  variant="h4" component="h5">Thank you for your donation on project {props.location.state.project_description}!</Typography>
                                <br /><br /><br />
                                {/* <Typography>{props.location.state.project_description}</Typography> */}
                            </Grid>
                            <PrettoSlider disabled defaultValue={((props.location.state.total_amount_donated/props.location.state.total_fund_needed)*100)} aria-labelledby="disabled-slider" />

                            <br /><br />
                                <Typography style={{fontWeight: 'bold'}}>Share this cause with others</Typography>
                                <Button><ShareIcon onClick={handleAdd} style={{color: '#2057C0'}}/></Button>
                            <br /><br />
                            <Typography style={{fontWeight: 'bold'}}>Other recommended projects:</Typography>
                        </Paper>
                    </Box>
                </Container>
                <ShareDialog
                  open={ope}
                  close={handleDone}
                  formMode={formMode}
			            URL={urlBase+'details?id='+props.location.state?.project_id}
             />
            </div>
       
    )
}

export default withStyles(styles)(Thanks);