import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    display: 'flex',
    // overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 4),
    },
  },
});

function FormStyles(props) {
  const { children, classes } = props;

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Box mt={7} mb={12}>
          <Paper className={classes.paper} elevation={0}>{children}</Paper>
        </Box>
      </Container>
    </div>
  );
}

FormStyles.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormStyles);
