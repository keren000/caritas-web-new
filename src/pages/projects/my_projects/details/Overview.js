// import React from 'react'
// import ReactPlayer from 'react-player'
// import { makeStyles} from '@material-ui/core/styles'
// import {Grid} from '@material-ui/core'


// const useStyles = makeStyles((theme) => ({
//     player: {
//         marginTop: theme.spacing(2),
//         position: "relative",
//         paddingBottom: "30%",
//         [theme.breakpoints.only('xs')]: {
//           // width: "10%",
//           // height: "250px",
//           paddingBottom: "80%",
//           },
//           [theme.breakpoints.only('sm')]: {
//             // width:"875px",
//             // height:"400px"
//           },
//           [theme.breakpoints.only('lg')]: {
//             width:"45%",
//             height:"280px"
//           },
//     },
//     video:{
      
//     }
// }))

// export default function Overview({url, onProgress}) {
//     const classes = useStyles();
//     return (
//         <div className={classes.player}>
            // <ReactPlayer 
            //   className={classes.video}
            //   url={url}
            //   style={{align: 'center'}}
            //   // width="45%"
            //   // height="290px"
            //   controls={true}
            //   onProgress={onProgress} />
//         </div>
//     )
// }

import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

export default function Overview({url, onProgress}) {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <ReactPlayer
        className={classes.video}
        url={url}
        style={{align: 'center'}}
        controls={true}
        onProgress={onProgress} />
    </Grid>
  )
}