import React from "react";
import { AppBar, Toolbar, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom'

const Footer = () => {

    return <>
       
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link style={{color: '#0133C0', textDecoration: 'none'}} to="/home">
                    Caritas Revolution
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
               
            </Toolbar>
        </AppBar>
    </>
}


export default Footer;