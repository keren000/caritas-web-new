import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {Grid,List, Menu, CardMedia} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import {Link} from 'react-router-dom'
import ProfileImage from './ProfileImage'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

// Material UI icons
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import MenuItem from "@material-ui/core/MenuItem"
import MoreIcon from "@material-ui/icons/MoreVert"
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

// Firebase Integration
import { auth } from "../../Firebase/Firebase"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
	overflow: 'hidden',
	backgroundPosition: "center",
	backgroundSize: "cover",
	left: 0,
		alignContent: "center",
		justify: "center",
		background: "#FFF",
		width: "100%",
		minHeight: "100vh",
		paddingBottom: "10px",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
		[theme.breakpoints.only("xl")]: {
			backgroundPosition: "center",
			position: "absolute",
			backgroundSize: "cover",
			left: 0,
		},
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
	background: "white",
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
	background: "lightgray",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
	overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
  },
  title: {
	width: "50%",
	marginTop: "20px",
	padding: "10px",
	[theme.breakpoints.down("sm")]: {
		width: "406px",
	},
},
icon: {
	color: "#0133C0",
	[theme.breakpoints.down("sm")]: {
		minWidth: 32,
		paddingLeft: 8,
		fontSize: "smaller !important",
		paddingRight: 8,
		"& .MuiButton-startIcon": {
			margin: 0,
		},
	},
	[theme.breakpoints.only("md")]: {
		minWidth: 50,
		paddingLeft: 10,
		fontSize: "smaller !important",
		paddingRight: 10,
		"& .MuiButton-startIcon": {
			margin: 0,
		},
	},
},
sectionDesktop: {
	display: "none",
	[theme.breakpoints.up("md")]: {
		display: "flex",
	},
},
input: {
	display: 'none'
},

sectionMobile: {
	display: "flex",
	[theme.breakpoints.up("md")]: {
		display: "none",
	},
},
contactpicture: {
	width: '175px',
	height: '175px',
	border: '1px solid #000',
	margin: '15px auto',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'

}
}));

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

    const user = auth().currentUser
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget)
	}
	const menuId = "primary-search-account-menu"
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose} component={Link} to="/home">
				Home
			</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/projects">
				Projects
			</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/my-projects">
				My Projects
			</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/my-causes">
				My Causes
			</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/about">
				About
			</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/logout">
				Logout
			</MenuItem>
		</Menu>
	)
	const mobileMenuId = "primary-search-account-menu-mobile"
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<MenuOpenIcon className={classes.icon} />
				</IconButton>
				<p>Menu</p>
			</MenuItem>
			
		</Menu>
	)
	const [setOpen] = React.useState(false)
	const [placement, setPlacement] = React.useState()
	const handleClick = (newPlacement) => (event) => {
		setAnchorEl(event.currentTarget)
		setOpen((prev) => placement !== newPlacement || !prev)
		setPlacement(newPlacement)
	}
	const handleDrawerClose = () => {
		setOpen(false)
	}

	// const [mobileOpen, setMobileOpen] = React.useState(false)
	// const handleDrawerToggle = () => {
	// 	setMobileOpen(!mobileOpen)
	// }


  const drawer = (
	<div>
		<div className={classes.toolbar} />
		
		<List style={{ marginLeft: "20px" }}>
			<Grid
				container
				alignItems="center"
				justify="center"
				direction="column"
				spacing={2}
				style={{ marginTop: "30px" }}
			> 
			<Grid item>
				
				<ProfileImage />

			</Grid>

				<Grid item style={{ marginTop: "-5px", justifyContent: "center" }}>
					<Typography style={{ fontSize: "18px" }}>
						{user.user_name}
					</Typography>
					<Typography style={{ fontSize: "15px" }}>{user.email}</Typography>
				</Grid>
			</Grid>

			<div style={{ padding: "20px" }} />

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<HomeIcon style={{ color: "#0133C0" }} />
					</Grid>
					
					<Grid item xs={9}>
						<Link
							to="/home"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							Home
						</Link>
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<PlaylistAddCheckIcon style={{ color: "#0133C0" }} />
					</Grid>
					
					<Grid item xs={9}>
						<Link
							to="/my-projects"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							My Projects
						</Link>
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<LibraryAddCheckIcon style={{ color: "#0133C0" }} />
					</Grid>
					<Grid item xs={9}>
						<Link
							to="/my-causes"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							My Causes
						</Link>
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<AccountBalanceWalletIcon style={{ color: "#0133C0" }} />
					</Grid>
					<Grid item>
						<Link
							to="/transactions"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							Transactions
						</Link>
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<AccountBoxIcon style={{ color: "#0133C0", fontSize: "30px" }} />
					</Grid>
					<Grid item xs={5}>
						<Link
							to="/my-profile"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							My Profile
						</Link>
					</Grid>
					
				</Grid>
			</Grid>
			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<InfoIcon style={{ color: "#0133C0", fontSize: "30px" }} />
					</Grid>
					<Grid item xs={5}>
						<Link
							to="/about"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							About Us
						</Link>
					</Grid>
					
				</Grid>
			</Grid>

			<Grid item>
				<Grid container spacing={1} style={{ marginTop: "10px" }}>
					<Grid item>
						<ExitToAppIcon style={{ color: "#0133C0", fontSize: "30px" }} />
					</Grid>
					<Grid item xs={5}>
						<Link
							to="/logout"
							style={{
								textDecoration: "none",
								color: "#0133C0",
								fontSize: "16px",
							}}
						>
							Logout
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</List>
		<Divider />
	</div>
)

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon className={classes.icon} />
					</IconButton>

					<div className={classes.grow} />
					
					<Grid container justify="flex-end">
						<Grid>
							<div className={classes.sectionDesktop}>

								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="#000"
								>
									<MenuOpenIcon className={classes.icon} />
								</IconButton>
							</div>

							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon className={classes.icon} />
								</IconButton>
							</div>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			{renderMobileMenu}
			{renderMenu}
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>

				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
						<div style={{ paddingLeft: "20px" }} />
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid item xs={12}>
					{props.children}
				</Grid>
			</main>
    </div>
  );
}

Sidebar.propTypes = {
 
  window: PropTypes.func,
};

export default Sidebar;
