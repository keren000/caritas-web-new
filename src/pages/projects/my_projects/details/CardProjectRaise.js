// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

// export default function CardProjectRaise(props) {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
        // <CardMedia
        //   component="img"
        //   alt="Project Raise"
        //   height="140"
        //   src={props.image_}
        //   title="Project Raise"
        // />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h5">
//             {props.country}. {props.cause} 
//           </Typography>
//           <Typography variant="h5" component="h5">
//             {props.name}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Link to={"/details?id="+props.project_data["project_id"]}>
    <Card className={classes.root} style={{ marginBottom: 12 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Project Raise"
          src={props.image_}
          title="Project Raise"
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.country}. {props.cause} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}
