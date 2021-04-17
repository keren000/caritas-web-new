import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers(props) {
  const classes = useStyles();
	const { contributedUser, amount} = props
	// const day = _date.getDay()
	// const month = _date.getMonth()
	// const year = `${_date.getFullYear()}`.substr(2)

  return (
    <List className={classes.root}>
    
      <ListItem key={props.index} >
        <ListItemAvatar>
        <Avatar alt="User" src={props.userIamge} className={classes.avatar}>
                  {props.contributedUser.charAt(0)}
              </Avatar>
        </ListItemAvatar>
        <ListItemText 
          primary={contributedUser} 
          // secondary= {"$"+amount} 
        />
      </ListItem>

    </List>
  );
}