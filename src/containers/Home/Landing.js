import React from 'react';
import HeaderBar from '../../modules/views/HeaderBar'
import Footer from '../../modules/views/Footer';
import Header from '../../modules/views/Header'
import Reality from '../../modules/views/Reality'
import Problems from '../../modules/views/Problems'
import Services from '../../modules/views/Services'
import Causes from '../../modules/views/Causes'
import Device from '../../modules/views/Device'
import Line from '../../modules/views/Line'


function LandingPage() {
  return (
    <div style={{backgroundColor: '#fff'}}>
      <HeaderBar />
      <Header />
      <Reality />
      {/* <br /> */}
      <Problems />
      <Services />
      <Causes />
      <Device />
      <Line /> 
      <Footer />
    </div>
  );
}

export default LandingPage