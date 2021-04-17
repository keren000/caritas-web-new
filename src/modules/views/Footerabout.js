/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../styles/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                // target="_blank"
              >
              Caritas Revolution
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/contact"
                className={classes.block}
                // target="_blank"
              >
                Contact us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/termconditions"
                className={classes.block}
              >
                Terms & Conditions
              </a>
            </ListItem>
            
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite color="primary" className={classes.icon} /> by{" "}
          <a
            href="/"
            className={aClasses}
            // target="_blank"
          >
            Caritas Revolution
          </a>{" "}.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};