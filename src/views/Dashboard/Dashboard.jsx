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
import {dashboardAddCategory, dashboardUpdate} from "../../actions/UserActions";
import history from "../../index";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            categories: "",
            inputValueDescription: "",
            inputValueUAH: "",
            category: [],
            copyAll: []
        };
    }
    componentDidMount = () => {
        if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        // this.props.dashboardUpdate();
    };

    copyAll = [];
    componentWillMount = () => {
        // if(!localStorage.getItem('token'))  this.props.history.push('/signin');
        this.copyAll = [];
        this.props.categories.categories && this.props.categories.categories.map(item =>{
                this.copyAll.push(item);
                if(item.subCategories){this.copysubCategories(item)}
                return this.copyAll
            }
        );
        this.setState({copyAll: this.copyAll})
    };

    copysubCategories = item => {
        item.subCategories.map((item) => {
            this.copyAll.push(item);
            if(item.subCategories){
                this.copysubCategories(item);
            }
        })
    }
    handleChangeCategory = name => event => {
        this.setState({[name]: event.target.value})
    };
    getValueDescription = (e) => {
        this.setState({inputValueDescription: e.target.value});
    };
    getValueUAH = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        this.setState({inputValueUAH: e.target.value});
    };
    newCategory = () => {
        if(this.state.categories!=="" && this.state.inputValueUAH!==""){
            this.setState({
                category: {
                    date: new Date().toString(),
                    name: this.state.categories,
                    description: this.state.inputValueDescription,
                    valueUAH: this.state.inputValueUAH,
                    subCategories: [{name: 'subcategory1'}]
                }
                 }, ()=>{this.props.dashboardAddCategory(this.state.category)}
            )
        }
    };


    render() {
        console.log(this.props);
        const { classes } = this.props;
        const dashboard = this.props.dashboardCategories.dashboardCategories;
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
                                            onChange={this.handleChangeCategory('categories')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {
                                                this.state.copyAll.map((item, index) => (
                                                    <MenuItem key={index} value={item.name}>
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
                                            onChange={this.getValueUAH}
                                        />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <CardFooter className={classes.CardFooter}>
                                            <Button color="primary" onClick={this.newCategory}>ADD EXPENSES</Button>
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
                                        dashboard ? dashboard.sort(function (a, b) {
                                        if (a.date > b.date) {return -1}
                                        if (a.date < b.date) {return 1}
                                        return 0;
                                        }).map(item => {
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
    dashboardCategories: state.dashboardCategoriesList

});

const mapDispatchToProps = dispatch => ({
    dashboardAddCategory: (category) => dispatch(dashboardAddCategory(category)),
    dashboardUpdate: () => dispatch(dashboardUpdate())
});

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));