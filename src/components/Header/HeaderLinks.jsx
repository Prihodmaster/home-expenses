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
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import MenuItem from "@material-ui/core/MenuItem";
import {signOut} from "../../actions/UserActions";
import {connect} from 'react-redux';

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
    logOut = () => {
        this.setState({ open: false });
        this.props.signOut();
    };
    render() {
        console.log(this.props)
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <span>{(this.props.user.user) ? this.props.user.user.email : null}</span>
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
                            {
                                !localStorage.getItem('token') ? <Person className={classes.icons} />:<AccountCircle className={classes.icons} />
                            }
                            <Hidden mdUp>
                                <p onClick={this.handleClick} className={classes.linkText}>Sign out</p>
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
                                            <MenuItem onClick={this.logOut} className={classes.dropdownItem}>Sign Out</MenuItem>
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

const mapStateToProps = state => ({
    user: state.userData
});
const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));