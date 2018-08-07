import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle";

function Footer({ ...props }) {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        {props.routes.map((item, index) => {
                            if (item.redirect || item.hide) return null;
                            return (
                                <ListItem className={classes.inlineBlock} key={index}>
                                    <Link to={item.path} className={classes.block}>
                                        {item.sidebarName}
                                    </Link>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
              <a href="https://www.creative-tim.com" className={classes.a}>
              Sergey Prikhodko
            </a>, made with love for a better web
          </span>
                </p>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);