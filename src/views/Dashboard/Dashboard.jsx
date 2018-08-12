/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {connect} from "react-redux";
import {addExpense, expensesUpdate, categoriesUpdate} from "../../actions/UserActions";

class Dashboard extends React.Component {
    state = {
        value: 0,
        categories: "",
        inputValueDescription: "",
        inputValueUAH: "",
        catID: "",
        category: []
    };

    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.categoriesUpdate();
        this.props.expensesUpdate();
    };
    //Нужно решить проблему с отображением после выбора
    handleChangeCategory = () => e => {
        console.log(e.target)
        // console.log(item)
        this.setState({categories: e.target.value.name, catID: e.target.value._id}, () => console.log(this.state))
    };
    getValueDescription = (e) => {
        this.setState({inputValueDescription: e.target.value});
    };
    getValueUAH = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        this.setState({inputValueUAH: e.target.value});
    };
    newExpense = () => {
        if(this.state.categories!=="" && this.state.inputValueUAH!==""){
            let expense = {
                date: new Date().toString(),
                name: this.state.categories,
                millisecDate: Date.now(),
                categoryID: this.state.catID,
                userID: this.props.user.user._id,
                description: this.state.inputValueDescription,
                valueUAH: this.state.inputValueUAH,
            };
            console.log(expense)
            // this.props.addExpense(expense);
            this.setState({
                categories: "",
                inputValueDescription: "",
                inputValueUAH: "",
            });
        }
        // console.log(new Date().getTime())
        // console.log(Date.now())
    };

    render() {
        const { classes } = this.props;
        const expenses = this.props.expenses.expenses;
        const categories = this.props.categories.categories;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>New expenses</h4>
                                <p className={classes.cardCategoryWhite}>Please, enter new expenses data here</p>
                            </CardHeader>
                            <CardBody>
                                <Grid container>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <TextField
                                            id="select-category"
                                            select
                                            label="Category"
                                            className={classes.TextField}
                                            value={this.state.categories}
                                            onChange={this.handleChangeCategory()}
                                            SelectProps={{MenuProps: {className: classes.menu}}}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {
                                                categories && categories.map((item, i) => (
                                                    <MenuItem key={i} value={item}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <TextField
                                            id="Description"
                                            label="Description"
                                            type="search"
                                            className={classes.TextField}
                                            margin="normal"
                                            fullWidth
                                            value={this.state.inputValueDescription}
                                            onChange={this.getValueDescription}
                                        />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <TextField
                                            id="Value"
                                            label="Value"
                                            type="search"
                                            className={classes.TextField}
                                            margin="normal"
                                            fullWidth
                                            placeholder="UAH"
                                            value={this.state.inputValueUAH}
                                            onChange={this.getValueUAH}
                                        />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <CardFooter className={classes.CardFooter}>
                                            <Button color="primary" onClick={this.newExpense}>ADD EXPENSES</Button>
                                        </CardFooter>
                                    </GridItem>
                                </Grid>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Latest expenses</h4>
                                <p className={classes.cardCategoryWhite}>Here is latest 20 expenses</p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Date", "Category", "Expenses", "Value, UAH"]}
                                    tableData={
                                        expenses ? expenses.sort(function (a, b) {
                                        if (a.date > b.date) {return -1}
                                        if (a.date < b.date) {return 1}
                                        return 0;
                                        }).slice(0, 20).map(item => {
                                            return [item.date.substring(0, 15), item.name, item.description, item.valueUAH]
                                        }): [["", "", "", ""]]
                                    }
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData,
    categories: state.categoriesList,
    expenses: state.expensesList

});
const mapDispatchToProps = dispatch => ({
    expensesUpdate: () => dispatch(expensesUpdate()),
    categoriesUpdate: () => dispatch(categoriesUpdate()),
    addExpense: (data) => dispatch(addExpense(data))
});
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));