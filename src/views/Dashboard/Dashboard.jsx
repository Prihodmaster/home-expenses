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
import IntegrationAutosuggest from "components/Autocomplete/IntegrationAutosuggest.jsx"
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {connect} from "react-redux";
import {addExpense, expensesUpdate, categoriesUpdate, getUser} from "../../actions/UserActions";
import _ from 'lodash';

class Dashboard extends React.Component {
    state = {
        catName: "",
        valueUAH: "",
        clear: false,
    };
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.props.getUser();
        this.props.categoriesUpdate();
        this.props.expensesUpdate();
    };
    handleChangeCategory = () => e => {
        this.setState({
            catName: e.target.value,
            clear: false
        })
    };
    getValueUAH = e => {
        if(e.target.value[0]==="."){e.target.value = ""}
        if(e.target.value[0]==="0" && e.target.value[1]!=="."){e.target.value = parseFloat(e.target.value)}
        e.target.value = e.target.value.replace(/[^\d.]*/g, '')
            .replace(/([.])+/g, '$1')
            .replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
        this.setState({
            valueUAH: e.target.value,
            clear: false
        });
    };
    newExpense = () => {
        let data = document.querySelectorAll('input');
        let temp = [...this.props.categories.categories];
        let current = _.findIndex(temp, i => i._id === data[0].value);
        if(data[0].value!=="" && data[2].value!==""){
            let expense = {
                date: new Date().toString(),
                name: temp[current].name,
                millisecDate: Date.now(),
                categoryID: data[0].value,
                parentID: temp[current].parentID,
                userID: this.props.user.user._id,
                description: data[1].value,
                valueUAH: data[2].value,
                val: true
            };
            this.props.addExpense(expense);
            this.setState({
                catName: "",
                valueUAH: "",
                clear: true
            });
            if(temp[current].parentID!=="0"){this.addMainExp(temp[current].parentID, temp)}
        }else alert("Please select category and/or enter value")
    };
    addMainExp = (parentID, temp) => {
        let val = false;
        _.forEachRight([...this.props.expenses.expenses], i => {if(i.categoryID===parentID && i.val){val = i.val}});
        temp.map(item => {
            if(item._id===parentID && !val){
                let expense = {
                    date: new Date().toString(),
                    name: item.name,
                    millisecDate: Date.now(),
                    categoryID: item._id,
                    parentID: item.parentID,
                    userID: this.props.user.user._id,
                    description: "",
                    valueUAH: "0",
                    val: false
                };
                this.props.addExpense(expense);
                if(item.parentID!=="0"){this.addMainExp(item.parentID, temp)}
            }
            return 0
        })
    };
    render() {
        const { classes } = this.props;
        const { expenses } = this.props.expenses;
        const { categories } = this.props.categories;
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
                                            value={this.state.catName}
                                            onChange={this.handleChangeCategory()}
                                            SelectProps={{MenuProps: {className: classes.menu}}}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {
                                                categories && _.orderBy(categories, ['name'], ['asc']).map((item, i) => (
                                                    <MenuItem key={i} value={item._id} className={item.parentID==="0" ? classes.mainField : classes.TextField}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <IntegrationAutosuggest
                                            clear={this.state.clear}
                                            desclist={_.orderBy(_.uniqBy([...this.props.expenses.desclist], "label"), ['label'], ['asc'])}
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
                                            value={this.state.valueUAH}
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
                            <CardHeader color="info" className={classes.cardTitleWhite}>
                                <h4 className={classes.cardTitleWhite}>Latest expenses</h4>
                                <p className={classes.cardCategoryWhite}>Here is latest 20 expenses</p>
                            </CardHeader>
                            <CardBody>
                                {
                                    expenses && expenses.length>0 ?
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["Date", "Category", "Expenses", "Value, UAH"]}
                                        tableData={
                                            _.orderBy(_.filter([...expenses], i => {if(i.val){return i}}), ['millisecDate'], ['desc']).slice(0, 20).map(item => {
                                                return [item.date.substring(0, 15), item.name, item.description, String(item.valueUAH)]
                                            })
                                        }
                                    />
                                    :
                                    <div className={classes.noExpenses}>No expenses</div>
                                }
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
    getUser: () => dispatch(getUser()),
    expensesUpdate: () => dispatch(expensesUpdate()),
    categoriesUpdate: () => dispatch(categoriesUpdate()),
    addExpense: (data) => dispatch(addExpense(data))
});
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));