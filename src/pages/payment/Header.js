import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Grid
} from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    topAppBar: {
        Height: "20vh",
        minHeight: "150px"
    },
    toolbar: {
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
}));

const PaymentBars = ({ title, logoLink }) => {

    const classes = useStyles();

    return (
        <AppBar position="static" elevation={0} color="default" className={classes.topAppBar}>
            <Toolbar className={classes.toolbar}>
                {title !== undefined &&
                    <Grid container item direction="row" alignItems="center" xs={12} sm={6} justify="center">
                       
                        <Grid item>
                            <Typography className={classes.title} variant="h4" noWrap style={{color: '#2057C0'}}>
                                {title.toUpperCase()}
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </Toolbar>
        </AppBar>
    );
}

export default PaymentBars;
