import React from 'react';
import Footerabout from '../views/Footerabout';
import Header from '../views/Header'
import Reality from '../views/Reality'
import Problems from '../views/Problems'
import Services from '../views/Services'
import Causes from '../views/Causes'
import Device from '../views/Device'
import Line from '../views/Line'


function About() {
  return (
    <div style={{backgroundColor: '#fff'}}>
      <Header />
      <Reality />
      {/* <br /> */}
      <Problems />
      <Services />
      <Causes />
      <Device />
      <Line /> 
      <Footerabout />
    </div>
  );
}

export default About