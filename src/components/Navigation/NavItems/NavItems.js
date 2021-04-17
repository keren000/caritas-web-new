import { AppBar, Toolbar, Grid, CardMedia, Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import NavItem from './NavItem/NavItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Navbar from '../../../pages/Navbar'
import HeaderBar from '../../../modules/views/HeaderBar'

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  app: {
    backgroundColor: '#fff',
    [theme.breakpoints.down("xs")]: {
      backgroundColor: '#FFF',
      },
},

  logo: {
    flexGrow: 1,
    width:"170px",
    height:'180px'
  },
  img: {
    [theme.breakpoints.only("xs")]: {
      width:'130px', 
      },
      [theme.breakpoints.only("sm")]: {
        width:'150px', 
        },
  },
  projects:{
    color: "#0133C0",
		"&:hover":{
      color: "#214DC5",
    },
    fontSize: 16,
    textTransform: 'capitalize',
  },
  login:{
    color: "#0133C0",
		"&:hover":{
      color: "#214DC5",
		},
    fontSize: 16,
    textTransform: 'capitalize',
    marginLeft: theme.spacing(3),
    backgroundColor: 'none',
    [theme.breakpoints.down("xs")]: {
      fontSize: '15px',
      paddingRight:'40px'
      },
  },
  signup: {
    marginLeft: theme.spacing(2),
    fontSize: 16,
    textTransform: 'capitalize',
    variant: "contained",
    backgroundColor: "#0133C0",
		color: "#fff",
		"&:hover":{
			backgroundColor: "#214DC5"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '14px',
      overflow: "hidden",
      marginLeft: theme.spacing(3),
      },
  },
  nav:{
    display: 'flex',
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  moreIcon:{
    [theme.breakpoints.only('xs')]: {
      color:'gray'
    },
  }
}));

const NavItems = ({ mobile, clicked, loggedIn }) => {
  const classes = useStyles();
  let links;
  if (loggedIn.uid) {
    links = (
      // <AppBar className={classes.app} position="fixed" elevation={0} mobile={mobile}>
      //   <Toolbar style={{height:"40px"}}>
      //   <Grid container>
      //     <Link to="/home" >
      //       <CardMedia
      //       className={classes.logo} 
      //         alt="logo" 
      //         image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2FLogo.png?alt=media&token=e4aac397-5980-436e-81ff-929d4789e4c5"   
      //         />
      //     </Link>
      //     </Grid>
      //     <Grid container justify='flex-end' className={classes.nav}>
      //         <Grid item>
      //         </Grid>
      //         <Grid item>
      //             <Button to="/home" component={Link} className={classes.login}>Todos</Button>
      //         </Grid>
      //         <Grid item>
      //             <Button to="/profile" component={Link} className={classes.login}>Account</Button>
      //         </Grid>
      //         <Grid item>
      //             <Button to="/logout" component={Link} className={classes.login}>Logout</Button>
      //         </Grid>
      //       </Grid>
      //     </Toolbar>
      // </AppBar>
      <Navbar mobile={mobile}/>
      // <></>
    );
  } else {
    links = (
      // <AppBar className={classes.app} position="fixed" elevation={0} mobile={mobile}>
      //   <Toolbar style={{height:"40px"}}>
      //   <Grid container>
      //     <Link to="/" >
      //       <CardMedia
      //       className={classes.logo} 
      //         alt="logo" 
      //         image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2FLogo.png?alt=media&token=e4aac397-5980-436e-81ff-929d4789e4c5"   
      //         />
      //     </Link>
      //     </Grid>
      //     <Grid container justify='flex-end' className={classes.nav}>
      //         <Grid item>
      //         </Grid>
      //         <Grid item>
      //             <Button to="/login" component={Link} className={classes.login}>Login</Button>
      //         </Grid>
      //         <Grid item>
      //             <Button to="/signup" component={Link} className={classes.signup}>Signup</Button>
      //         </Grid>
      //       </Grid>
      //     </Toolbar>
      // </AppBar>
      <HeaderBar />
    );
  }
  return <Nav mobile={mobile}>{links}</Nav>;
};

export default NavItems;
