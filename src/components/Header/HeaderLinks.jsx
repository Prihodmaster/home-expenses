import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import MenuItem from "@material-ui/core/MenuItem";


class HeaderLinks extends React.Component {
    state = {
        open: false
    };
    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <span>Email</span>
                <Manager className={classes.manager}>
                    <Target>
                        <Button
                            color={window.innerWidth > 959 ? "transparent" : "white"}
                            justIcon={window.innerWidth > 959}
                            simple={!(window.innerWidth > 959)}
                            aria-label="Notifications"
                            aria-owns={open ? "menu-list" : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            className={classes.buttonLink}
                        >
                            <Person className={classes.icons} />
                            <Hidden mdUp>
                                <p onClick={this.handleClick} className={classes.linkText}>
                                    Notification
                                </p>
                            </Hidden>
                        </Button>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={open}
                        className={
                            classNames({ [classes.popperClose]: !open }) +
                            " " +
                            classes.pooperResponsive
                        }
                    >
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow
                                in={open}
                                id="menu-list"
                                style={{ transformOrigin: "0 0 0" }}
                            >
                                <Paper className={classes.dropdown}>
                                    <MenuList role="menu">
                                        <Link to='/signin'>
                                            <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Sign In</MenuItem>
                                        </Link>
                                        <Link to='/signup'>
                                            <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Sign Up</MenuItem>
                                        </Link>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>

            </div>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);