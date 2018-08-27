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
        color: "#9c28b0",
        padding: "0.9375rem 20px"
    } ,
    userMessage: {
        color: "#e20d0d",
        marginTop: "-24px"
    }
};
class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        rePassword: '',
        message: ''
    };
    componentDidMount = () => {
        if(localStorage.getItem('token'))  this.props.history.push('/dashboard')
    };
    componentWillReceiveProps = nextProps => {
        this.setState({
            message: nextProps.user.message
        })
    }
    getValueEmail = e => {
        this.setState({
            email: e.target.value
        })
    };
    getValuePassword = e => {
        this.setState({
            password: e.target.value
        })
    };
    getValueRepeatPassword = e => {
        this.setState({
            rePassword: e.target.value
        })
    };
    clear = () => {
        this.setState({
            message: ''
        })
    };
    signUp = () => {
        const { email, password, rePassword } = this.state;
        let validate = /^[a-zA-z0-9_.]{1,30}@{1,}[a-z]{3,10}\.{1}[a-z]{2,9}(.[a-z]{2,3}|)$/gm;
        if(validate.test(email)){
            if(password === rePassword){
                if(password!=="" || rePassword!==""){
                    let newUser = {
                        email: email,
                        password: password,
                        verified: false
                    };
                    this.props.signUp(newUser)
                    this.setState({
                        email: '',
                        password: '',
                        rePassword: ''
                    })
                }else this.setState({message: 'Enter password'})
            }else this.setState({message: 'Passwords do not match'})
        }else this.setState({message: 'Incorrect email'})
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
                                    <GridItem xs={12} sm={6} md={6}>
                                        <TextField
                                            id="email-address"
                                            label="Email address"
                                            type="text"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.email}
                                            onChange={this.getValueEmail}
                                            onClick={this.clear}
                                        />
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.password}
                                            onChange={this.getValuePassword}
                                            onClick={this.clear}
                                        />
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <TextField
                                            id="repeat-password"
                                            label="Repeat password"
                                            type="password"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value={this.state.rePassword}
                                            onChange={this.getValueRepeatPassword}
                                            onClick={this.clear}
                                        />
                                    </GridItem>
                                </Grid>
                            </CardBody>
                            <CardFooter className={classes.CardFooter}>
                                {
                                    this.state.message!=='' ?
                                        <div className={classes.userMessage}>
                                            {this.state.message}
                                        </div>
                                        : null
                                }
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
