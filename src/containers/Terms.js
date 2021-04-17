// // import withRoot from './modules/withRoot';
// import React from 'react';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import Markdown from '../modules/styles/Markdown';
// import Typography from '../modules/styles/Typography';
// import HeaderBar from '../modules/views/HeaderBar'
// // import TermsConditions from '../modules/views/TC';
// import terms from '../modules/views/terms.md'
// import Footer from '../modules/views/Footer';

// function Terms() {
//   return (
    // <React.Fragment>
    //   <HeaderBar />
    //   <Container>
    //     <Box mt={7} mb={12}>
    //       <Typography variant="h3" gutterBottom marked="center" align="center">
    //         Terms
    //       </Typography>
    //       <Markdown>{terms}</Markdown>
    //     </Box>
    //   </Container>
    //   <Footer />
    // </React.Fragment>
//   );
// }

// export default Terms;



import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import mdDocument from '../modules/views/terms.md';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '../modules/styles/Typography';
import HeaderBar from '../modules/views/HeaderBar'
import Footer from '../modules/views/Footer';
import { Paper } from '@material-ui/core';

const Terms = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(mdDocument)
      .then(res => res.text())
      .then(md => { setContent(md) })
  })

  return (
    // <div><Markdown children={content} /></div>
    <React.Fragment>
      <HeaderBar />
      <Container>
        <Box mt={10} mb={12}>
          <Typography variant="h4" gutterBottom marked="center" align="center">
           CARITAS REVOLUTION TERMS OF USE
          </Typography>
          <div style={{padding: '20px'}} />
          <Container maxWidth="md">
          <Markdown style={{fontFamily: 'Verdana', textAlign: 'justify'}} textAlign="justify" children={content} />
          </Container>

        </Box>
      </Container>
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default Terms;