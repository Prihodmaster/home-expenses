import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {signUp} from "../../actions/UserActions";
import TextField from '@material-ui/core/TextField';

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    CardFooter: {
        display: "inline-block",
        color: "#9c28b0"
    }
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValueEmail: '',
            inputValuePassword: '',
            inputValueRepeatPassword: '',
        };
    }

// validate = (form_id,email) => {
//     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//     let address = document.forms[form_id].elements[email].value;
//     if(reg.test(address) == false) {
//         alert('Введите корректный e-mail');
//         return false;
//     }
    getValueEmail = (e) => {
        this.setState({inputValueEmail: e.target.value});
    }
    getValuePassword = (e) => {
        this.setState({inputValuePassword: e.target.value});
    }
    getValueRepeatPassword = (e) => {
        this.setState({inputValueRepeatPassword: e.target.value});
    }
    signUp = () => {
        // this.state.inputValuePassword === this.state.inputValueRepeatPassword ? console.log(this.props, this.state): alert("Passwords do not match");
        // let newUser = {
        //     "displayName": "Slava",
        //     "email": "slava@mail.ru",
        //     "password": "111111"
        // }
        let newUser = {
            "email": "slava@google.ru",
            "password": "111111"
        }
        this.props.signUp(newUser)
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Register with Home Expense App</h4>
                                <p className={classes.cardCategoryWhite}>Please, enter your email and password</p>
                            </CardHeader>
                            <CardBody>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            id="email-address"
                                            label="Email address"
                                            type="text"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.inputValueEmail}
                                            onChange={this.getValueEmail}
                                        />
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.inputValuePassword}
                                            onChange={this.getValuePassword}
                                        />
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            id="repeat-password"
                                            label="Repeat password"
                                            type="password"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.inputValueRepeatPassword}
                                            onChange={this.getValueRepeatPassword}
                                        />
                                    </GridItem>
                                </Grid>
                            </CardBody>
                            <CardFooter className={classes.CardFooter}>
                                <Button color="primary" onClick={this.signUp}>SIGN UP</Button>
                                <div>
                                    <p>fast time user? <Link to='/signin'>sign-in</Link></p>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userData
});
const mapDispatchToProps = dispatch => ({
    signUp: (newUser) => dispatch(signUp(newUser))
});
SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
