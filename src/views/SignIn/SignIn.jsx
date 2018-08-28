import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {signIn} from '../../actions/UserActions';

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    CardFooter: {
        display: "inline-block",
        color: "#9c28b0",
        padding: "0.9375rem 20px"
    },
    userMessage: {
        color: "#e20d0d",
        marginTop: "-24px"
    }
};
class SignIn extends Component {
    componentDidMount = () => {
        if(localStorage.getItem('token'))  this.props.history.push('/dashboard')
    };
    componentWillReceiveProps = nextProps => {
        this.setState({
            message: nextProps.user.message
        })
    }
    state = {
        email: '',
        password: '',
        message: ''
    };
    signInValue = () => {
        const { email, password } = this.state;
        let validate = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.+[a-zA-Z]{2,5}$/;
        if(validate.test(email)){
            if(password!==""){
                let newUser = {
                    email: email,
                    password: password
                };
                this.props.signIn(newUser)
            }else this.setState({message: 'Enter password'})
        }else this.setState({message: 'Incorrect email'})
    };
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
    clear = () => {
        this.setState({
            message: ''
        })
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Sign into Home Expense App</h4>
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
                            </CardBody>
                            <CardFooter className={classes.CardFooter}>
                                {
                                    this.state.message!=='' ?
                                        <div className={classes.userMessage}>
                                            {this.state.message}
                                        </div>
                                        : null
                                }
                                <Button color="primary" onClick={this.signInValue}>SIGN IN</Button>
                                <div>
                                    <p>fast time user? <Link to='/signup'>sign-up</Link></p>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData
});
const mapDispatchToProps = dispatch => ({
    signIn: (newUser) => dispatch(signIn(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
