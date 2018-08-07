import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {verifyEmail} from "../../actions/UserActions";

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
        color: "#9c28b0"
    }
};
// let inputValueEmail;
// let inputValueVerification;
class EmailVerification extends Component {
    componentDidMount = () => {
        if(localStorage.getItem('token'))  this.props.history.push('/dashboard')
    };
    emailVerification = () => {
        let newUser = {
            email: this.props.match.params.email,
            verifyKey: Number(this.props.match.params.verifyKey)
        };
        console.log(newUser)
        this.props.verifyEmail(newUser)
    }
    render() {
        console.log(this.props);
        const {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Email verification to finish with Home Expense App</h4>
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
                                            value = {this.props.match.params.email}
                                        />
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            id="verification-code"
                                            label="Verification code"
                                            type="text"
                                            className={classes.TextField} margin="normal"
                                            fullWidth
                                            value = {this.props.match.params.verifyKey}
                                        />
                                    </GridItem>
                                </Grid>
                            </CardBody>
                            <CardFooter className={classes.CardFooter}>
                                <Button color="primary" onClick={this.emailVerification}>VERIFY EMAIL</Button>
                                <div>
                                    <p>already have an account? <Link to='/signin'>sign-in</Link></p>
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
    verifyEmail: (newUser) => dispatch(verifyEmail(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmailVerification));
