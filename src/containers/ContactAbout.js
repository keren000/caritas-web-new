import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '../modules/styles/Typography';
import Footer from '../modules/views/Footer';
import ContactForm from './ContactForm'

function Contact() {
  return (
    <React.Fragment>
      <Container>
        <Box mt={10} mb={6}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact Us
          </Typography>
        </Box>
        <ContactForm />
      </Container>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Contact;