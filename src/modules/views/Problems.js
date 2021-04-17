import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography} from '@material-ui/core';
import Mark from '../Mark'

const styles = (theme) => ({ 
  images: {
    marginTop: theme.spacing(1),
    align: 'center',
    [theme.breakpoints.down("xs")]: {
      align: 'center', 
    }
  },
  
  content: {
    marginTop: '-40px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  p2: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  paper: {
    marginTop:'-80px',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  about: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  container:{
    overflow: "hidden",
    backgroundColor: '#FFF',
    marginTop: '40px',
    [theme.breakpoints.down("xs")]: {
      marginTop:'50px' 
    }
  },
  text:{
    [theme.breakpoints.down("xs")]: {
      textAlign:'justify'
    }
  }
 });

function Problems(props) {
  const { classes } = props;
  
  return (
  <Container component="section" className={classes.container}>
    <Grid item sm={12} align='center'>
      <Mark 
        variant="h4" 
        marked="center" 
        align="center" 
        component="h2"
        style={{
          FontFamily: 'Mulish', 
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '26px'}}>Is there a way to change this disheartening reality?
      </Mark>
    </Grid>
    <div style={{padding: '10px'}} />
    <Typography 
      align="center"
      style={{ 
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px'}}>Yes there is. To understand the solution let’s first acknowledge 
      what has gone wrong:
    </Typography>
    <Grid item align="center">
      <img alt=""
        src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fproblem1.png?alt=media&token=9b0d6160-642f-4d63-b2b6-fd3e2ac20e87" 
        width="200px"/>
    </Grid>
    <div style={{padding: '10px'}} />
    <Mark 
      variant="h4" 
      marked="center" 
      align="center" 
      component="h2"
      style={{
        FontFamily: 'Mulish', 
        fontStyle: 'normal',
        fontWeight: 700,
        marginTop:'50px',
        fontSize: '26px'}}>The Problems
    </Mark>
    <div style={{padding: '15px'}} />
    <Grid align="center">
      <Grid item xs={12} md={7}>
        <div 
          className={classes.item} 
          align="center" 
          style={{
            fontFamily: 'Mulish',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 600,
            fontSize: '20px'}}>
          <Typography className={classes.text}>People would like to donate, but,</Typography>
          <Typography className={classes.text}>
            Potential donors are unsure of how their money is spent due to lack of transparency on where the money is going (i.e. fraud)
          </Typography>
          <Typography className={classes.text}>he success of the cause they have supported (i.e. will the project be implemented as planned or will it fail due to lack of know how, 
             sociocultural factors etc.)
          </Typography>
          <Typography className={classes.text}>the charity’s procedures and their mission statement/goals</Typography>
          <Typography className={classes.text}> Traditional charities have large administrative costs and significant 
            staff employed in high cost locations which ultimately reduces the amount that reaches the cause
          </Typography>
          <Typography className={classes.text}>Economy in target countries do not benefit as much as they could due
              to a large part of the labor being performed by people not local to the country
          </Typography>
          <Typography className={classes.text}>
            On the other hand many (small) charities who are doing an amazing job don't get the support they need since they are unable 
            to reach enough donors from around the world.
          </Typography>
        </div>
      </Grid>
    </Grid>
<div style={{padding: '30px'}} />
<Mark 
variant="h4" 
marked="center" 
align="center" 
component="h2"
style={{
FontFamily: 'Mulish', 
fontStyle: 'normal',
fontWeight: 700,
fontSize: '26px'}}>How to fix these problems?
</Mark>

<div style={{padding: '15px'}} />
<Grid align="center">
<Grid item xs={12} md={7}>
<div 
className={classes.item} 
align="center" 
style={{
fontFamily: 'Mulish',
fontStyle: 'normal',
fontDisplay: 'swap',
fontWeight: 600,
fontSize: '20px'}}>
<Typography>
To turn the things around we need,
</Typography><br/>
<Typography className={classes.text}>
Complete transparency. Which means, the donors know down to the dollar 
where their money is going. The organization ensures that all financial 
reports (including employee salary) are publicly available. Each donor has 
a right to know where their money is being spent, Period!
A program that is successful in its mission using local experts to 
manage- and local workers to implement the project.
Help small charities who do not have the resources to promote their 
cause by implementing ingenious solutions based on the latest 
technology.
</Typography>
<Typography className={classes.text}>
Use cutting edge technology to lower administration costs (Transferwise, Stripe, Gravity Payments, virtual offices, automation etc.) which results in more effective use for every dollar donated.
</Typography>
</div>
</Grid>
</Grid>
<div
className={classes.images} 
align="center">
<img alt=""
src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Flight.png?alt=media&token=a3852c6b-6f22-4e4f-b465-58bc35d920cd" 
width="200px"/>
</div>

<div style={{padding: '70px'}} />
<Grid className={classes.paper}>
<Mark 
variant="h4" 
marked="center" 
align="center" 
component="h2"
style={{
FontFamily: 'Mulish', 
fontStyle: 'normal',
fontWeight: 700,
fontSize: '26px'}}>The Solution
</Mark>
<div style={{padding: '20px'}} />
<Grid align="center">
<Grid item xs={12} md={7}>
<div 
className={classes.item} 
align="center" 
style={{
fontFamily: 'Mulish',
fontStyle: 'normal',
fontDisplay: 'swap',
fontWeight: 600,
fontSize: '20px'}}>
<Typography>
A global platform for charities and donors
</Typography>

{/* <div style={{marginTop: '-100px'}} /> */}
<div 
className={classes.images}
align="center">
<img alt=""
src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2FLogo.png?alt=media&token=1a7fb6b6-a8be-427c-a78f-5c2eaafd0c03" 
width="300px"/>
</div>
<div className={classes.content}>
<Typography className={classes.p2}>
Any humanitarian organization can request to be part of the program.
</Typography>
<Typography className={classes.text}>
Full transparency for every donor down to the dollar. Caritas Revolution 
oversees and manages every financial transaction and does guarantee a complete 
end to end report. Which means we do not send money to be distributed by a third 
party. Every donation stays in our organization. WE pay the workers, WE buy the 
material. WE are accountable for every single dollar. 
</Typography>

<Typography className={classes.text}>
Every charity who requests our help must consent to an extensive background check 
to avoid fraud or misuse of the provided funds.
</Typography>

<Typography className={classes.text}>
Projects are implemented through local workers and managed by our local representatives.
</Typography>

<Typography className={classes.text}>
Donors can select projects they want to support trough the Caritas Revolution App:
</Typography>
</div>
</div>
</Grid>
</Grid>
</Grid>
<div style={{padding: '40px'}} />
<Grid className={classes.about}>
<Mark 
variant="h4" 
marked="center" 
align="center" 
component="h2"
style={{
marginTop:'-50px',
FontFamily: 'Mulish', 
fontStyle: 'normal',
fontWeight: 700,
fontSize: '26px'}}>About Us
</Mark>
<div style={{padding: '17px'}} />
<Grid align="center">
<Grid item xs={12} md={7}>
<div 
className={classes.item} 
align="center" 
style={{
fontFamily: 'Mulish',
fontStyle: 'normal',
fontDisplay: 'swap',
fontWeight: 600,
fontSize: '20px'}}>
<Typography>
We,
</Typography>
<div style={{padding: '20px'}} />
<Typography className={classes.text}>
Are an international team of experts from different cultures and backgrounds 
who have the same goal and passion: To support the many charities out there who 
truthfully are helping those in need daily
</Typography>

<Typography className={classes.text}>
Are committed to providing full financial transparency for every project we supervise 
as well as open books of our organization (salaries included)
</Typography><br/>

<Typography className={classes.text}>
Are not a “typical” charity as our focus is to support charities by supplying them 
with whatever they need to improve the work.
</Typography><br/>

<Typography className={classes.text}>
Are not simply a platform where charities present their needs. 
Caritas Revolution is much more than that: It’s an all-in-one solutions for 
charities who might not have the know-how, financial resources or capacity to get 
to the next level by their own strength.
</Typography><br/>

<Typography className={classes.text}>
Believe that once we have established and demonstrated the success of our program 
donors will most likely shift focus on charities who guaranty a full financial 
transparency and accomplishment of their defined goals. This will motivate other 
humanitarian organizations to follow the same path which ultimately will benefit 
the most important group of people in this process: the ones who so desperately
need the help.
</Typography>

<div style={{padding: '15px'}} />
<Typography 
variant="h4" 
align="center" 
component="h2"
style={{
FontFamily: 'Mulish', 
fontStyle: 'normal',
fontWeight: 700,
fontSize: '20px'}}>Tax deduction
</Typography><br/>
<Typography className={classes.text}>
We are a charitable organisation and exempt from federal income tax under Internal 
Revenue Code Section 501(c)(3). Bakers can therefore deduct their contribution as 
described under IRC Section 170.6. Tax-deductible Contributions
</Typography>
</div>
</Grid>
</Grid>
</Grid>

</Container>
);
}

Problems.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Problems);
