import React, {useState} from 'react'
import { Grid, Typography, Button} from '@material-ui/core'
import Line from './Line'
import { auth, db, cloudFunctions } from '../../../../Firebase/Firebase';
import SimpleBackdrop from './SimpleBackdrop';
import {Redirect} from 'react-router-dom';


function DonationHead(props) {
    

    return (
        <React.Fragment>
            <Grid container justify="center" style={{padding: '30px 40px 10px 40px'}}>
                <Grid item>
                    <Typography component="h5" variant="h4">
                       { props.projectName }
                    </Typography>
            </Grid>
            </Grid>
            <div style={{padding: '10px'}} />
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <Typography>${props.donate_amount.toFixed(2)} of ${props.totalAmount} raised</Typography>
                </Grid>
               
                <div style={{padding: '20px'}} />
            </Grid>
        </React.Fragment>
    )
}

export default DonationHead
