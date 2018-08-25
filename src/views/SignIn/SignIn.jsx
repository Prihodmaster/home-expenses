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
    }
};
class SignIn extends Component {
    componentDidMount = () => {
        if(localStorage.getItem('token'))  this.props.history.push('/dashboard')
    };
    state = {
        email: '',
        password: ''
    };
    signInValue = () => {
        const { email, password } = this.state;
        let validate = /^[a-zA-z0-9_.]{1,30}@{1,}[a-z]{3,10}\.{1}[a-z]{2,9}(.[a-z]{2,3}|)$/gm;
        if(validate.test(email)){
            if(password!==""){
                let newUser = {
                    email: email,
                    password: password
                };
                this.props.signIn(newUser)
            }else alert("Enter password")
        }else alert("Incorrect email")
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
                                        />
                                    </GridItem>
                                </Grid>
                            </CardBody>
                            <CardFooter className={classes.CardFooter}>
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
