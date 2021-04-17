import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../styles/Causes.scss'
import Mark from '../Mark'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@material-ui/core';

import Mobile from './Mobile'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        overflow: "hidden",
        backgroundColor: '#FFF',
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },[theme.breakpoints.only("sm")]: {
          display: "none",
        },
      },
      mobile: {
        overflow: "hidden",
        [theme.breakpoints.only("xl")]: {
          display: 'none'
        },
        [theme.breakpoints.only("lg")]: {
          display: 'none'
        },
        [theme.breakpoints.only("md")]: {
          display: 'none'
        },
      }
})


function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;
    let items = [];
    const content = (
        <Grid item xs={2 / totalItems} lg={12 / totalItems} md={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item lg={12/ totalItems} md={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Agriculture",
        Caption: "Give hand to protect the green",
        contentPosition: "left",
        Items: [
            {
                Name: "Agriculture",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fagri.png?alt=media&token=9f70eddc-213f-4b30-8e46-915c6fc70ff7"
            },
            {
                Name: "Agriculture",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fagric.jpg?alt=media&token=0224cf33-c9a2-4576-87aa-9f1463930b2e"
            }
        ]
    },
    {
        Name: "Orphanage",
        Caption: "Give a chance to real childhood and developpement.",
        contentPosition: "middle",
        Items: [
            {
                Name: "Orphanage",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Forp.jpg?alt=media&token=8597f3fd-6e17-4005-82a6-557ba3eb255f"
            },
            {
                Name: "Orphanage",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Forpha.png?alt=media&token=ca099a0e-dd4b-42f5-9f64-c0beef171ba8"
            }
        ]
    },
    {
        Name: "Facility",
        Caption: "Help improve basic needs.",
        contentPosition: "right",
        Items: [
            {
                Name: "Facility",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Ffaci.jpg?alt=media&token=a77b151b-d4b6-4fd9-b451-806e71e3b3cb"
            },
            {
                Name: "Facility",
                Image: "https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Ffacil.jpg?alt=media&token=9a43f581-c380-47cf-a4a6-50730b487b8e"
            }
        ]
    }
]
class Causes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false
        }

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible()
    {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    toggleNavButtonsAlwaysInvisible()
    {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Grid container justify='center' alignItems='center' direction='column'  className={classes.root}>
               <Grid item align='center'>
               <Mark
                    variant="h4" 
                    marked="center" 
                    component="h2"
                    style={{
                        FontFamily: 'Mulish', 
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '26px',
                        marginTop:'20px'
                        }}>Our Causes
                </Mark>
               </Grid>
                <Grid item lg={12} md={12} style={{marginTop: "70px", color: "#494949", width: "80%"}}>
                    <div>
                        <Carousel
                            className="Carousel"
                            autoPlay={this.state.autoPlay}
                            timer={this.state.timer}
                            animation={this.state.animation}
                            indicators={this.state.indicators}
                            timeout={this.state.timeout}
                            navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                            navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                        >
                            {
                                items.map((item, index) => {
                                    return <Banner item={item} key={index} contentPosition={item.contentPosition}/>
                                })
                            }
                        </Carousel>

                    </div>
                </Grid>
               
            </Grid>
            <div className={classes.mobile}>
                    <Mobile />
                </div>
            </div>

        )
    }
}
export default withStyles(styles)(Causes);