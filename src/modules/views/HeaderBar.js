// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
// import { Grid, CardMedia } from '@material-ui/core';

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     flexGrow: 1,
// //     overflow: 'hidden',
// //   },
// //   app: {
// //     backgroundColor: '#FFF',
// //     [theme.breakpoints.down("xs")]: {
// //       backgroundColor: '#FFF',
// //       },
// // },

// //   logo: {
// //     flexGrow: 1,
// //     width:"170px",
// //     height:'180px',

// //     // [theme.breakpoints.down("xs")]: {
// //     //   width:'30px', 
// //     //   height:"15px",
// //     //   },
// //   },
// //   img: {
// //     [theme.breakpoints.only("xs")]: {
// //       width:'130px', 
// //       },
// //       [theme.breakpoints.only("sm")]: {
// //         width:'150px', 
// //         },
// //   },
// //   projects:{
// //     color: "#0133C0",
// // 		"&:hover":{
// //       color: "#214DC5",
// //     },
// //     fontSize: 16,
// //     textTransform: 'capitalize',
// //   },
// //   login:{
// //     color: "#0133C0",
// // 		"&:hover":{
// //       color: "#214DC5",
// // 		},
// //     fontSize: 16,
// //     textTransform: 'capitalize',
// //     marginLeft: theme.spacing(3),
// //     backgroundColor: 'none',
// //     [theme.breakpoints.down("xs")]: {
// //       fontSize: '14px',
// //       },
// //   },
// //   signup: {
// //     marginLeft: theme.spacing(2),
// //     fontSize: 16,
// //     textTransform: 'capitalize',
// //     variant: "contained",
// //     backgroundColor: "#0133C0",
// // 		color: "#fff",
// // 		"&:hover":{
// // 			backgroundColor: "#214DC5"
// //     },
// //     [theme.breakpoints.down("xs")]: {
// //       fontSize: '14px',
// //       marginRight: theme.spacing(3),
// //       overflow: "hidden",
// //       },
// //   }
// // }));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     overflow: 'hidden',
//   },
//   app: {
//     backgroundColor: '#FFF',
//     [theme.breakpoints.down("xs")]: {
//       backgroundColor: '#FFF',
//       },
// },

//   logo: {
//     flexGrow: 1,
//     width:"170px",
//     height:'180px'

//     // [theme.breakpoints.down("xs")]: {
//     //   width:'30px', 
//     //   height:"15px",
//     //   },
//   },
//   img: {
//     [theme.breakpoints.only("xs")]: {
//       width:'130px', 
//       },
//       [theme.breakpoints.only("sm")]: {
//         width:'150px', 
//         },
//   },
//   projects:{
//     color: "#0133C0",
// 		"&:hover":{
//       color: "#214DC5",
//     },
//     fontSize: 16,
//     textTransform: 'capitalize',
//   },
//   login:{
//     color: "#0133C0",
// 		"&:hover":{
//       color: "#214DC5",
// 		},
//     fontSize: 16,
//     textTransform: 'capitalize',
//     marginLeft: theme.spacing(3),
//     backgroundColor: 'none',
//     [theme.breakpoints.down("xs")]: {
//       fontSize: '15px',
//       paddingRight:'40px'
//       },
//   },
//   signup: {
//     marginLeft: theme.spacing(2),
//     fontSize: 16,
//     textTransform: 'capitalize',
//     variant: "contained",
//     backgroundColor: "#0133C0",
// 		color: "#fff",
// 		"&:hover":{
// 			backgroundColor: "#214DC5"
//     },
//     [theme.breakpoints.down("xs")]: {
//       fontSize: '14px',
//       // marginRight: theme.spacing(3),
//       overflow: "hidden",
//       },
//   },
//   nav:{
//     display: 'flex',
//         [theme.breakpoints.down('xs')]: {
//           display: 'none',
//         },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   moreIcon:{
//     [theme.breakpoints.only('xs')]: {
//       color:'gray'
//     },
//   }
// }));

// export default function HeaderBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar  position="fixed" className={classes.app} elevation={0}>
//           <Toolbar style={{height:"40px"}}>
//           <Grid container>
//           <Link to="/" >
//             <CardMedia
//               className={classes.logo} 
//               alt="logo" 
//               image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2FLogo.png?alt=media&token=e4aac397-5980-436e-81ff-929d4789e4c5"   
//               />
//           </Link>
//           </Grid>
//             <Grid container justify='flex-end'>
//               <Grid item>
//               </Grid>
//               <Grid item>
//                   <Button to="/login" component={Link} className={classes.login}>Login</Button>
//               </Grid>
//               <Grid item>
//                   <Button to="/signup" component={Link} className={classes.signup}>Signup</Button>
//               </Grid>
//             </Grid>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Grid, CardActionArea, CardMedia } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MaterialLink from '@material-ui/core/Link';
import { Link, useLocation } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';


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

    // [theme.breakpoints.down("xs")]: {
    //   width:'30px', 
    //   height:"15px",
    //   },
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
      backgroundColor: 'none',
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
function NavBar(props) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false)
  const [formMode, setFormMode] = useState(true)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleClose = () => {
    setOpen(false)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Grid container direction='column' >
             
              <Grid item>
                  <Button to="/login" component={Link} className={classes.login}>Login</Button>
              </Grid>
              <Grid item>
                  <Button to="/signup" component={Link} className={classes.signup}>Signup</Button>
              </Grid>
            </Grid>
      </MenuItem>

    </Menu>
  );

  return (
    <>
    <AppBar  position="fixed" className={classes.app} elevation={0}>
          <Toolbar style={{height:"40px"}}>
          <Grid container>
          <Link to="/" >
            <CardMedia
              className={classes.logo} 
              alt="logo" 
              image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2FLogo.png?alt=media&token=e4aac397-5980-436e-81ff-929d4789e4c5"   
              />
          </Link>
          </Grid>
            <Grid container justify='flex-end' className={classes.nav}>
              <Grid item>
              </Grid>
              <Grid item>
                  <Button to="/login" component={Link} className={classes.login}>Login</Button>
              </Grid>
              <Grid item>
                  <Button to="/signup" component={Link} className={classes.signup}>Signup</Button>
              </Grid>
            </Grid>
            <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon className={classes.moreIcon}/>
                            </IconButton>
                       </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}
NavBar.propTypes = {
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};
export default NavBar;