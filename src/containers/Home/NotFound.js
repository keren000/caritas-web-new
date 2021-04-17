import { Typography, Grid } from '@material-ui/core'
import React from 'react'

function NotFound() {
    return (
        <React.Fragment>
            <Grid container direction="column" justify="center" alignItem="center">
                    <Typography variant="h5">Aww...Don't Cry</Typography>
            <div style={{padding: '10px'}} />
            <Typography>It's just a 404 Error!</Typography>
            <div style={{padding: '15px'}} />
            <Typography>What you're looking for may have been misplaced in Long Term Memory</Typography>
            </Grid>
        </React.Fragment>
    )
}

export default NotFound
