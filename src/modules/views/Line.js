import React from 'react'
import { Divider, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    line: {
        backgroundColor: '#2057c0',
        marginTop: theme.spacing(-3),
        [theme.breakpoints.down("sm")]: {
            display:'none'
            },
      
    },
})
)

function Line() {
    const classes = useStyles();
    return(
        <Grid
            container
            alignItems="center"
            justify="center"
            >
          <Grid item lg = {11}><Divider className={classes.line}/></Grid>
    </Grid>
    )

}

export default Line;