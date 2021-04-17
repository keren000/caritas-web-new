import React  from 'react'
import PropTypes from 'prop-types';

import { auth } from '../../Firebase/Firebase';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  app: {
      backgroundColor: '#FFF',
  },
  img: {
    [theme.breakpoints.only('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.only('xs')]: {
     display: 'none'
    },
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FAFAFA',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
    marginRight: theme.spacing(5),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0133C0'
  },
  inputRoot: {
    color: '#000',
  },
  inputInput: {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  account_icon: {
    marginLeft: theme.spacing(-3),
  },
});

function NavProfile(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
        <AppBar position="fixed" className={classes.app} elevation={0}>
            <Toolbar className={classes.toolbar}>
            <Link to="/home">
                    <img alt="logo" src="https://i.imgur.com/6HD18sL.png" width="100" className={classes.img}/>
                </Link>
                <div className={classes.right}>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }} inputProps={{ 'aria-label': 'search' }}/>
                    </div> */}
                    
                    <div className={classes.account_icon}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                             <AccountCircle style={{color: '#0133C0'}}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }} keepMounted 
                               transformOrigin={{
                                   vertical: 'top',
                                   horizontal: 'right',
                                }} open={open}
                                   onClose={handleClose}
                        >
                           <MenuItem onClick={handleClose} component={Link} to="/home">Home</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/projects">Projects</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                           </Menu>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        
    </div>
  )
}

NavProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavProfile);

