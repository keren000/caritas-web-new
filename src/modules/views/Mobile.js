import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../styles/Causes.scss'
import Mark from '../Mark'

import {
    Card,
    CardContent,
    Typography,
    Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    mobile: {
        overflow: "hidden",
        [theme.breakpoints.only("md")]: {
          display: "none",
        },[theme.breakpoints.only("xl")]: {
          display: "none",
        },
        [theme.breakpoints.only("lg")]: {
            display: 'none'
          },
      },
    carousel:{
        marginTop: "70px", color: "#494949", width: "72%",
        [theme.breakpoints.only("sm")]: {
            width: "53%"
          },
          
    }
      
})



function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "center"
    const totalItems = props.length ? props.length : 3;
    let items = [];
    const content = (
        <Grid item xs={4 / totalItems}  lg={12 / totalItems} key="content">
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


    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container justify="center" spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Agriculture",
        Caption: " Give hand to protect the green.",
        contentPosition: "middle",
    },
    {
        Name: "Orphanage",
        Caption: "Give a chance to real childhood and developpement.",
        contentPosition: "middle",
    },
    {
        Name: "Facility",
        Caption: "Help improve basic needs.",
        contentPosition: "middle",
    }
]
class Mobile extends React.Component {
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
            <Grid container justify='center' alignItems='center' direction='column' className={classes.mobile} >
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
                <Grid item xs={12} className={classes.carousel}>
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

        )
    }
}
export default withStyles(styles)(Mobile);
